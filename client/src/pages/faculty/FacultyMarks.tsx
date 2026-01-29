import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { timetableApi, studentsApi, marksApi, Timetable, Student, Marks } from '@/services/api';
import { toast } from 'sonner';
import { parseClassSelection } from '@/lib/utils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';

interface StudentMarkData extends Student {
  marks?: Marks;
}

const examTypes = ['Internal 1', 'Internal 2', 'External'];

export default function FacultyMarks() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState(examTypes[0]);
  const [students, setStudents] = useState<StudentMarkData[]>([]);

  // Fixed: Only depend on user?.profile?.id to prevent infinite loop
  useEffect(() => {
    if (user?.profile?.id) {
      fetchTimetable();
    }
  }, [user?.profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedClass) {
      fetchStudentsAndMarks();
    }
  }, [selectedClass]);

  const fetchTimetable = async () => {
    if (!user?.profile?.id) return;

    try {
      setLoading(true);
      setError(null);
      console.log('[FacultyMarks] Fetching timetable...');
      const data = await timetableApi.getByFaculty();
      console.log(`[FacultyMarks] Loaded ${data.length} timetable entries`);
      setTimetable(data);
      
      if (data.length > 0 && !selectedClass) {
        // Validate that we have proper IDs before setting selectedClass
        if (data[0].section_id && data[0].subject_id) {
          setSelectedClass(`${data[0].section_id}|${data[0].subject_id}`);
        } else {
          console.warn('[FacultyMarks] Timetable entry missing section_id or subject_id:', data[0]);
        }
      }
    } catch (err) {
      console.error('[FacultyMarks] Error fetching timetable:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load timetable';
      setError(errorMessage);
      toast.error('Failed to load timetable');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsAndMarks = async () => {
    if (!selectedClass) return;
    
    // Validate and parse selectedClass
    const parsed = parseClassSelection(selectedClass);
    if (!parsed.valid) {
      console.error('[FacultyMarks] Invalid selectedClass:', selectedClass, parsed.error);
      toast.error(parsed.error || 'Invalid class selection. Please try again.');
      return;
    }

    const { sectionId, subjectId } = parsed;

    try {
      setLoading(true);
      const studentsData = await studentsApi.getBySection(sectionId);
      
      if (!studentsData || studentsData.length === 0) {
        console.warn('[FacultyMarks] No students found for section', sectionId);
        toast.warning('No students enrolled in this section yet.');
      }
      
      const marksData = await marksApi.getBySubject(subjectId);

      const marksMap = new Map<string, Marks>();
      marksData.forEach(mark => {
        marksMap.set(mark.student_id, mark);
      });

      const studentsWithMarks = studentsData.map(student => ({
        ...student,
        marks: marksMap.get(student.id),
      }));

      setStudents(studentsWithMarks);
    } catch (err) {
      console.error('Error fetching students and marks:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load students and marks';
      
      if (errorMessage.includes('not assigned')) {
        toast.error('You are not assigned to this class. Please contact administrator.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const getMaxMarks = () => {
    return selectedExam === 'External' ? 100 : 20;
  };

  const validateAndParseMarkInput = (value: string, maxMarks: number): number | null => {
    if (value === '') return null;
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) return null;
    return Math.min(Math.max(0, parsed), maxMarks);
  };

  const updateMark = (studentId: string, value: string) => {
    const numValue = validateAndParseMarkInput(value, getMaxMarks());
    const field = selectedExam === 'Internal 1' ? 'internal1' : selectedExam === 'Internal 2' ? 'internal2' : 'external';
    
    setStudents(students.map(s => {
      if (s.id !== studentId) return s;
      
      const currentMarks = s.marks || {};
      return {
        ...s,
        marks: {
          ...currentMarks,
          [field]: numValue,
        } as Marks,
      };
    }));
  };

  const getCurrentMark = (student: StudentMarkData) => {
    if (!student.marks) return null;
    if (selectedExam === 'Internal 1') return student.marks.internal1;
    if (selectedExam === 'Internal 2') return student.marks.internal2;
    return student.marks.external;
  };

  const handleSave = async () => {
    if (!selectedClass) return;

    // Validate and parse selectedClass
    const parsed = parseClassSelection(selectedClass);
    if (!parsed.valid) {
      toast.error(parsed.error || 'Invalid class selection');
      return;
    }

    const { sectionId, subjectId } = parsed;

    try {
      setSaving(true);
      
      for (const student of students) {
        if (student.marks) {
          await marksApi.enterMarks({
            student_id: student.id,
            subject_id: subjectId,
            internal1: student.marks.internal1,
            internal2: student.marks.internal2,
            external: student.marks.external,
          });
        }
      }

      toast.success('Marks saved successfully!');
      await fetchStudentsAndMarks();
    } catch (err) {
      console.error('Error saving marks:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save marks';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const getGrade = (total: number, max: number) => {
    const percent = (total / max) * 100;
    if (percent >= 90) return { grade: 'A+', color: 'text-success' };
    if (percent >= 80) return { grade: 'A', color: 'text-success' };
    if (percent >= 70) return { grade: 'B+', color: 'text-primary' };
    if (percent >= 60) return { grade: 'B', color: 'text-primary' };
    if (percent >= 50) return { grade: 'C', color: 'text-warning' };
    if (percent >= 40) return { grade: 'D', color: 'text-warning' };
    return { grade: 'F', color: 'text-destructive' };
  };

  if (!user?.profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (loading && timetable.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="page-title">Enter Marks</h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  const uniqueClasses = Array.from(
    new Map(timetable.map(item => [
      `${item.section_id}|${item.subject_id}`,
      {
        key: `${item.section_id}|${item.subject_id}`,
        label: `${item.subjects?.name || 'N/A'} - ${item.sections?.name || 'N/A'}`,
        subjectId: item.subject_id,
        sectionId: item.section_id,
      }
    ])).values()
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Enter Marks</h1>
          <p className="text-muted-foreground mt-1">Record and manage student marks</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-base p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label-base flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Class (Subject - Section)
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input-base border-2 hover:border-orange-500 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            >
              {uniqueClasses.map((cls) => (
                <option key={cls.key} value={cls.key}>{cls.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-base flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Exam Type
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="input-base border-2 hover:border-orange-500 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            >
              {examTypes.map((exam) => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {uniqueClasses.length === 0 ? (
        <EmptyState 
          message="No classes assigned" 
          description="You don't have any classes assigned to enter marks." 
        />
      ) : (
        <>
          {/* Info Banner */}
          <div className="card-base p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-2 border-orange-200 dark:border-orange-800 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-foreground mb-1">
                  {selectedExam} - {uniqueClasses.find(c => c.key === selectedClass)?.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  Maximum marks: <span className="font-bold text-orange-600">{getMaxMarks()}</span> | Enter marks for each student below
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border-2 border-orange-500 text-orange-600 dark:text-orange-400 font-medium hover:bg-orange-50 dark:hover:bg-orange-950 transition-all duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Bulk Upload
                </button>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Marks Table */}
          {loading ? (
            <div className="card-base p-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : students.length === 0 ? (
            <EmptyState 
              message="No students found" 
              description="This section doesn't have any students yet." 
            />
          ) : (
            <div className="card-base overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                      <th className="table-cell text-left w-12 font-bold">#</th>
                      <th className="table-cell text-left font-bold">Roll No</th>
                      <th className="table-cell text-left font-bold">Student Name</th>
                      <th className="table-cell text-center w-32 font-bold">
                        <div className="flex flex-col items-center">
                          <span>Internal 1</span>
                          <span className="text-xs text-muted-foreground font-normal">(20)</span>
                        </div>
                      </th>
                      <th className="table-cell text-center w-32 font-bold">
                        <div className="flex flex-col items-center">
                          <span>Internal 2</span>
                          <span className="text-xs text-muted-foreground font-normal">(20)</span>
                        </div>
                      </th>
                      <th className="table-cell text-center w-32 font-bold">
                        <div className="flex flex-col items-center">
                          <span>External</span>
                          <span className="text-xs text-muted-foreground font-normal">(100)</span>
                        </div>
                      </th>
                      <th className="table-cell text-center w-24 font-bold">Total</th>
                      <th className="table-cell text-center w-20 font-bold">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => {
                      const internal1 = student.marks?.internal1 || 0;
                      const internal2 = student.marks?.internal2 || 0;
                      const external = student.marks?.external || 0;
                      const total = internal1 + internal2 + external;
                      const { grade, color } = getGrade(total, 140);
                      
                      return (
                        <tr key={student.id} className="hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-950/50 dark:hover:to-orange-900/50 transition-all duration-200 border-b border-border">
                          <td className="table-cell text-muted-foreground font-medium">{index + 1}</td>
                          <td className="table-cell font-mono font-semibold">{student.roll_no}</td>
                          <td className="table-cell">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                                <span className="text-xs font-bold text-white">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <span className="font-semibold text-foreground">{student.name}</span>
                            </div>
                          </td>
                          <td className="table-cell">
                            <input
                              type="number"
                              min={0}
                              max={20}
                              value={student.marks?.internal1 ?? ''}
                              onChange={(e) => updateMark(student.id, e.target.value)}
                              disabled={selectedExam !== 'Internal 1'}
                              className={`w-full text-center input-base py-2 font-semibold border-2 transition-colors ${
                                selectedExam === 'Internal 1' 
                                  ? 'border-orange-500 focus:border-orange-600 focus:ring-orange-500 bg-orange-50 dark:bg-orange-950' 
                                  : 'bg-muted cursor-not-allowed border-border'
                              }`}
                              placeholder="-"
                            />
                          </td>
                          <td className="table-cell">
                            <input
                              type="number"
                              min={0}
                              max={20}
                              value={student.marks?.internal2 ?? ''}
                              onChange={(e) => updateMark(student.id, e.target.value)}
                              disabled={selectedExam !== 'Internal 2'}
                              className={`w-full text-center input-base py-2 font-semibold border-2 transition-colors ${
                                selectedExam === 'Internal 2' 
                                  ? 'border-orange-500 focus:border-orange-600 focus:ring-orange-500 bg-orange-50 dark:bg-orange-950' 
                                  : 'bg-muted cursor-not-allowed border-border'
                              }`}
                              placeholder="-"
                            />
                          </td>
                          <td className="table-cell">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={student.marks?.external ?? ''}
                              onChange={(e) => updateMark(student.id, e.target.value)}
                              disabled={selectedExam !== 'External'}
                              className={`w-full text-center input-base py-2 font-semibold border-2 transition-colors ${
                                selectedExam === 'External' 
                                  ? 'border-orange-500 focus:border-orange-600 focus:ring-orange-500 bg-orange-50 dark:bg-orange-950' 
                                  : 'bg-muted cursor-not-allowed border-border'
                              }`}
                              placeholder="-"
                            />
                          </td>
                          <td className="table-cell text-center">
                            <span className="px-3 py-1 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-sm shadow-md">
                              {total}
                            </span>
                          </td>
                          <td className="table-cell text-center">
                            <span className={`text-xl font-bold ${color}`}>{grade}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Save Button */}
          {students.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Marks
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

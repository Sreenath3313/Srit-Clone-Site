import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { timetableApi, studentsApi, attendanceApi, Timetable, Student, Attendance } from '@/services/api';
import { toast } from 'sonner';
import { parseClassSelection } from '@/lib/utils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';

interface AttendanceRecord {
  student_id: string;
  subject_id: string;
  date: string;
  present: boolean;
}

export default function FacultyAttendance() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<Map<string, boolean>>(new Map());

  // Fixed: Only depend on user?.profile?.id to prevent infinite loop
  useEffect(() => {
    if (user?.profile?.id) {
      fetchTimetable();
    }
  }, [user?.profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedClass) {
      fetchStudentsAndAttendance();
    }
  }, [selectedClass, selectedDate]);

  const fetchTimetable = async () => {
    if (!user?.profile?.id) return;

    try {
      setLoading(true);
      setError(null);
      console.log('[FacultyAttendance] Fetching timetable...');
      const data = await timetableApi.getByFaculty();
      console.log(`[FacultyAttendance] Loaded ${data.length} timetable entries`);
      setTimetable(data);
      
      if (data.length > 0 && !selectedClass) {
        // Validate that we have proper IDs before setting selectedClass
        if (data[0].section_id && data[0].subject_id) {
          setSelectedClass(`${data[0].section_id}|${data[0].subject_id}`);
        } else {
          console.warn('[FacultyAttendance] Timetable entry missing section_id or subject_id:', data[0]);
        }
      }
    } catch (err) {
      console.error('[FacultyAttendance] Error fetching timetable:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load timetable';
      setError(errorMessage);
      toast.error('Failed to load timetable');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsAndAttendance = async () => {
    if (!selectedClass) return;
    
    // Validate and parse selectedClass
    const parsed = parseClassSelection(selectedClass);
    if (!parsed.valid) {
      console.error('[FacultyAttendance] Invalid selectedClass:', selectedClass, parsed.error);
      toast.error(parsed.error || 'Invalid class selection. Please try again.');
      return;
    }

    const { sectionId, subjectId } = parsed;

    try {
      setLoading(true);
      const studentsData = await studentsApi.getBySection(sectionId);
      
      if (!studentsData || studentsData.length === 0) {
        console.warn('[FacultyAttendance] No students found for section', sectionId);
        toast.warning('No students enrolled in this section yet.');
      }
      
      setStudents(studentsData);

      const attendanceData = await attendanceApi.getBySubject(subjectId, selectedDate, selectedDate);
      const newMap = new Map<string, boolean>();
      
      attendanceData.forEach((record: Attendance) => {
        newMap.set(record.student_id, record.present);
      });

      studentsData.forEach(student => {
        if (!newMap.has(student.id)) {
          newMap.set(student.id, true);
        }
      });

      setAttendanceMap(newMap);
    } catch (err) {
      console.error('Error fetching students:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load students';
      
      if (errorMessage.includes('not assigned')) {
        toast.error('You are not assigned to this class. Please contact administrator.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = (studentId: string) => {
    const newMap = new Map(attendanceMap);
    newMap.set(studentId, !newMap.get(studentId));
    setAttendanceMap(newMap);
  };

  const markAllPresent = () => {
    const newMap = new Map<string, boolean>();
    students.forEach(student => newMap.set(student.id, true));
    setAttendanceMap(newMap);
  };

  const markAllAbsent = () => {
    const newMap = new Map<string, boolean>();
    students.forEach(student => newMap.set(student.id, false));
    setAttendanceMap(newMap);
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
      const records: AttendanceRecord[] = students.map(student => ({
        student_id: student.id,
        subject_id: subjectId,
        date: selectedDate,
        present: attendanceMap.get(student.id) || false,
      }));

      await attendanceApi.markAttendance(records);
      toast.success('Attendance saved successfully!');
    } catch (err) {
      console.error('Error saving attendance:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save attendance';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
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
        <h1 className="page-title">Mark Attendance</h1>
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

  const presentCount = Array.from(attendanceMap.values()).filter(Boolean).length;
  const absentCount = students.length - presentCount;
  const attendancePercent = students.length > 0 ? ((presentCount / students.length) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Mark Attendance</h1>
          <p className="text-muted-foreground mt-1">Record student attendance for your classes</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-base border-2 hover:border-orange-500 focus:border-orange-500 focus:ring-orange-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {uniqueClasses.length === 0 ? (
        <EmptyState 
          message="No classes assigned" 
          description="You don't have any classes assigned to mark attendance." 
        />
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card-base p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{presentCount}</p>
                  <p className="text-sm font-medium text-muted-foreground">Present</p>
                </div>
              </div>
            </div>
            <div className="card-base p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{absentCount}</p>
                  <p className="text-sm font-medium text-muted-foreground">Absent</p>
                </div>
              </div>
            </div>
            <div className="card-base p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{attendancePercent}%</p>
                  <p className="text-sm font-medium text-white/90">Attendance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student List */}
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
            <>
              <div className="card-base overflow-hidden shadow-lg">
                <div className="flex items-center justify-between p-5 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-b border-orange-200 dark:border-orange-800">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Student List - {uniqueClasses.find(c => c.key === selectedClass)?.label.split(' - ')[1]}
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={markAllPresent} className="px-4 py-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      All Present
                    </button>
                    <button onClick={markAllAbsent} className="px-4 py-2 rounded-lg border-2 border-red-500 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      All Absent
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                  {students.map((student, index) => {
                    const isPresent = attendanceMap.get(student.id) || false;
                    return (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-950/50 dark:hover:to-orange-900/50 transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${index * 20}ms` }}
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-10 text-sm font-medium text-muted-foreground">{index + 1}</span>
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-white">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{student.name}</p>
                            <p className="text-sm text-muted-foreground font-mono">{student.roll_no}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleAttendance(student.id)}
                          className={`min-w-[100px] py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                            isPresent
                              ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                              : 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 border-2 border-red-500'
                          }`}
                        >
                          {isPresent ? (
                            <span className="flex items-center justify-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Present
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Absent
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Save Button */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Attendance
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

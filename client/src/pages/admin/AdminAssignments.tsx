import { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import { timetableApi, sectionsApi, subjectsApi, facultyApi, Timetable, Section, Subject, Faculty } from '@/services/api';
import { toast } from 'sonner';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = [1, 2, 3, 4, 5, 6, 7, 8];

export default function AdminAssignments() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [editingTimetable, setEditingTimetable] = useState<Timetable | null>(null);
  const [formData, setFormData] = useState({
    subject_id: '',
    faculty_id: '',
    day: 'Monday',
    period: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [timetableData, sectionsData, subjectsData, facultiesData] = await Promise.all([
        timetableApi.getAll(),
        sectionsApi.getAll(),
        subjectsApi.getAll(),
        facultyApi.getAll()
      ]);
      setTimetables(timetableData);
      setSections(sectionsData);
      setSubjects(subjectsData);
      setFaculties(facultiesData);
      if (sectionsData.length > 0 && !selectedSection) {
        setSelectedSection(sectionsData[0].id);
      }
      if (subjectsData.length > 0 && !formData.subject_id) {
        setFormData(prev => ({ ...prev, subject_id: subjectsData[0].id }));
      }
      if (facultiesData.length > 0 && !formData.faculty_id) {
        setFormData(prev => ({ ...prev, faculty_id: facultiesData[0].id }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const sectionTimetables = timetables.filter((t) => t.section_id === selectedSection);

  const getTimetable = (day: string, period: number) => {
    return sectionTimetables.find((t) => t.day === day && t.period === period);
  };

  const handleSlotClick = (day: string, period: number) => {
    const existing = getTimetable(day, period);
    if (existing) {
      setEditingTimetable(existing);
      setFormData({
        subject_id: existing.subject_id,
        faculty_id: existing.faculty_id,
        day: existing.day,
        period: existing.period,
      });
    } else {
      setEditingTimetable(null);
      setFormData({
        subject_id: subjects.length > 0 ? subjects[0].id : '',
        faculty_id: faculties.length > 0 ? faculties[0].id : '',
        day,
        period,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingTimetable) {
        const updated = await timetableApi.update(editingTimetable.id, formData);
        setTimetables(timetables.map((t) => t.id === editingTimetable.id ? updated : t));
        toast.success('Timetable updated successfully');
      } else {
        const created = await timetableApi.create({
          ...formData,
          section_id: selectedSection,
        });
        setTimetables([...timetables, created]);
        toast.success('Timetable created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save timetable';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async () => {
    if (editingTimetable) {
      try {
        await timetableApi.delete(editingTimetable.id);
        setTimetables(timetables.filter((t) => t.id !== editingTimetable.id));
        toast.success('Timetable entry removed successfully');
        setIsModalOpen(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to remove timetable';
        toast.error(message);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Class Assignment</h1>
            <p className="text-muted-foreground mt-1">Assign faculty to subjects and create timetables</p>
          </div>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Class Assignment</h1>
            <p className="text-muted-foreground mt-1">Assign faculty to subjects and create timetables</p>
          </div>
        </div>
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Class Assignment</h1>
            <p className="text-muted-foreground mt-1">Assign faculty to subjects and create timetables</p>
          </div>
        </div>
        <EmptyState
          title="No sections available"
          description="Please create sections first before creating timetables"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title gradient-text">Class Assignment</h1>
          <p className="text-muted-foreground mt-1">Assign faculty to subjects and create timetables with ease</p>
        </div>
      </div>

      {/* Section Selector with Department Filter */}
      <div className="bg-gradient-to-r from-orange-50 to-white dark:from-orange-950/10 dark:to-background rounded-xl border border-orange-200 dark:border-orange-900/30 p-6 shadow-md">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Filter by Department
              </label>
              <select
                value={sections.find(s => s.id === selectedSection)?.department_id || ''}
                onChange={(e) => {
                  const deptSections = sections.filter(s => s.department_id === e.target.value);
                  if (deptSections.length > 0) setSelectedSection(deptSections[0].id);
                }}
                className="w-full px-4 py-2.5 bg-white dark:bg-card border-2 border-orange-200 dark:border-orange-900/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
              >
                {Array.from(new Set(sections.map(s => s.departments))).filter(Boolean).map((dept: any) => (
                  <option key={dept.id} value={dept.id}>{dept.name} ({dept.code})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Select Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-2.5 bg-white dark:bg-card border-2 border-orange-200 dark:border-orange-900/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
              >
                {sections
                  .filter(s => !sections.find(sec => sec.id === selectedSection)?.department_id || s.department_id === sections.find(sec => sec.id === selectedSection)?.department_id)
                  .map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name} - Year {section.year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-orange-100/50 dark:bg-orange-950/20 p-3 rounded-lg">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Click on any slot in the timetable to assign a faculty and subject</span>
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white dark:bg-card rounded-xl border-2 border-orange-100 dark:border-orange-900/30 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
          <h2 className="text-xl font-bold text-white">Timetable for {sections.find(s => s.id === selectedSection)?.name}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-950/30 dark:to-orange-900/20 border-b-2 border-orange-200 dark:border-orange-900/30">
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Day / Period</th>
                {periods.map((period) => (
                  <th key={period} className="px-4 py-4 text-center text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider min-w-[120px]">
                    Period {period}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/10 transition-colors border-b border-border">
                  <td className="px-6 py-4 font-semibold text-foreground bg-orange-50/30 dark:bg-orange-950/10">{day}</td>
                  {periods.map((period) => {
                    const timetable = getTimetable(day, period);
                    return (
                      <td key={period} className="p-2">
                        <button
                          onClick={() => handleSlotClick(day, period)}
                          className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                            timetable
                              ? 'bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950/30 dark:to-orange-900/20 border-2 border-orange-300 dark:border-orange-700 hover:shadow-lg hover:scale-105'
                              : 'bg-gray-50 dark:bg-card border-2 border-dashed border-gray-300 dark:border-border hover:border-orange-400 hover:bg-orange-50/30 dark:hover:bg-orange-950/10 hover:scale-105'
                          }`}
                        >
                          {timetable ? (
                            <div>
                              <p className="text-sm font-semibold text-foreground truncate">{timetable.subjects?.name || '-'}</p>
                              <p className="text-xs text-muted-foreground truncate mt-1">{timetable.faculty?.name || '-'}</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <svg className="w-5 h-5 mx-auto text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="card-base p-6">
        <h2 className="section-title mb-4">All Assignments for {sections.find(s => s.id === selectedSection)?.name}</h2>
        {sectionTimetables.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <svg className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No classes assigned yet</p>
            <p className="text-sm">Click on any slot above to assign a class</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectionTimetables.map((timetable) => (
              <div key={timetable.id} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="badge-primary">{timetable.day}</span>
                  <span className="text-sm text-muted-foreground">Period {timetable.period}</span>
                </div>
                <h3 className="font-medium text-foreground">{timetable.subjects?.name || '-'}</h3>
                <p className="text-sm text-muted-foreground">{timetable.faculty?.name || '-'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Assign Class - ${formData.day}, Period ${formData.period}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-base">Subject</label>
            <select
              value={formData.subject_id}
              onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
              className="input-base"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name} ({sub.code})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-base">Faculty</label>
            <select
              value={formData.faculty_id}
              onChange={(e) => setFormData({ ...formData, faculty_id: e.target.value })}
              className="input-base"
              required
            >
              <option value="">Select Faculty</option>
              {faculties.map((fac) => (
                <option key={fac.id} value={fac.id}>{fac.name} ({fac.employee_id})</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            {editingTimetable && (
              <button type="button" onClick={handleRemove} className="btn-ghost text-destructive flex-1">
                Remove
              </button>
            )}
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost flex-1" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex-1" disabled={submitting}>
              {submitting ? 'Saving...' : 'Assign'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

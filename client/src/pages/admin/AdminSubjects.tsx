import { useState, useEffect } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import { subjectsApi, departmentsApi, Subject, Department } from '@/services/api';
import { toast } from 'sonner';

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department_id: '',
    semester: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [subjectsData, deptData] = await Promise.all([
        subjectsApi.getAll(),
        departmentsApi.getAll()
      ]);
      setSubjects(subjectsData);
      setDepartments(deptData);
      if (deptData.length > 0 && !formData.department_id) {
        setFormData(prev => ({ ...prev, department_id: deptData[0].id }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'code',
      header: 'Code',
      render: (subject: Subject) => (
        <span className="font-mono font-medium text-foreground">{subject.code}</span>
      ),
    },
    { key: 'name' as keyof Subject, header: 'Subject Name' },
    {
      key: 'department',
      header: 'Department',
      render: (subject: Subject) => (
        <span className="badge-primary">{subject.departments?.code || '-'}</span>
      ),
    },
    {
      key: 'semester',
      header: 'Semester',
      render: (subject: Subject) => (
        <span>Sem {subject.semester}</span>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingSubject(null);
    setFormData({ 
      code: '', 
      name: '', 
      department_id: departments.length > 0 ? departments[0].id : '', 
      semester: 1 
    });
    setIsModalOpen(true);
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      code: subject.code,
      name: subject.name,
      department_id: subject.department_id,
      semester: subject.semester,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (subject: Subject) => {
    if (confirm(`Are you sure you want to delete ${subject.name}?`)) {
      try {
        await subjectsApi.delete(subject.id);
        setSubjects(subjects.filter((s) => s.id !== subject.id));
        toast.success('Subject deleted successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete subject';
        toast.error(message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingSubject) {
        const updated = await subjectsApi.update(editingSubject.id, formData);
        setSubjects(subjects.map((s) => s.id === editingSubject.id ? updated : s));
        toast.success('Subject updated successfully');
      } else {
        const created = await subjectsApi.create(formData);
        setSubjects([...subjects, created]);
        toast.success('Subject created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save subject';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter subjects based on department and year
  const filteredSubjects = subjects.filter(subject => {
    const departmentMatch = selectedDepartment === 'all' || subject.department_id === selectedDepartment;
    const yearMatch = selectedYear === 'all' || Math.ceil(subject.semester / 2).toString() === selectedYear;
    return departmentMatch && yearMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title gradient-text">Subjects Management</h1>
          <p className="text-muted-foreground mt-1">Manage subjects and curriculum with advanced filters</p>
        </div>
        <button onClick={handleAdd} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Subject
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-gradient-to-r from-orange-50 to-white dark:from-orange-950/10 dark:to-background rounded-xl border border-orange-200 dark:border-orange-900/30 p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-card border-2 border-orange-200 dark:border-orange-900/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name} ({dept.code})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Academic Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-card border-2 border-orange-200 dark:border-orange-900/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
            >
              <option value="all">All Years</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="w-full bg-white dark:bg-card rounded-lg border-2 border-orange-200 dark:border-orange-900/30 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Subjects</span>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{filteredSubjects.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchData} />
      ) : filteredSubjects.length === 0 ? (
        <EmptyState
          title="No subjects found"
          description={selectedDepartment !== 'all' || selectedYear !== 'all' ? "No subjects match your filter criteria" : "Get started by adding your first subject"}
          action={{
            label: "Add Subject",
            onClick: handleAdd
          }}
        />
      ) : (
        <div className="bg-white dark:bg-card rounded-xl border border-orange-100 dark:border-orange-900/30 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-950/30 dark:to-orange-900/20 border-b-2 border-orange-200 dark:border-orange-900/30">
                  <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Subject Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Semester</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSubjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/10 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-md">{subject.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{subject.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-800">
                        {subject.departments?.code || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground">Semester {subject.semester}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-foreground">Year {Math.ceil(subject.semester / 2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(subject)}
                          className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-md hover:scale-110 transition-all duration-200"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(subject)}
                          className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 hover:shadow-md hover:scale-110 transition-all duration-200"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSubject ? 'Edit Subject' : 'Add Subject'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-base">Subject Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g., CS501"
              className="input-base font-mono"
              required
            />
          </div>
          <div>
            <label className="label-base">Subject Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Machine Learning"
              className="input-base"
              required
            />
          </div>
          <div>
            <label className="label-base">Department</label>
            <select
              value={formData.department_id}
              onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
              className="input-base"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name} ({dept.code})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-base">Semester</label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
              className="input-base"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost flex-1" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex-1" disabled={submitting}>
              {submitting ? 'Saving...' : editingSubject ? 'Update' : 'Create'} Subject
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

import { useState, useEffect } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import { departmentsApi, Department } from '@/services/api';
import { toast } from 'sonner';

export default function AdminDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await departmentsApi.getAll();
      setDepartments(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch departments';
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
      render: (dept: Department) => (
        <span className="badge-primary font-mono">{dept.code}</span>
      ),
    },
    { key: 'name' as keyof Department, header: 'Department Name' },
    {
      key: 'created_at',
      header: 'Created',
      render: (dept: Department) => (
        <span className="text-muted-foreground">
          {dept.created_at ? new Date(dept.created_at).toLocaleDateString() : '-'}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingDepartment(null);
    setFormData({ name: '', code: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setFormData({ name: dept.name, code: dept.code });
    setIsModalOpen(true);
  };

  const handleDelete = async (dept: Department) => {
    if (confirm(`Are you sure you want to delete ${dept.name}?`)) {
      try {
        await departmentsApi.delete(dept.id);
        setDepartments(departments.filter((d) => d.id !== dept.id));
        toast.success('Department deleted successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete department';
        toast.error(message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingDepartment) {
        const updated = await departmentsApi.update(editingDepartment.id, formData);
        setDepartments(departments.map((d) => d.id === editingDepartment.id ? updated : d));
        toast.success('Department updated successfully');
      } else {
        const created = await departmentsApi.create(formData);
        setDepartments([...departments, created]);
        toast.success('Department created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save department';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title gradient-text">Departments</h1>
          <p className="text-muted-foreground mt-1">Manage academic departments and their details</p>
        </div>
        <button onClick={handleAdd} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Department
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchDepartments} />
      ) : departments.length === 0 ? (
        <EmptyState
          title="No departments found"
          description="Get started by adding your first department"
          action={{
            label: "Add Department",
            onClick: handleAdd
          }}
        />
      ) : (
        <div className="bg-white dark:bg-card rounded-xl border-2 border-orange-100 dark:border-orange-900/30 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-950/30 dark:to-orange-900/20 border-b-2 border-orange-200 dark:border-orange-900/30">
                  <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Department Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-orange-900 dark:text-orange-100 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/10 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-md">{dept.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{dept.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground">
                        {dept.created_at ? new Date(dept.created_at).toLocaleDateString() : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(dept)}
                          className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-md hover:scale-110 transition-all duration-200"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(dept)}
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
        title={editingDepartment ? 'Edit Department' : 'Add Department'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-base">Department Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Computer Science Engineering"
              className="input-base"
              required
            />
          </div>
          <div>
            <label className="label-base">Department Code</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g., CSE"
              className="input-base font-mono"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost flex-1" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex-1" disabled={submitting}>
              {submitting ? 'Saving...' : editingDepartment ? 'Update' : 'Create'} Department
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

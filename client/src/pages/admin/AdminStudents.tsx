import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import { studentsApi, sectionsApi, departmentsApi, Student, Section, Department } from '@/services/api';
import { toast } from 'sonner';

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    roll_no: '',
    name: '',
    email: '',
    password: 'student123',
    section_id: '',
    admission_year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Multi-step wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  
  // Filter states
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterSection, setFilterSection] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [studentsData, sectionsData, deptData] = await Promise.all([
        studentsApi.getAll(),
        sectionsApi.getAll(),
        departmentsApi.getAll()
      ]);
      setStudents(studentsData);
      setSections(sectionsData);
      setDepartments(deptData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setWizardStep(1);
    setSelectedYear(1);
    setSelectedDepartment('');
    setSelectedSection('');
    setFormData({
      roll_no: '',
      name: '',
      email: '',
      password: 'student123',
      section_id: '',
      admission_year: new Date().getFullYear(),
    });
    setIsModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      roll_no: student.roll_no,
      name: student.name,
      email: '',
      password: '',
      section_id: student.section_id,
      admission_year: student.admission_year,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (student: Student) => {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await studentsApi.delete(student.id);
        setStudents(students.filter((s) => s.id !== student.id));
        toast.success('Student deleted successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete student';
        toast.error(message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingStudent) {
        const updateData = {
          roll_no: formData.roll_no,
          name: formData.name,
          section_id: formData.section_id,
          admission_year: formData.admission_year,
        };
        const updated = await studentsApi.update(editingStudent.id, updateData);
        setStudents(students.map((s) => s.id === editingStudent.id ? updated : s));
        toast.success('Student updated successfully');
      } else {
        const created = await studentsApi.create(formData);
        setStudents([...students, created]);
        toast.success('Student created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save student';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWizardNext = () => {
    if (wizardStep === 1 && selectedYear) {
      setWizardStep(2);
    } else if (wizardStep === 2 && selectedDepartment) {
      setWizardStep(3);
    } else if (wizardStep === 3 && selectedSection) {
      setFormData({ ...formData, section_id: selectedSection });
      setWizardStep(4);
    }
  };

  const filteredSections = sections.filter(sec => 
    sec.year === selectedYear && sec.department_id === selectedDepartment
  );

  // Filter students
  const filteredStudents = students.filter(student => {
    const yearMatch = filterYear === 'all' || student.sections?.year.toString() === filterYear;
    const deptMatch = filterDepartment === 'all' || student.sections?.department_id === filterDepartment;
    const sectionMatch = filterSection === 'all' || student.section_id === filterSection;
    return yearMatch && deptMatch && sectionMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title gradient-text">Students Management</h1>
          <p className="text-muted-foreground mt-1">Manage student records with advanced filters and card view</p>
        </div>
        <button onClick={handleAdd} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-gradient-to-r from-orange-50 to-white dark:from-orange-950/10 dark:to-background rounded-xl border border-orange-200 dark:border-orange-900/30 p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Year
            </label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-card border-2 border-orange-200 dark:border-orange-900/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
            >
              <option value="all">All Years</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Department
            </label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-card border-2 border-orange-200 dark:border-orange-900/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Section
            </label>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-card border-2 border-orange-200 dark:border-orange-900/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
            >
              <option value="all">All Sections</option>
              {sections.map((sec) => (
                <option key={sec.id} value={sec.id}>{sec.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="w-full bg-white dark:bg-card rounded-lg border-2 border-orange-200 dark:border-orange-900/30 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Students</span>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{filteredStudents.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchData} />
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          title="No students found"
          description={filterYear !== 'all' || filterDepartment !== 'all' || filterSection !== 'all' ? "No students match your filter criteria" : "Get started by adding your first student"}
          action={{
            label: "Add Student",
            onClick: handleAdd
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="group bg-gradient-to-br from-white to-orange-50/30 dark:from-card dark:to-orange-950/10 rounded-xl border-2 border-orange-100 dark:border-orange-900/30 p-6 shadow-md hover:shadow-xl hover:scale-105 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-white">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{student.name}</h3>
                    <span className="text-xs font-mono text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/50 px-2 py-1 rounded">{student.roll_no}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-muted-foreground">{student.sections?.departments?.name || '-'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-muted-foreground">{student.sections?.name || '-'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-muted-foreground">Year {student.sections?.year || '-'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-muted-foreground">Admitted {student.admission_year}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-orange-100 dark:border-orange-900/30">
                <button
                  onClick={() => handleEdit(student)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Multi-step Wizard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              {!editingStudent && (
                <div className="flex items-center gap-2 mt-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex-1">
                      <div className={`h-2 rounded-full transition-all duration-300 ${wizardStep >= step ? 'bg-white' : 'bg-white/30'}`} />
                      <p className="text-xs text-white mt-1">
                        {step === 1 && 'Year'}
                        {step === 2 && 'Department'}
                        {step === 3 && 'Section'}
                        {step === 4 && 'Details'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {!editingStudent ? (
                <>
                  {wizardStep === 1 && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Select Year</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => setSelectedYear(year)}
                            className={`p-6 rounded-xl border-2 font-semibold text-lg transition-all duration-200 ${
                              selectedYear === year
                                ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-600 shadow-lg scale-105'
                                : 'bg-white dark:bg-card border-orange-200 dark:border-orange-900/30 text-foreground hover:border-orange-400 hover:scale-105'
                            }`}
                          >
                            {year === 1 && '1st Year'}
                            {year === 2 && '2nd Year'}
                            {year === 3 && '3rd Year'}
                            {year === 4 && '4th Year'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Select Department</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {departments.map((dept) => (
                          <button
                            key={dept.id}
                            type="button"
                            onClick={() => setSelectedDepartment(dept.id)}
                            className={`p-4 rounded-xl border-2 font-semibold text-left transition-all duration-200 ${
                              selectedDepartment === dept.id
                                ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-600 shadow-lg scale-105'
                                : 'bg-white dark:bg-card border-orange-200 dark:border-orange-900/30 text-foreground hover:border-orange-400 hover:scale-105'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{dept.name}</span>
                              <span className={`text-xs font-mono px-2 py-1 rounded ${
                                selectedDepartment === dept.id ? 'bg-white/20' : 'bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'
                              }`}>{dept.code}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Select Section</h3>
                      {filteredSections.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No sections available for selected year and department</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {filteredSections.map((sec) => (
                            <button
                              key={sec.id}
                              type="button"
                              onClick={() => setSelectedSection(sec.id)}
                              className={`p-6 rounded-xl border-2 font-semibold text-lg transition-all duration-200 ${
                                selectedSection === sec.id
                                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-600 shadow-lg scale-105'
                                  : 'bg-white dark:bg-card border-orange-200 dark:border-orange-900/30 text-foreground hover:border-orange-400 hover:scale-105'
                              }`}
                            >
                              {sec.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {wizardStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Student Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label-base">Roll Number</label>
                          <input
                            type="text"
                            value={formData.roll_no}
                            onChange={(e) => setFormData({ ...formData, roll_no: e.target.value.toUpperCase() })}
                            placeholder="e.g., 22CS101"
                            className="input-base font-mono"
                            required
                          />
                        </div>
                        <div>
                          <label className="label-base">Full Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., John Doe"
                            className="input-base"
                            required
                          />
                        </div>
                        <div>
                          <label className="label-base">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g., john@srit.edu"
                            className="input-base"
                            required
                          />
                        </div>
                        <div>
                          <label className="label-base">Password</label>
                          <input
                            type="text"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Default: student123"
                            className="input-base"
                            required
                          />
                        </div>
                        <div>
                          <label className="label-base">Admission Year</label>
                          <input
                            type="number"
                            value={formData.admission_year}
                            onChange={(e) => setFormData({ ...formData, admission_year: parseInt(e.target.value) })}
                            className="input-base"
                            min={2000}
                            max={2100}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label-base">Roll Number</label>
                      <input
                        type="text"
                        value={formData.roll_no}
                        onChange={(e) => setFormData({ ...formData, roll_no: e.target.value.toUpperCase() })}
                        placeholder="e.g., 22CS101"
                        className="input-base font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-base">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., John Doe"
                        className="input-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-base">Section</label>
                      <select
                        value={formData.section_id}
                        onChange={(e) => setFormData({ ...formData, section_id: e.target.value })}
                        className="input-base"
                        required
                      >
                        <option value="">Select Section</option>
                        {sections.map((sec) => (
                          <option key={sec.id} value={sec.id}>
                            {sec.name} - {sec.departments?.name} (Year {sec.year})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label-base">Admission Year</label>
                      <input
                        type="number"
                        value={formData.admission_year}
                        onChange={(e) => setFormData({ ...formData, admission_year: parseInt(e.target.value) })}
                        className="input-base"
                        min={2000}
                        max={2100}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-border">
                {!editingStudent && wizardStep > 1 && wizardStep < 4 && (
                  <button
                    type="button"
                    onClick={() => setWizardStep(wizardStep - 1)}
                    className="btn-ghost flex-1"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-ghost flex-1"
                >
                  Cancel
                </button>
                {!editingStudent && wizardStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleWizardNext}
                    disabled={
                      (wizardStep === 1 && !selectedYear) ||
                      (wizardStep === 2 && !selectedDepartment) ||
                      (wizardStep === 3 && !selectedSection)
                    }
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : editingStudent ? 'Update' : 'Add'} Student
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

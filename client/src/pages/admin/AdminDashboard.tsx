import { useState, useEffect } from 'react';
import StatCard from '../../components/common/StatCard';
import { statsApi, AdminStats, DepartmentStats, departmentsApi, Department } from '@/services/api';
import { toast } from 'sonner';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const recentActivities = [
  { id: 1, action: 'New student enrolled', name: 'Rahul Sharma', department: 'Computer Science', time: '2 minutes ago' },
  { id: 2, action: 'Faculty added', name: 'Dr. Priya Singh', department: 'Electronics', time: '15 minutes ago' },
  { id: 3, action: 'Marks updated', name: 'Internal 1 - CSE-A', department: 'Computer Science', time: '1 hour ago' },
  { id: 4, action: 'New department created', name: 'Data Science', department: 'Administration', time: '2 hours ago' },
  { id: 5, action: 'Timetable updated', name: 'ECE 2nd Year', department: 'Electronics', time: '3 hours ago' },
];

const YEARS = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const [stats, deptStats, depts] = await Promise.all([
        statsApi.getAdminStats(),
        statsApi.getDepartmentStats(),
        departmentsApi.getAll(),
      ]);
      setAdminStats(stats);
      setDepartmentStats(deptStats);
      setDepartments(depts);
    } catch (err) {
      console.error('Error fetching stats:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load statistics';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const stats = adminStats ? [
    {
      title: 'Total Students',
      value: adminStats.totalStudents.toLocaleString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'primary' as const,
      gradient: true,
    },
    {
      title: 'Total Faculty',
      value: adminStats.totalFaculty.toLocaleString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'success' as const,
      gradient: true,
    },
    {
      title: 'Departments',
      value: adminStats.totalDepartments.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'warning' as const,
      gradient: true,
    },
    {
      title: 'Active Subjects',
      value: adminStats.totalSubjects.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'secondary' as const,
      gradient: true,
    },
  ] : [];

  const departmentColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500'];

  // Filter department stats based on selection
  const filteredDepartmentStats = selectedDepartment === 'all'
    ? departmentStats
    : departmentStats.filter(dept => dept.id === selectedDepartment);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening in your institution.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input-base pr-10 appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <svg className="w-5 h-5 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-base pr-10 appearance-none cursor-pointer min-w-[150px]"
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <svg className="w-5 h-5 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Recent Activity</h2>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">
                    {activity.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.name}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <span className="badge-primary text-xs">{activity.department}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Overview */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Department Overview</h2>
            <button className="text-sm text-primary hover:underline">Manage</button>
          </div>
          <div className="space-y-4">
            {filteredDepartmentStats.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No departments found</p>
            ) : (
              filteredDepartmentStats.map((dept, index) => {
                const color = departmentColors[index % departmentColors.length];
                const maxStudents = Math.max(...filteredDepartmentStats.map(d => d.studentsCount), 1);
                return (
                  <div key={dept.id} className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{dept.name}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{dept.studentsCount} Students</span>
                        <span>{dept.facultyCount} Faculty</span>
                      </div>
                    </div>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full transition-all duration-500`}
                        style={{ width: `${(dept.studentsCount / maxStudents) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Calendar / Upcoming Events */}
      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Upcoming Events</h2>
          <button className="text-sm text-primary hover:underline">View Calendar</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Internal Exams - Semester 1', date: 'Jan 20, 2026', type: 'Examination', typeColor: 'destructive' },
            { title: 'Faculty Development Program', date: 'Jan 25, 2026', type: 'Workshop', typeColor: 'warning' },
            { title: 'Annual Sports Meet', date: 'Feb 5, 2026', type: 'Event', typeColor: 'success' },
          ].map((event, index) => (
            <div key={index} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
              <div className={`badge-${event.typeColor} mb-2`}>{event.type}</div>
              <h3 className="font-medium text-foreground">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

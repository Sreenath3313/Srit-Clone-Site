import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { attendanceApi } from '@/services/api';
import type { Attendance } from '@/services/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import EmptyState from '@/components/common/EmptyState';
import { toast } from 'sonner';

// Circular Progress Component
function CircularProgress({ percentage, size = 220, strokeWidth = 18 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  const getColor = () => {
    if (percentage >= 85) return '#22c55e'; // green
    if (percentage >= 75) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getGradient = () => {
    if (percentage >= 85) return 'from-green-500 to-emerald-600';
    if (percentage >= 75) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold bg-gradient-to-br ${getGradient()} bg-clip-text text-transparent`}>
          {percentage}%
        </span>
        <span className="text-sm text-muted-foreground mt-2 font-medium">Attendance</span>
      </div>
    </div>
  );
}

export default function StudentAttendance() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Fixed: Only depend on user?.profile?.id to prevent infinite loop
  useEffect(() => {
    if (user?.profile?.id) {
      fetchAttendance();
    }
  }, [user?.profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAttendance = async () => {
    if (!user?.profile?.id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await attendanceApi.getByStudent(user.profile.id);
      setAttendance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const subjects = useMemo(() => {
    const subjectMap = new Map<string, { name: string; code: string; present: number; absent: number; total: number }>();
    
    attendance.forEach(a => {
      const subjectName = a.subjects?.name || 'Unknown Subject';
      const subjectCode = a.subjects?.code || 'N/A';
      
      if (!subjectMap.has(a.subject_id)) {
        subjectMap.set(a.subject_id, { name: subjectName, code: subjectCode, present: 0, absent: 0, total: 0 });
      }
      
      const data = subjectMap.get(a.subject_id)!;
      data.total++;
      if (a.present) {
        data.present++;
      } else {
        data.absent++;
      }
    });

    return Array.from(subjectMap.values());
  }, [attendance]);

  const { totalPresent, totalAbsent, totalClasses, overallPercentage } = useMemo(() => {
    const totalPresent = subjects.reduce((sum, s) => sum + s.present, 0);
    const totalAbsent = subjects.reduce((sum, s) => sum + s.absent, 0);
    const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
    const overallPercentage = totalClasses > 0 ? Number(((totalPresent / totalClasses) * 100).toFixed(0)) : 0;
    return { totalPresent, totalAbsent, totalClasses, overallPercentage };
  }, [subjects]);

  const handleExport = () => {
    try {
      // Create CSV content
      const headers = ['Subject', 'Subject Code', 'Present', 'Absent', 'Total', 'Percentage', 'Status'];
      const rows = subjects.map(s => {
        const pct = ((s.present / s.total) * 100).toFixed(1);
        const status = Number(pct) >= 75 ? 'Good' : 'Low';
        return [s.name, s.code, s.present, s.absent, s.total, `${pct}%`, status];
      });
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Attendance data exported successfully!');
    } catch (err) {
      toast.error('Failed to export attendance data');
    }
  };

  if (loading) {
    return <LoadingSpinner className="min-h-[400px]" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!user?.profile) {
    return <ErrorMessage message="Unable to load profile. Please try logging in again." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Title and Export Button */}
      <div className="flex items-center justify-between">
        <h1 className="page-title">My Attendance</h1>
        {totalClasses > 0 && (
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
        )}
      </div>
      
      {totalClasses === 0 ? (
        <EmptyState message="No attendance records" description="Your attendance will appear once classes begin" />
      ) : (
        <>
          {/* Overall Attendance Section with Circular Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Circular Progress Card */}
            <div className="lg:col-span-1 card-hover p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Overall Progress</h2>
              <div className="flex flex-col items-center justify-center">
                <CircularProgress percentage={overallPercentage} />
                <div className="mt-6 grid grid-cols-2 gap-6 w-full">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalPresent}</p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1 font-medium">Present</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">{totalAbsent}</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1 font-medium">Absent</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Total Classes: <span className="font-bold text-foreground">{totalClasses}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Attendance Rate Card */}
              <div className="card-hover p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Attendance Rate</p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">{overallPercentage}%</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {overallPercentage >= 75 ? '✅ Meeting requirement' : '⚠️ Below requirement'}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Subjects Card */}
              <div className="card-hover p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Total Subjects</p>
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{subjects.length}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Active this semester
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Classes Attended Card */}
              <div className="card-hover p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-200 dark:border-orange-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Classes Attended</p>
                    <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">{totalPresent}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Out of {totalClasses} total
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Classes Missed Card */}
              <div className="card-hover p-6 bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-200 dark:border-red-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Classes Missed</p>
                    <p className="text-4xl font-bold text-red-600 dark:text-red-400">{totalAbsent}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {totalAbsent > 0 ? 'Try to improve' : 'Perfect record!'}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subject-wise Breakdown Section */}
          <div className="card-hover p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Subject-wise Breakdown</h2>
              <div className="flex gap-2 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'cards'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'table'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Table
                </button>
              </div>
            </div>

            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((s) => {
                  const pct = Number(((s.present / s.total) * 100).toFixed(0));
                  const isGood = pct >= 75;
                  const isExcellent = pct >= 85;
                  
                  return (
                    <div 
                      key={s.code} 
                      className="group relative overflow-hidden p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted hover:shadow-xl transition-all duration-300 border border-border"
                    >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/5 group-hover:to-orange-600/5 transition-all duration-300" />
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-foreground text-lg mb-1 line-clamp-2">{s.name}</h3>
                            <p className="text-xs text-muted-foreground font-medium">{s.code}</p>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-sm font-bold shadow-md ${
                            isExcellent ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' :
                            isGood ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' :
                            'bg-gradient-to-r from-red-500 to-red-600 text-white'
                          }`}>
                            {pct}%
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative w-full h-3 bg-background/80 rounded-full overflow-hidden mb-4 shadow-inner">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              isExcellent ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                              isGood ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                              'bg-gradient-to-r from-red-500 to-red-600'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 rounded-lg bg-background/60">
                            <p className="text-xs text-muted-foreground mb-0.5">Present</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">{s.present}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-background/60">
                            <p className="text-xs text-muted-foreground mb-0.5">Absent</p>
                            <p className="text-lg font-bold text-red-600 dark:text-red-400">{s.absent}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-background/60">
                            <p className="text-xs text-muted-foreground mb-0.5">Total</p>
                            <p className="text-lg font-bold text-foreground">{s.total}</p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-3 flex items-center justify-center">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            isExcellent ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                            isGood ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                            'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                          }`}>
                            {isExcellent ? '🌟 Excellent' : isGood ? '✅ Good' : '⚠️ Needs Improvement'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-bold text-foreground">Subject</th>
                      <th className="text-center p-4 font-bold text-foreground">Code</th>
                      <th className="text-center p-4 font-bold text-foreground">Present</th>
                      <th className="text-center p-4 font-bold text-foreground">Absent</th>
                      <th className="text-center p-4 font-bold text-foreground">Total</th>
                      <th className="text-center p-4 font-bold text-foreground">Percentage</th>
                      <th className="text-center p-4 font-bold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((s) => {
                      const pct = Number(((s.present / s.total) * 100).toFixed(1));
                      const isGood = pct >= 75;
                      const isExcellent = pct >= 85;
                      
                      return (
                        <tr key={s.code} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div>
                              <p className="font-semibold text-foreground">{s.name}</p>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-sm text-muted-foreground font-medium">{s.code}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="font-bold text-green-600 dark:text-green-400">{s.present}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="font-bold text-red-600 dark:text-red-400">{s.absent}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="font-bold text-foreground">{s.total}</span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex flex-col items-center gap-2">
                              <span className="font-bold text-foreground">{pct}%</span>
                              <div className="w-24 h-2 bg-background rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    isExcellent ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                                    isGood ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                    'bg-gradient-to-r from-red-500 to-red-600'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              isExcellent ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                              isGood ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                              'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                            }`}>
                              {isExcellent ? 'Excellent' : isGood ? 'Good' : 'Low'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Calendar View Placeholder */}
          <div className="card-hover p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Monthly Calendar View</h2>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium shadow-md">
                Coming Soon
              </span>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/30 to-muted/50 p-12 text-center border-2 border-dashed border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5" />
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Calendar View</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Track your daily attendance with an interactive calendar view. This feature is coming soon!
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

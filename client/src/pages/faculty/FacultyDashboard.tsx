import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { timetableApi, Timetable } from '@/services/api';
import { toast } from 'sonner';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';

interface AssignedClass {
  subject: string;
  sections: string[];
  students?: number; // Optional - not used for faculty
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIOD_TIMES = ['9:00 - 9:50', '10:00 - 10:50', '11:00 - 11:50', '12:00 - 12:50', '1:30 - 2:20', '2:30 - 3:20', '3:30 - 4:20'];

export default function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [assignedClasses, setAssignedClasses] = useState<AssignedClass[]>([]);

  // Fixed: Only depend on user?.profile?.id to prevent infinite loop
  // The user object reference may change but the ID remains stable
  useEffect(() => {
    if (user?.profile?.id) {
      fetchData();
    }
  }, [user?.profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    if (!user?.profile?.id) return;

    try {
      setLoading(true);
      setError(null);

      console.log('[FacultyDashboard] Fetching faculty timetable...');
      const data = await timetableApi.getByFaculty();
      console.log(`[FacultyDashboard] Loaded ${data.length} timetable entries`);
      
      if (data.length === 0) {
        console.warn('[FacultyDashboard] No timetable assignments found for faculty');
        toast.info('No classes assigned yet. Please contact your administrator.');
      }
      
      setTimetable(data);

      const today = DAYS[new Date().getDay()];
      const todayClasses = data
        .filter(item => item.day === today)
        .sort((a, b) => a.period - b.period)
        .map(item => ({
          period: item.period,
          time: PERIOD_TIMES[item.period - 1] || 'N/A',
          subject: item.subjects?.name || 'N/A',
          section: item.sections?.name || 'N/A',
          room: 'Room TBD',
        }));
      setTodaySchedule(todayClasses);

      const classMap = new Map<string, { sections: Set<string>; sectionIds: Set<string> }>();
      data.forEach(item => {
        const subjectName = item.subjects?.name || 'N/A';
        const sectionName = item.sections?.name || 'N/A';
        const sectionId = item.section_id;

        if (!classMap.has(subjectName)) {
          classMap.set(subjectName, { sections: new Set(), sectionIds: new Set() });
        }
        classMap.get(subjectName)!.sections.add(sectionName);
        classMap.get(subjectName)!.sectionIds.add(sectionId);
      });

      // Build assigned classes without fetching student counts
      // Faculty don't need student counts on dashboard - they see students when marking attendance/marks
      const classes: AssignedClass[] = [];
      for (const [subject, { sections }] of classMap.entries()) {
        classes.push({
          subject,
          sections: Array.from(sections),
        });
      }
      setAssignedClasses(classes);
    } catch (err) {
      console.error('Error fetching faculty dashboard data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError(errorMessage);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (!user?.profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="page-title">Dashboard</h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  const stats = [
    {
      title: 'Assigned Classes',
      value: assignedClasses.length.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'primary' as const,
      gradient: true,
    },
    {
      title: 'Total Sections',
      value: String(new Set(timetable.map(t => t.section_id)).size),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'success' as const,
      gradient: true,
    },
    {
      title: 'Classes Today',
      value: todaySchedule.length.toString(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'warning' as const,
      gradient: true,
    },
    {
      title: 'Pending Marks',
      value: '0',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'secondary' as const,
      gradient: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user.name}! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="card-base p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Today's Schedule
            </h2>
            <span className="px-3 py-1 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm font-medium shadow-md">
              {DAYS[new Date().getDay()]}
            </span>
          </div>
          {todaySchedule.length === 0 ? (
            <EmptyState message="No classes scheduled for today" description="Enjoy your free day!" />
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {todaySchedule.map((item, index) => {
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                const [startTime] = item.time.split(' - ')[0].split(':');
                const periodStartHour = parseInt(startTime);
                const isUpcoming = currentHour < periodStartHour || (currentHour === periodStartHour && currentMinute < 50);
                const isCurrent = currentHour === periodStartHour;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      isCurrent
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                        : isUpcoming
                        ? 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900'
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl ${isCurrent ? 'bg-white/20' : 'bg-gradient-to-br from-orange-500 to-orange-600'} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                      P{item.period}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold ${isCurrent ? 'text-white' : 'text-foreground'}`}>{item.subject}</p>
                      <div className={`flex items-center gap-3 text-sm ${isCurrent ? 'text-white/90' : 'text-muted-foreground'}`}>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {item.section}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {item.room}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${isCurrent ? 'text-white' : 'text-foreground'}`}>{item.time}</p>
                      {isCurrent && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium animate-pulse">
                          Now
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Assigned Classes */}
        <div className="card-base p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              Assigned Classes
            </h2>
          </div>
          {assignedClasses.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-lg font-medium text-foreground mb-1">No assigned classes</p>
              <p className="text-sm text-muted-foreground mb-4">You don't have any classes assigned yet</p>
              <p className="text-xs text-muted-foreground">
                💡 Tip: Contact your administrator to assign classes to you
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {assignedClasses.map((item, index) => (
                <div key={index} className="group flex items-center gap-4 p-4 rounded-xl border border-border hover:border-orange-500/50 bg-white dark:bg-slate-900 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-950 dark:hover:to-orange-900 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{item.subject}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {item.sections.map((sec) => (
                        <span key={sec} className="px-2 py-0.5 rounded-md bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xs font-medium shadow-sm">{sec}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                      {item.sections.length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.sections.length === 1 ? 'Section' : 'Sections'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 card-base p-6 shadow-lg">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/faculty/attendance')}
              className="group p-6 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Mark Attendance</p>
                  <p className="text-sm text-white/80">Record daily attendance</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => navigate('/faculty/marks')}
              className="group p-6 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Enter Marks</p>
                  <p className="text-sm text-white/80">Update student marks</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card-base p-6 shadow-lg">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Recent
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Attendance marked</p>
                <p className="text-xs text-muted-foreground">Today's classes completed</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-green-600 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Marks updated</p>
                <p className="text-xs text-muted-foreground">Internal 1 submissions</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New assignment</p>
                <p className="text-xs text-muted-foreground">Class schedule updated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useMemo, useCallback } from 'react';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useAuth } from '@/contexts/AuthContext';
import { attendanceApi, timetableApi, marksApi } from '@/services/api';
import type { Attendance, Timetable, Marks } from '@/services/api';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PERIOD_TIMES: Record<number, string> = {
  1: '9:00 - 9:50',
  2: '10:00 - 10:50',
  3: '11:00 - 11:50',
  4: '12:00 - 12:50',
  5: '1:30 - 2:20',
  6: '2:30 - 3:20',
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const COLORS = ['#22c55e', '#ef4444'];

function CircularProgress({ percentage }: { percentage: number }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 85) return '#22c55e';
    if (percentage >= 75) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={200} height={200} className="-rotate-90">
        <circle cx="100" cy="100" r={radius} stroke="#e5e7eb" strokeWidth="16" fill="none" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke={getColor()}
          strokeWidth="16"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-bold">{percentage}%</p>
        <p className="text-sm text-muted-foreground">Attendance</p>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [marks, setMarks] = useState<Marks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user?.profile?.id || !user?.profile?.section_id) return;
    try {
      setLoading(true);
      const [a, t, m] = await Promise.all([
        attendanceApi.getByStudent(user.profile.id),
        timetableApi.getBySection(user.profile.section_id),
        marksApi.getByStudent(user.profile.id),
      ]);
      setAttendance(a);
      setTimetable(t);
      setMarks(m);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [user?.profile?.id, user?.profile?.section_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
    toast.success('Data refreshed');
  };

  const attendancePercent = useMemo(() => {
    if (!attendance.length) return 0;
    const present = attendance.filter(a => a.present).length;
    return Math.round((present / attendance.length) * 100);
  }, [attendance]);

  const todaySchedule = useMemo(() => {
    const today = DAYS[new Date().getDay()];
    return timetable
      .filter(t => t.day === today)
      .sort((a, b) => a.period - b.period);
  }, [timetable]);

  const recentMarks = useMemo(() => marks.slice(0, 5), [marks]);

  if (loading) return <LoadingSpinner className="min-h-[400px]" />;
  if (error) return <ErrorMessage message={error} />;
  if (!user?.profile) return <ErrorMessage message="Profile not found" />;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-xl bg-orange-500 p-6 text-white flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p>Student Dashboard</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-white text-orange-600 px-4 py-2 rounded-lg"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-hover p-6 flex justify-center">
          <CircularProgress percentage={attendancePercent} />
        </div>

        <div className="card-hover p-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={[
                { name: 'Present', value: attendance.filter(a => a.present).length },
                { name: 'Absent', value: attendance.filter(a => !a.present).length },
              ]} dataKey="value" innerRadius={60} outerRadius={90}>
                {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="card-hover p-6">
        <h2 className="section-title mb-4">Today's Schedule</h2>
        {todaySchedule.length === 0 ? (
          <p>No classes today</p>
        ) : (
          todaySchedule.map((t, i) => (
            <div key={i} className="flex justify-between p-3 border rounded-lg mb-2">
              <span>{t.subjects?.name}</span>
              <span>{PERIOD_TIMES[t.period]}</span>
            </div>
          ))
        )}
      </div>

      {/* Recent Marks */}
      <div className="card-hover p-6">
        <h2 className="section-title mb-4">Recent Marks</h2>
        {recentMarks.length === 0 ? (
          <p>No marks available</p>
        ) : (
          recentMarks.map((m, i) => (
            <div key={i} className="flex justify-between p-3 border rounded-lg mb-2">
              <span>{m.subjects?.name}</span>
              <span>{(m.internal1 || 0) + (m.internal2 || 0) + (m.external || 0)}/140</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

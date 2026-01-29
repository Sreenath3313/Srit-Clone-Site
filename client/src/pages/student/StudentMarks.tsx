import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { marksApi } from '@/services/api';
import type { Marks } from '@/services/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import EmptyState from '@/components/common/EmptyState';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Download, TrendingUp, Award, BookOpen } from 'lucide-react';

interface MarksData {
  subject: string;
  internal1: number;
  internal2: number;
  external: number;
  total: number;
  percentage: number;
  grade: string;
  gradePoints: number;
}

export default function StudentMarks() {
  const { user } = useAuth();
  const [marks, setMarks] = useState<Marks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.profile?.id) {
      fetchMarks();
    }
  }, [user?.profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMarks = async () => {
    if (!user?.profile?.id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await marksApi.getByStudent(user.profile.id);
      setMarks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load marks');
    } finally {
      setLoading(false);
    }
  };

  const calculateGrade = (percentage: number): { grade: string; points: number } => {
    if (percentage >= 90) return { grade: 'A+', points: 10 };
    if (percentage >= 80) return { grade: 'A', points: 9 };
    if (percentage >= 70) return { grade: 'B+', points: 8 };
    if (percentage >= 60) return { grade: 'B', points: 7 };
    if (percentage >= 50) return { grade: 'C+', points: 6 };
    if (percentage >= 40) return { grade: 'C', points: 5 };
    return { grade: 'F', points: 0 };
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'A+': return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 'A': return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
      case 'B+': return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
      case 'B': return 'bg-gradient-to-r from-green-400 to-yellow-400 text-white';
      case 'C+': return 'bg-gradient-to-r from-blue-400 to-green-400 text-white';
      case 'C': return 'bg-gradient-to-r from-gray-400 to-blue-400 text-white';
      default: return 'bg-gradient-to-r from-red-600 to-red-700 text-white';
    }
  };

  const processMarksData = (): MarksData[] => {
    return marks.map((m) => {
      const i1 = m.internal1 || 0;
      const i2 = m.internal2 || 0;
      const ext = m.external || 0;
      const total = i1 + i2 + ext;
      const percentage = (total / 140) * 100;
      const { grade, points } = calculateGrade(percentage);
      
      return {
        subject: m.subjects?.name || 'Unknown',
        internal1: i1,
        internal2: i2,
        external: ext,
        total,
        percentage,
        grade,
        gradePoints: points,
      };
    });
  };

  const calculateSGPA = (marksData: MarksData[]): number => {
    if (marksData.length === 0) return 0;
    const totalPoints = marksData.reduce((sum, m) => sum + m.gradePoints, 0);
    return totalPoints / marksData.length;
  };

  const exportToCSV = () => {
    const marksData = processMarksData();
    const headers = ['Subject', 'Internal 1', 'Internal 2', 'External', 'Total', 'Percentage', 'Grade'];
    const rows = marksData.map(m => [
      m.subject,
      m.internal1,
      m.internal2,
      m.external,
      m.total,
      m.percentage.toFixed(2),
      m.grade
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marks_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  if (marks.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="page-title">My Marks</h1>
        <EmptyState message="No marks available" description="Your marks will appear once they are entered by faculty" />
      </div>
    );
  }

  const marksData = processMarksData();
  const sgpa = calculateSGPA(marksData);
  const cgpa = sgpa; // In a real scenario, this would calculate across all semesters
  const totalSubjects = marksData.length;
  const averagePercentage = marksData.reduce((sum, m) => sum + m.percentage, 0) / totalSubjects;

  const chartData = marksData.map(m => ({
    name: m.subject.length > 15 ? m.subject.substring(0, 15) + '...' : m.subject,
    'Internal 1': m.internal1,
    'Internal 2': m.internal2,
    'External': m.external,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="page-title">Academic Performance</h1>
        <button
          onClick={exportToCSV}
          className="btn-primary flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* SGPA/CGPA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-base bg-gradient-to-br from-orange-500 to-red-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold">SGPA</h3>
          </div>
          <p className="text-4xl font-bold mt-2">{sgpa.toFixed(2)}</p>
          <p className="text-sm mt-1 text-white/80">Semester Grade Point Average</p>
        </div>

        <div className="card-base bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold">CGPA</h3>
          </div>
          <p className="text-4xl font-bold mt-2">{cgpa.toFixed(2)}</p>
          <p className="text-sm mt-1 text-white/80">Cumulative Grade Point Average</p>
        </div>

        <div className="card-base bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold">Average</h3>
          </div>
          <p className="text-4xl font-bold mt-2">{averagePercentage.toFixed(1)}%</p>
          <p className="text-sm mt-1 text-white/80">{totalSubjects} Subjects</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="card-base p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          Performance Overview
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#6b7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="Internal 1" fill="#fb923c" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Internal 2" fill="#f97316" radius={[4, 4, 0, 0]} />
              <Bar dataKey="External" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Marks Table */}
      <div className="card-base overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            Subject-wise Performance
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="table-cell text-left">Subject</th>
                <th className="table-cell text-center">Internal 1<br/><span className="text-xs text-muted-foreground">(20)</span></th>
                <th className="table-cell text-center">Internal 2<br/><span className="text-xs text-muted-foreground">(20)</span></th>
                <th className="table-cell text-center">External<br/><span className="text-xs text-muted-foreground">(100)</span></th>
                <th className="table-cell text-center">Total<br/><span className="text-xs text-muted-foreground">(140)</span></th>
                <th className="table-cell text-center">Percentage</th>
                <th className="table-cell text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((m, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors duration-150"
                >
                  <td className="table-cell font-medium text-foreground">{m.subject}</td>
                  <td className="table-cell text-center">
                    <span className="font-medium">{m.internal1 > 0 ? m.internal1 : '-'}</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="font-medium">{m.internal2 > 0 ? m.internal2 : '-'}</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="font-medium">{m.external > 0 ? m.external : '-'}</span>
                  </td>
                  <td className="table-cell text-center">
                    <span className="font-bold text-lg">{m.total}</span>
                  </td>
                  <td className="table-cell text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-full max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(m.percentage, 100)}%` }}
                        />
                      </div>
                      <span className="font-semibold text-sm min-w-[45px]">{m.percentage.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="table-cell text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold shadow-sm ${getGradeColor(m.grade)}`}>
                      {m.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-base p-4 border-l-4 border-orange-500">
          <p className="text-sm text-muted-foreground">Total Subjects</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{totalSubjects}</p>
        </div>
        <div className="card-base p-4 border-l-4 border-green-500">
          <p className="text-sm text-muted-foreground">Highest Score</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {Math.max(...marksData.map(m => m.percentage)).toFixed(1)}%
          </p>
        </div>
        <div className="card-base p-4 border-l-4 border-blue-500">
          <p className="text-sm text-muted-foreground">Lowest Score</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {Math.min(...marksData.map(m => m.percentage)).toFixed(1)}%
          </p>
        </div>
        <div className="card-base p-4 border-l-4 border-purple-500">
          <p className="text-sm text-muted-foreground">Grade Points</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{sgpa.toFixed(2)}/10</p>
        </div>
      </div>
    </div>
  );
}

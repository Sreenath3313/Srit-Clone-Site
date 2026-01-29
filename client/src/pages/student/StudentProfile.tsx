import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  User, 
  GraduationCap, 
  TrendingUp, 
  History, 
  CreditCard, 
  AlertCircle, 
  Plane, 
  MessageCircle, 
  ShieldAlert,
  Printer,
  Download,
  Phone,
  MapPin,
  Users
} from 'lucide-react';

// Constants for academic year calculations
const MAX_STUDY_YEARS = 4; // 4-year degree program
const MAX_SEMESTERS = 8; // 2 semesters per year for 4 years
const SEMESTER_1_START_MONTH = 6; // July (month index 6, 0-based)
const SEMESTER_1_END_MONTH = 11; // December (month index 11, 0-based)

// Placeholder data constants
const PLACEHOLDER_PHONE = '+91 XXXX-XXX-XXX';

export default function StudentProfile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bio-data');

  const handleChangePassword = () => {
    navigate('/student/change-password');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    toast.info('Export functionality will be implemented soon');
  };

  if (loading) {
    return <LoadingSpinner className="min-h-[400px]" />;
  }

  if (!user?.profile) {
    return <ErrorMessage message="Unable to load profile. Please try logging in again." />;
  }

  const profile = user.profile;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Calculate current year and semester
  const currentYear = new Date().getFullYear();
  const yearsPassed = currentYear - profile.admission_year;
  const studyYear = Math.min(yearsPassed + 1, MAX_STUDY_YEARS);
  const displayYear = studyYear === MAX_STUDY_YEARS ? 'Final Year' : `Year ${studyYear}`;

  const currentMonth = new Date().getMonth(); // 0-11
  const semesterInYear =
    currentMonth >= SEMESTER_1_START_MONTH && currentMonth <= SEMESTER_1_END_MONTH ? 1 : 2;
  const semester = Math.min((studyYear - 1) * 2 + semesterInYear, MAX_SEMESTERS);
  const displaySemester = semester > MAX_SEMESTERS ? 'Final' : `Semester ${semester}`;

  // ✅ ALWAYS prefer direct department, fallback to section->department
  const departmentName =
    profile.departments?.name ||
    profile.sections?.departments?.name ||
    'Not Assigned - Contact Admin';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
          <p className="text-gray-600 mt-1">View and manage your academic profile</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#FF6B35] text-[#FF6B35] rounded-lg hover:bg-[#FF6B35] hover:text-white transition-all duration-300 font-medium shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Profile Card with Photo */}
      <Card className="overflow-hidden border-2 border-gray-200" withHover={false}>
        <div className="h-32 bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FF6B35]"></div>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row gap-6 -mt-16 relative">
            {/* Profile Photo */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] flex items-center justify-center text-4xl font-bold text-white shadow-xl border-4 border-white">
              {initials}
            </div>
            
            {/* Quick Info */}
            <div className="flex-1 mt-20 sm:mt-16">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-[#FF6B35] font-semibold text-lg">{profile.roll_no}</p>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4 text-[#FF6B35]" />
                  <span>{departmentName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4 text-[#FF6B35]" />
                  <span>{displayYear} - {displaySemester}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto bg-white border-2 border-gray-200 p-1 gap-1">
          <TabsTrigger 
            value="bio-data" 
            className="flex items-center gap-2 flex-1 min-w-[140px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">BIO-DATA</span>
            <span className="sm:hidden">Bio</span>
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="flex items-center gap-2 flex-1 min-w-[140px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">PERFORMANCE</span>
            <span className="sm:hidden">Current</span>
          </TabsTrigger>
          <TabsTrigger 
            value="past-performance" 
            className="flex items-center gap-2 flex-1 min-w-[140px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">PAST PERF.</span>
            <span className="sm:hidden">Past</span>
          </TabsTrigger>
          <TabsTrigger 
            value="fees" 
            className="flex items-center gap-2 flex-1 min-w-[140px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white"
          >
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">FEE DETAILS</span>
            <span className="sm:hidden">Fees</span>
          </TabsTrigger>
          <TabsTrigger 
            value="backlogs" 
            className="flex items-center gap-2 flex-1 min-w-[140px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="hidden sm:inline">BACKLOGS</span>
            <span className="sm:hidden">Backlogs</span>
          </TabsTrigger>
          <TabsTrigger 
            value="outings" 
            className="flex items-center gap-2 flex-1 min-w-[140px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white"
          >
            <Plane className="w-4 h-4" />
            <span className="hidden sm:inline">OUTINGS</span>
            <span className="sm:hidden">Outings</span>
          </TabsTrigger>
          <TabsTrigger 
            value="counseling" 
            className="flex items-center gap-2 flex-1 min-w-[140px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">COUNSELING</span>
            <span className="sm:hidden">Counsel</span>
          </TabsTrigger>
          <TabsTrigger 
            value="disciplinary" 
            className="flex items-center gap-2 flex-1 min-w-[140px] data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF8C42] data-[state=active]:text-white"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">DISCIPLINARY</span>
            <span className="sm:hidden">Actions</span>
          </TabsTrigger>
        </TabsList>

        {/* BIO-DATA Tab */}
        <TabsContent value="bio-data" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Details */}
            <Card className="lg:col-span-2 border-2 border-gray-200 shadow-lg" withHover={false}>
              <CardHeader className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700 w-1/3">Roll Number</td>
                        <td className="py-3 px-4 text-gray-900">{profile.roll_no}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Full Name</td>
                        <td className="py-3 px-4 text-gray-900">{profile.name}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Email</td>
                        <td className="py-3 px-4 text-gray-900">{user.email}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Department</td>
                        <td className="py-3 px-4 text-gray-900">{departmentName}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Section</td>
                        <td className="py-3 px-4 text-gray-900">{profile.sections?.name || 'Not Assigned'}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Current Year</td>
                        <td className="py-3 px-4 text-gray-900">{displayYear}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Current Semester</td>
                        <td className="py-3 px-4 text-gray-900">{displaySemester}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-700">Admission Year</td>
                        <td className="py-3 px-4 text-gray-900">{profile.admission_year}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-2 border-gray-200 shadow-lg" withHover={false}>
              <CardHeader className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Info
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Phone Number</p>
                    <p className="text-gray-600 text-sm">{PLACEHOLDER_PHONE}</p>
                    <p className="text-xs text-gray-500 mt-1">Contact admin to update</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FF6B35]" />
                      Address
                    </p>
                    <p className="text-gray-600 text-sm">
                      Address details will be available soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guardian Details */}
            <Card className="lg:col-span-3 border-2 border-gray-200 shadow-lg" withHover={false}>
              <CardHeader className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Guardian / Parent Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Father's Name</p>
                    <p className="text-gray-600">Information will be available soon</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Father's Contact</p>
                    <p className="text-gray-600">{PLACEHOLDER_PHONE}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Mother's Name</p>
                    <p className="text-gray-600">Information will be available soon</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Mother's Contact</p>
                    <p className="text-gray-600">{PLACEHOLDER_PHONE}</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Note:</strong> To update guardian details, please contact the administration office.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Change Password Section */}
            <Card className="lg:col-span-3 border-2 border-[#FF6B35] shadow-lg" withHover={false}>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Account Security</h3>
                    <p className="text-gray-600 text-sm mt-1">Manage your account password and security settings</p>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Change Password
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PERFORMANCE (Present) Tab */}
        <TabsContent value="performance" className="mt-6">
          <Card className="border-2 border-gray-200 shadow-lg" withHover={false}>
            <CardHeader className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Current Performance - {displaySemester}
              </CardTitle>
              <CardDescription className="text-white/90">
                View your current semester performance and grades
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Data Coming Soon</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Your current semester performance data will be available here once grades are published.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PERFORMANCE (Past) Tab */}
        <TabsContent value="past-performance" className="mt-6">
          <Card className="border-2 border-gray-200 shadow-lg" withHover={false}>
            <CardHeader className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Past Performance Records
              </CardTitle>
              <CardDescription className="text-white/90">
                View your performance history from previous semesters
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-full flex items-center justify-center mb-4">
                  <History className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Past Performance Data Coming Soon</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Your historical performance data from previous semesters will be displayed here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FEE DETAILS Tab */}
        <TabsContent value="fees" className="mt-6">
          <Card className="border-2 border-gray-200 shadow-lg" withHover={false}>
            <CardHeader className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Fee Payment Details
              </CardTitle>
              <CardDescription className="text-white/90">
                Track your fee payments and pending dues
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fee Details Coming Soon</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Your fee payment history and pending dues will be available here soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BACKLOGS Tab */}
        <TabsContent value="backlogs" className="mt-6">
          <Card className="border-2 border-gray-200 shadow-lg" withHover={false}>
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Backlog Information
              </CardTitle>
              <CardDescription className="text-white/90">
                View any pending backlogs and subjects to clear
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Backlogs</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Great job! You don't have any pending backlogs. Keep up the good work!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OUTINGS Tab */}
        <TabsContent value="outings" className="mt-6">
          <Card className="border-2 border-gray-200 shadow-lg" withHover={false}>
            <CardHeader className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                Outing Records
              </CardTitle>
              <CardDescription className="text-white/90">
                View your outing history and requests
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-full flex items-center justify-center mb-4">
                  <Plane className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Outing Records Coming Soon</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Your outing history and leave requests will be displayed here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* COUNSELING Tab */}
        <TabsContent value="counseling" className="mt-6">
          <Card className="border-2 border-gray-200 shadow-lg" withHover={false}>
            <CardHeader className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Counseling Details
              </CardTitle>
              <CardDescription className="text-white/90">
                View your counseling sessions and records
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Counseling Records Coming Soon</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Your counseling session records and notes will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DISCIPLINARY Tab */}
        <TabsContent value="disciplinary" className="mt-6">
          <Card className="border-2 border-gray-200 shadow-lg" withHover={false}>
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" />
                Disciplinary Action Records
              </CardTitle>
              <CardDescription className="text-white/90">
                View any disciplinary actions or notices
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
                  <ShieldAlert className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Disciplinary Actions</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Excellent! You have a clean disciplinary record. Continue maintaining good conduct!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

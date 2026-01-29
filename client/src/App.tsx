import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Component, ReactNode, useEffect, lazy, Suspense } from "react";

// Lazy load all page components
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Login = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Departments = lazy(() => import("./pages/Departments"));
const DepartmentDetail = lazy(() => import("./pages/DepartmentDetail"));
const Admissions = lazy(() => import("./pages/Admissions"));
const Contact = lazy(() => import("./pages/Contact"));
const Courses = lazy(() => import("./pages/Courses"));
const AdmissionProcedure = lazy(() => import("./pages/AdmissionProcedure"));
const FeesStructure = lazy(() => import("./pages/FeesStructure"));
const Scholarships = lazy(() => import("./pages/Scholarships"));
const Academics = lazy(() => import("./pages/Academics"));
const CampusLife = lazy(() => import("./pages/CampusLife"));
const StudentChapters = lazy(() => import("./pages/StudentChapters"));
const Examination = lazy(() => import("./pages/Examination"));
const Placements = lazy(() => import("./pages/Placements"));
const Committees = lazy(() => import("./pages/Committees"));
const CommunityServices = lazy(() => import("./pages/CommunityServices"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const ApplyNow = lazy(() => import("./pages/ApplyNow"));
const ExploreCampus = lazy(() => import("./pages/ExploreCampus"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminDepartments = lazy(() => import("./pages/admin/AdminDepartments"));
const AdminSections = lazy(() => import("./pages/admin/AdminSections"));
const AdminSubjects = lazy(() => import("./pages/admin/AdminSubjects"));
const AdminStudents = lazy(() => import("./pages/admin/AdminStudents"));
const AdminFaculty = lazy(() => import("./pages/admin/AdminFaculty"));
const AdminAssignments = lazy(() => import("./pages/admin/AdminAssignments"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));

// Faculty pages
const FacultyDashboard = lazy(() => import("./pages/faculty/FacultyDashboard"));
const FacultyAttendance = lazy(() => import("./pages/faculty/FacultyAttendance"));
const FacultyMarks = lazy(() => import("./pages/faculty/FacultyMarks"));

// Student pages
const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard"));
const StudentProfile = lazy(() => import("./pages/student/StudentProfile"));
const StudentAttendance = lazy(() => import("./pages/student/StudentAttendance"));
const StudentMarks = lazy(() => import("./pages/student/StudentMarks"));
const StudentTimetable = lazy(() => import("./pages/student/StudentTimetable"));

// Campus Gallery pages
const MainCampusGallery = lazy(() => import("./pages/campus/MainCampusGallery"));
const LibraryGallery = lazy(() => import("./pages/campus/LibraryGallery"));
const LabsGallery = lazy(() => import("./pages/campus/LabsGallery"));
const HostelGallery = lazy(() => import("./pages/campus/HostelGallery"));

// Chatbot
const Chatbot = lazy(() => import("./components/Chatbot"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 max-w-md">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role || '')) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  
  // Scroll to top on route change - fixes the scroll-to-top issue
  useEffect(() => {
    // Only scroll to top if there's no hash in the URL (for anchor links)
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Show chatbot on all pages except HomePage (which has its own)
  const showChatbot = location.pathname !== '/';
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:id" element={<DepartmentDetail />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admission-procedure" element={<AdmissionProcedure />} />
        <Route path="/fees-structure" element={<FeesStructure />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/campus-life" element={<CampusLife />} />
        <Route path="/student-chapters" element={<StudentChapters />} />
        <Route path="/examination" element={<Examination />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/committees" element={<Committees />} />
        <Route path="/community-services" element={<CommunityServices />} />
        <Route path="/campus/main-campus" element={<MainCampusGallery />} />
        <Route path="/campus/library" element={<LibraryGallery />} />
        <Route path="/campus/labs" element={<LabsGallery />} />
        <Route path="/campus/hostel" element={<HostelGallery />} />
        <Route path="/apply-now" element={<ApplyNow />} />
        <Route path="/explore-campus" element={<ExploreCampus />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="departments" element={<AdminDepartments />} />
          <Route path="sections" element={<AdminSections />} />
          <Route path="subjects" element={<AdminSubjects />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="faculty" element={<AdminFaculty />} />
          <Route path="assignments" element={<AdminAssignments />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={<ProtectedRoute allowedRoles={['faculty']}><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<FacultyDashboard />} />
          <Route path="attendance" element={<FacultyAttendance />} />
          <Route path="marks" element={<FacultyMarks />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="marks" element={<StudentMarks />} />
          <Route path="timetable" element={<StudentTimetable />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Global Chatbot - available on all pages except HomePage */}
      {showChatbot && <Chatbot />}
    </Suspense>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

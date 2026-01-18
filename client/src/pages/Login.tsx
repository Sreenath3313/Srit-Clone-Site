import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, role);
      navigate(`/${role}`);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleCards = [
    {
      role: 'admin' as UserRole,
      title: 'Administrator',
      description: 'Full system access and management',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      role: 'faculty' as UserRole,
      title: 'Faculty',
      description: 'Attendance and marks management',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      role: 'student' as UserRole,
      title: 'Student',
      description: 'View attendance, marks & timetable',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-dark flex-col justify-between p-8 xl:p-12">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl gradient-primary flex items-center justify-center">
              <svg className="w-6 h-6 xl:w-7 xl:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl xl:text-2xl font-bold text-white">SRIT</h1>
              <p className="text-xs xl:text-sm text-white/60">Enterprise Resource Planning</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white leading-tight">
            Streamline Your
            <span className="block text-primary">Academic Operations</span>
          </h2>
          <p className="text-sm xl:text-lg text-white/70 max-w-md">
            A comprehensive platform for managing students, faculty, departments, attendance, and academic records efficiently.
          </p>

          <div className="flex items-center gap-6">
            <Stat value="5000+" label="Students" />
            <Divider />
            <Stat value="200+" label="Faculty" />
            <Divider />
            <Stat value="15+" label="Departments" />
          </div>
        </div>

        <p className="text-xs xl:text-sm text-white/40">
          © 2026 SRIT System. All rights reserved.
        </p>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg animate-fade-in">
          <div className="lg:hidden text-center mb-6">
            <span className="text-lg sm:text-xl font-bold text-foreground">SRIT</span>
          </div>

          <div className="card-base p-4 sm:p-6 md:p-8 shadow-card-lg">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Welcome back</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Select your role and sign in to continue
              </p>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
              {roleCards.map((item) => (
                <button
                  key={item.role}
                  onClick={() => setRole(item.role)}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                    role === item.role
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`mb-1 sm:mb-2 ${role === item.role ? 'text-primary' : 'text-muted-foreground'}`}>
                    {item.icon}
                  </div>
                  <p className={`text-xs sm:text-sm font-medium ${role === item.role ? 'text-primary' : 'text-foreground'}`}>
                    {item.title}
                  </p>
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-base text-sm">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`${role}@srit.edu`}
                  className="input-base text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="label-base text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-base text-sm sm:text-base"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Remember me</span>
                </label>
                <button type="button" className="text-xs sm:text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-sm sm:text-base"
              >
                {isLoading ? 'Signing in...' : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
              </button>
            </form>

            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
              Demo Accounts : admin@srit.in , faculty@srit , student@srit with password 'Srit1234'
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-xl xl:text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs xl:text-sm text-white/60">{label}</p>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-10 bg-white/20" />;
}

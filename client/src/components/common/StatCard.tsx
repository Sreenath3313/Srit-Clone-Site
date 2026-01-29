interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'secondary';
  gradient?: boolean;
}

export default function StatCard({ title, value, icon, trend, color = 'primary', gradient = false }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    secondary: 'bg-secondary/10 text-secondary',
  };

  const gradientClasses = {
    primary: 'bg-gradient-to-br from-orange-500 to-orange-600',
    success: 'bg-gradient-to-br from-green-500 to-green-600',
    warning: 'bg-gradient-to-br from-amber-500 to-amber-600',
    secondary: 'bg-gradient-to-br from-slate-700 to-slate-800',
  };

  return (
    <div className={`card-hover p-6 animate-fade-in relative overflow-hidden group ${gradient ? gradientClasses[color] + ' text-white' : ''}`}>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className={`text-sm font-medium ${gradient ? 'text-white/90' : 'text-muted-foreground'}`}>{title}</p>
          <p className={`text-3xl font-bold mt-1 ${gradient ? 'text-white' : 'text-foreground'}`}>{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={gradient ? 'text-white' : (trend.isPositive ? 'text-success' : 'text-destructive')}>
                {trend.isPositive ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </span>
              <span className={`text-sm font-medium ${gradient ? 'text-white' : (trend.isPositive ? 'text-success' : 'text-destructive')}`}>
                {trend.value}%
              </span>
              <span className={`text-xs ${gradient ? 'text-white/80' : 'text-muted-foreground'}`}>vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl ${gradient ? 'bg-white/20' : colorClasses[color]} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

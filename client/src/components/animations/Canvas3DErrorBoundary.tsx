import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary for 3D Canvas components
 * Catches WebGL and rendering errors and shows a fallback gradient background
 */
export class Canvas3DErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error for debugging
    console.error('3D Canvas Error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Show fallback or default gradient background
      return this.props.fallback || (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Fallback gradient orbs */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-orange-600/20 via-orange-500/10 to-transparent blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-orange-500/20 via-orange-400/10 to-transparent blur-3xl translate-x-1/2 translate-y-1/2" />
          
          {/* CSS Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px),
                               repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

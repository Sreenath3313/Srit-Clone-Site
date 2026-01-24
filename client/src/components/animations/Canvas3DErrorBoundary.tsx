import React, { Component, ErrorInfo, ReactNode } from 'react';
import { CyberFallbackBackground } from './CyberFallbackBackground';

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
      // Show fallback or use enhanced CyberFallbackBackground
      return this.props.fallback || (
        <div className="absolute inset-0">
          <CyberFallbackBackground />
        </div>
      );
    }

    return this.props.children;
  }
}

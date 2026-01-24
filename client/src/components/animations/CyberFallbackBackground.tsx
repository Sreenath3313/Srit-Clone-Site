import React from 'react';

/**
 * Shared CSS-based fallback background for 3D components
 * Maintains the cyber theme with gradients and grid patterns
 * Enhanced for Android visibility
 */
export const CyberFallbackBackground: React.FC = () => (
  <>
    {/* Base gradient background - CRITICAL for Android */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
    
    {/* Enhanced Gradient Orbs - Increase opacity and size for Android visibility */}
    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-orange-600/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    
    {/* CSS Grid Pattern - Increase visibility */}
    <div 
      className="absolute inset-0 opacity-20" 
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 53, 0.4) 2px, rgba(255, 107, 53, 0.4) 3px),
                         repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 107, 53, 0.4) 2px, rgba(255, 107, 53, 0.4) 3px)`,
        backgroundSize: '50px 50px'
      }}
    />
    
    {/* Animated scan lines for cyber effect */}
    <div className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(255, 107, 53, 0.1) 1px, transparent 2px, transparent 4px)',
        animation: 'scan 8s linear infinite'
      }}
    />
    
    {/* Corner accents for cyber theme */}
    <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/40" />
    <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-orange-500/40" />
    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-orange-500/40" />
    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/40" />
  </>
);

import React from 'react';

/**
 * Shared CSS-based fallback background for 3D components
 * Maintains the cyber theme with gradients and grid patterns
 */
export const CyberFallbackBackground: React.FC = () => (
  <>
    {/* Gradient Orbs */}
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
  </>
);

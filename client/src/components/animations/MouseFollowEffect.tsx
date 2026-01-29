import React, { useEffect, useRef } from 'react';

interface MouseFollowEffectProps {
  className?: string;
}

export const MouseFollowEffect: React.FC<MouseFollowEffectProps> = ({ className = '' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    let animationFrameId: number;
    const throttleDelay = 32; // ~31.25fps (1000/32) for better performance than 60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      // Throttle updates more aggressively
      if (now - lastUpdateTime.current < throttleDelay) {
        return;
      }
      
      lastUpdateTime.current = now;

      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Use requestAnimationFrame to throttle updates
      animationFrameId = requestAnimationFrame(() => {
        if (cursorRef.current && cursorGlowRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          
          // Use translate3d for hardware acceleration
          cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          cursorGlowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 ${className}`}>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-orange-500"
        style={{ 
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      
      {/* Glow effect - reduced blur for performance */}
      <div
        ref={cursorGlowRef}
        className="absolute w-24 h-24 -ml-12 -mt-12 rounded-full bg-gradient-radial from-orange-500/15 to-transparent blur-lg"
        style={{ 
          willChange: 'transform',
        }}
      />
    </div>
  );
};

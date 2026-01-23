import React, { useEffect, useRef } from 'react';

interface MouseFollowEffectProps {
  className?: string;
}

export const MouseFollowEffect: React.FC<MouseFollowEffectProps> = ({ className = '' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Use requestAnimationFrame to throttle updates to ~60fps
      animationFrameId = requestAnimationFrame(() => {
        if (cursorRef.current && cursorGlowRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          
          cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
          cursorGlowRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
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
        className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-orange-500 transition-transform duration-100 ease-out"
        style={{ mixBlendMode: 'difference' }}
      />
      
      {/* Glow effect */}
      <div
        ref={cursorGlowRef}
        className="absolute w-32 h-32 -ml-16 -mt-16 rounded-full bg-gradient-radial from-orange-500/20 to-transparent blur-xl transition-transform duration-300 ease-out"
      />
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';

interface TrailDot {
  x: number;
  y: number;
  opacity: number;
}

const CursorTrail: React.FC = () => {
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<TrailDot[]>([]);
  const animationFrameRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  
  const trailCount = 6;

  useEffect(() => {
    // Initialize trail positions
    trailPositions.current = Array.from({ length: trailCount }, () => ({
      x: 0,
      y: 0,
      opacity: 0
    }));

    let lastUpdate = 0;
    const throttleDelay = 16; // ~60fps
    let currentIsVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      if (now - lastUpdate >= throttleDelay) {
        mousePos.current = { x: e.clientX, y: e.clientY };
        currentIsVisible = true;
        setIsVisible(true);
        lastUpdate = now;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (
        e.relatedTarget === null ||
        (e.relatedTarget as HTMLElement).nodeName === 'HTML'
      ) {
        currentIsVisible = false;
        setIsVisible(false);
      }
    };

    const updateTrail = () => {
      // Update trail positions with delay
      for (let i = trailCount - 1; i > 0; i--) {
        trailPositions.current[i].x = trailPositions.current[i - 1].x;
        trailPositions.current[i].y = trailPositions.current[i - 1].y;
        trailPositions.current[i].opacity = (trailCount - i) / trailCount;
      }
      
      // Update first trail position to follow mouse
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };
      
      trailPositions.current[0].x = lerp(
        trailPositions.current[0].x,
        mousePos.current.x,
        0.3
      );
      trailPositions.current[0].y = lerp(
        trailPositions.current[0].y,
        mousePos.current.y,
        0.3
      );
      trailPositions.current[0].opacity = 1;

      // Apply positions to DOM elements
      trailRefs.current.forEach((ref, index) => {
        if (ref) {
          const trail = trailPositions.current[index];
          ref.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;
          ref.style.opacity = currentIsVisible ? trail.opacity.toString() : '0';
        }
      });

      animationFrameRef.current = requestAnimationFrame(updateTrail);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    
    animationFrameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      {Array.from({ length: trailCount }).map((_, index) => {
        const size = 20 - index * 2;
        const delay = index * 50;
        
        return (
          <div
            key={index}
            ref={(el) => (trailRefs.current[index] = el)}
            className="absolute rounded-full transition-opacity duration-200"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              marginLeft: `-${size / 2}px`,
              marginTop: `-${size / 2}px`,
              background: `radial-gradient(circle, rgba(255, 107, 53, ${0.3 - index * 0.04}) 0%, rgba(255, 107, 53, 0) 70%)`,
              transitionDelay: `${delay}ms`,
              willChange: 'transform, opacity',
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;

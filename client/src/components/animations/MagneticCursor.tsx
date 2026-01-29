import React, { useEffect, useRef, useState, useCallback } from 'react';

const MagneticCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth cursor movement with easing
  const updateCursorPosition = useCallback(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const easing = isHovering ? 0.15 : 0.1;
    
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, easing);
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, easing);

    if (cursorRef.current && cursorDotRef.current) {
      cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
    }

    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);
  }, [isHovering]);

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | undefined;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!throttleTimeout) {
        mousePos.current = { x: e.clientX, y: e.clientY };
        setIsVisible(true);
        
        throttleTimeout = setTimeout(() => {
          throttleTimeout = undefined;
        }, 16); // ~60fps
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (
        e.relatedTarget === null ||
        (e.relatedTarget as HTMLElement).nodeName === 'HTML'
      ) {
        setIsVisible(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseout', handleMouseOut);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, [updateCursorPosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      {/* Main cursor circle with smooth follow */}
      <div
        ref={cursorRef}
        className={`absolute -ml-4 -mt-4 rounded-full border-2 transition-all duration-300 ease-out ${
          isHovering
            ? 'w-12 h-12 border-orange-500 bg-orange-500/20'
            : 'w-8 h-8 border-orange-500/80 bg-transparent'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          willChange: 'transform',
          boxShadow: isHovering
            ? '0 0 20px rgba(255, 107, 53, 0.5), 0 0 40px rgba(255, 107, 53, 0.3)'
            : '0 0 10px rgba(255, 107, 53, 0.3)',
        }}
      />

      {/* Cursor dot (instant follow) */}
      <div
        ref={cursorDotRef}
        className={`absolute w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-orange-500 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform',
          boxShadow: '0 0 8px rgba(255, 107, 53, 0.8)',
        }}
      />
    </div>
  );
};

export default MagneticCursor;

import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile devices
 * Combines user agent checking, screen width, and touch capability
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check user agent
      const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(userAgent);

      // Check screen width (< 768px)
      const isMobileWidth = typeof window !== 'undefined' && window.innerWidth < 768;

      // Check touch capability
      const hasTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

      // A device is considered mobile if it matches UA OR has mobile width with touch
      setIsMobile(isMobileUA || (isMobileWidth && hasTouch));
    };

    // Initial check
    checkMobile();

    // Listen for resize events (only in browser)
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return isMobile;
};

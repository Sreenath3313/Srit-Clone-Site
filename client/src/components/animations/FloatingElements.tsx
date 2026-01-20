import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 10,
  className = '',
}) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 20,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 2,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-orange-500/10"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

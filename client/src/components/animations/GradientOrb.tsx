import React from 'react';
import { motion } from 'framer-motion';

interface GradientOrbProps {
  color1?: string;
  color2?: string;
  size?: number;
  className?: string;
  blur?: number;
}

export const GradientOrb: React.FC<GradientOrbProps> = ({
  color1 = '#FF6B35',
  color2 = '#F7931E',
  size = 400,
  className = '',
  blur = 100,
}) => {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1}, ${color2})`,
        filter: `blur(${blur}px)`,
        opacity: 0.3,
      }}
      animate={{
        x: [0, 50, 0],
        y: [0, 30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

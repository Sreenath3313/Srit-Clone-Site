import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  className?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ className = '' }) => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 cursor-pointer ${className}`}
      onClick={handleScroll}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <motion.div
        className="w-6 h-10 border-2 border-orange-500 rounded-full flex items-start justify-center p-2"
        animate={{ 
          boxShadow: [
            '0 0 0 0 rgba(255, 107, 53, 0.4)',
            '0 0 0 10px rgba(255, 107, 53, 0)',
            '0 0 0 0 rgba(255, 107, 53, 0)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <motion.div
          className="w-1 h-2 bg-orange-500 rounded-full"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <ChevronDown className="w-5 h-5 text-orange-500" />
      </motion.div>
      
      <span className="text-xs text-orange-500 font-medium uppercase tracking-wider">
        Scroll
      </span>
    </motion.div>
  );
};

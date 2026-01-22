import React from 'react';
import { motion } from 'framer-motion';

/**
 * Orange border accent component to be added to every page
 * Provides consistent visual theme across the entire website
 */
export const OrangeBorder: React.FC = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  );
};

/**
 * Alternative side border variant
 */
export const OrangeSideBorder: React.FC = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-orange-600 to-orange-500 z-50"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  );
};

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ModernCardProps {
  children: ReactNode;
  variant?: 'default' | 'highlight' | 'gradient' | 'image';
  className?: string;
  gradient?: string;
  hoverEffect?: boolean;
  orangeAccent?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  variant = 'default',
  className = '',
  gradient = 'from-white to-gray-50',
  hoverEffect = true,
  orangeAccent = true,
}) => {
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white shadow-lg hover:shadow-2xl',
    highlight: `bg-gradient-to-br ${gradient} shadow-xl hover:shadow-2xl`,
    gradient: `bg-gradient-to-br ${gradient} shadow-lg hover:shadow-2xl`,
    image: 'bg-white shadow-lg hover:shadow-2xl relative overflow-hidden',
  };
  
  const hoverClasses = hoverEffect ? 'hover:scale-105 hover:-translate-y-2' : '';
  const accentClasses = orangeAccent ? 'border-t-4 border-orange-500' : '';
  
  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${accentClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

interface ModernCardHeaderProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export const ModernCardHeader: React.FC<ModernCardHeaderProps> = ({
  children,
  icon,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 p-6 ${className}`}>
      {icon && (
        <div className="flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

interface ModernCardBodyProps {
  children: ReactNode;
  className?: string;
}

export const ModernCardBody: React.FC<ModernCardBodyProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

interface ModernCardFooterProps {
  children: ReactNode;
  className?: string;
}

export const ModernCardFooter: React.FC<ModernCardFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

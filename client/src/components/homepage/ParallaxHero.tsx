import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Parallax } from 'react-parallax';

interface ParallaxHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  height?: string;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({ 
  image, 
  title, 
  subtitle,
  height = '500px' 
}) => {
  return (
    <Parallax
      bgImage={image}
      strength={500}
      bgImageStyle={{ objectFit: 'cover' }}
    >
      <div style={{ height }} className="relative flex items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-purple-900/60 to-orange-900/50" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </Parallax>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, className = '' }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  return (
    <motion.div
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

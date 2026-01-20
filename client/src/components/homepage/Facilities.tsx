import React from 'react';
import { motion } from 'framer-motion';
import { Library, Briefcase, Trophy, Bus, UserCheck } from 'lucide-react';
import { StaggerContainer, StaggerItem, ScrollReveal } from '@/components/animations';

export const Facilities: React.FC = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center text-primary mb-12 uppercase">Facilities</h2>
            </ScrollReveal>
            
            <StaggerContainer 
              className="flex flex-wrap justify-center gap-6"
              staggerDelay={0.1}
            >
                <FacilityCard title="Internships" icon={<Briefcase size={32} />} />
                <FacilityCard title="Modern Library" icon={<Library size={32} />} />
                <FacilityCard title="Expert Faculty" icon={<UserCheck size={32} />} />
                <FacilityCard title="Sports" icon={<Trophy size={32} />} />
                <FacilityCard title="Transportation" icon={<Bus size={32} />} />
            </StaggerContainer>
        </div>
    </section>
  );
};

const FacilityCard: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <StaggerItem>
      <motion.div 
        whileHover={{ 
          scale: 1.1,
          y: -8,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
        className="relative flex flex-col items-center justify-center w-40 h-40 bg-secondary text-white rounded-lg shadow-lg hover:bg-primary transition-colors duration-300 cursor-pointer group overflow-hidden"
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 107, 53, 0.3) 0%, transparent 70%)',
          }}
        />
        
        <motion.div 
          className="mb-3 relative z-10"
          whileHover={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: 1.2,
          }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        
        <span className="font-medium text-sm text-center px-2 relative z-10">{title}</span>
        
        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-orange-500"
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </StaggerItem>
);

import React from 'react';
import { motion } from 'framer-motion';
import { Library, Briefcase, Trophy, Bus, UserCheck } from 'lucide-react';
import { StaggerContainer, StaggerItem, ScrollReveal, TiltCard } from '@/components/animations';

export const Facilities: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-orange-50/30 to-purple-50/20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="text-center mb-16">
                <motion.div
                  className="inline-block mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-orange-100 rounded-full">
                    World-Class Infrastructure
                  </span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-4">
                  Campus Facilities
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Experience excellence with our state-of-the-art facilities and resources
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
              staggerDelay={0.1}
            >
                <FacilityCard title="Internships" icon={<Briefcase size={40} />} color="from-orange-500 to-red-500" />
                <FacilityCard title="Modern Library" icon={<Library size={40} />} color="from-blue-500 to-cyan-500" />
                <FacilityCard title="Expert Faculty" icon={<UserCheck size={40} />} color="from-green-500 to-emerald-500" />
                <FacilityCard title="Sports" icon={<Trophy size={40} />} color="from-yellow-500 to-orange-500" />
                <FacilityCard title="Transportation" icon={<Bus size={40} />} color="from-purple-500 to-pink-500" />
            </StaggerContainer>
        </div>
    </section>
  );
};

const FacilityCard: React.FC<{ title: string; icon: React.ReactNode; color: string }> = ({ title, icon, color }) => (
    <StaggerItem>
      <TiltCard intensity={10}>
        <motion.div 
          whileHover={{ 
            y: -12,
            transition: { duration: 0.4, ease: 'easeOut' }
          }}
          className="relative flex flex-col items-center justify-center w-full aspect-square bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden p-6"
        >
          {/* Gradient background that appears on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Icon with enhanced animations */}
          <motion.div 
            className="mb-4 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-300"
            whileHover={{ 
              rotate: [0, -15, 15, -15, 0],
              scale: 1.25,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {icon}
          </motion.div>
          
          <span className="font-semibold text-sm md:text-base text-center px-2 relative z-10 text-gray-800 group-hover:text-white transition-colors duration-300">
            {title}
          </span>
          
          {/* Animated border */}
          <motion.div
            className={`absolute inset-0 rounded-2xl`}
            initial={{ 
              boxShadow: '0 0 0 2px transparent',
            }}
            whileHover={{ 
              boxShadow: '0 0 0 3px rgba(255, 107, 53, 0.5)',
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Bottom accent line */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${color} rounded-full`}
            initial={{ width: '0%' }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          
          {/* Floating particles effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
            }}
          />
        </motion.div>
      </TiltCard>
    </StaggerItem>
);

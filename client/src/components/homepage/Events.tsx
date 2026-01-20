import React from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem, ScrollReveal } from '@/components/animations';

const events = [
    { id: 1, title: 'Mini Project Expo', category: 'EEE', image: 'https://picsum.photos/400/300?random=11' },
    { id: 2, title: 'Health Awareness Program', category: 'SRIT', image: 'https://picsum.photos/400/300?random=12' },
    { id: 3, title: 'Workshop on IPR', category: 'IIC Cell', image: 'https://picsum.photos/400/300?random=13' },
    { id: 4, title: 'Annual Sports Meet', category: 'Sports', image: 'https://picsum.photos/400/300?random=14' },
];

export const Events: React.FC = () => {
  return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center text-primary mb-12 uppercase tracking-wide">Events</h2>
            </ScrollReveal>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <StaggerItem key={event.id}>
                      <motion.div 
                        whileHover={{ y: -10 }}
                        className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all cursor-pointer h-64"
                      >
                        <div className="relative w-full h-full overflow-hidden">
                          <motion.img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                        
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6"
                          initial={{ opacity: 0.9 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <motion.span 
                            className="bg-primary text-white text-xs px-3 py-1 rounded-full w-fit mb-2 font-bold"
                            whileHover={{ scale: 1.05, x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {event.category}
                          </motion.span>
                          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-orange-300 transition-colors">
                            {event.title}
                          </h3>
                        </motion.div>
                        
                        {/* Glow effect on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(255, 107, 53, 0.2) 0%, transparent 70%)',
                          }}
                        />
                      </motion.div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
            
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-8">
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 5px 20px rgba(255, 107, 53, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 rounded-full font-medium transition-all"
                  >
                      View All Events
                  </motion.button>
              </div>
            </ScrollReveal>
        </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem, ScrollReveal, TiltCard } from '@/components/animations';

const events = [
    { id: 1, title: 'Mini Project Expo', category: 'EEE', image: 'https://picsum.photos/400/300?random=11' },
    { id: 2, title: 'Health Awareness Program', category: 'SRIT', image: 'https://picsum.photos/400/300?random=12' },
    { id: 3, title: 'Workshop on IPR', category: 'IIC Cell', image: 'https://picsum.photos/400/300?random=13' },
    { id: 4, title: 'Annual Sports Meet', category: 'Sports', image: 'https://picsum.photos/400/300?random=14' },
];

export const Events: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-purple-50/20 to-orange-50/10 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl animate-float float-delay-2" />
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
                    Latest Happenings
                  </span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-orange-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Campus Events
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Discover the vibrant campus life through our engaging events and activities
                </p>
              </div>
            </ScrollReveal>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {events.map((event, index) => (
                    <StaggerItem key={event.id}>
                      <TiltCard intensity={5}>
                        <motion.div 
                          whileHover={{ y: -15 }}
                          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer h-80 bg-white"
                        >
                          <div className="relative w-full h-full overflow-hidden">
                            <motion.img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.2, rotate: 3 }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                            
                            {/* Shimmer effect on hover */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                              whileHover={{ x: '200%' }}
                              transition={{ duration: 0.8 }}
                            />
                          </div>
                          
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-6"
                            initial={{ opacity: 0.85 }}
                            whileHover={{ opacity: 1 }}
                          >
                            <motion.span 
                              className="bg-gradient-to-r from-orange-500 to-purple-500 text-white text-xs px-4 py-2 rounded-full w-fit mb-3 font-bold shadow-lg"
                              whileHover={{ scale: 1.1, x: 8 }}
                              transition={{ duration: 0.2 }}
                            >
                              {event.category}
                            </motion.span>
                            <motion.h3 
                              className="text-white font-bold text-xl leading-tight group-hover:text-orange-300 transition-colors"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              {event.title}
                            </motion.h3>
                            
                            {/* Animated border bottom */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-purple-500"
                              initial={{ width: 0 }}
                              whileHover={{ width: '100%' }}
                              transition={{ duration: 0.4 }}
                            />
                          </motion.div>
                          
                          {/* 3D Glow effect on hover */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: 'radial-gradient(circle at center, rgba(255, 107, 53, 0.3) 0%, transparent 70%)',
                              boxShadow: '0 0 60px rgba(255, 107, 53, 0.4)',
                            }}
                          />
                        </motion.div>
                      </TiltCard>
                    </StaggerItem>
                ))}
            </StaggerContainer>
            
            <ScrollReveal delay={0.4}>
              <div className="text-center mt-12">
                  <motion.button 
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: '0 10px 40px rgba(255, 107, 53, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative border-2 border-primary text-primary hover:text-white px-10 py-4 rounded-full font-semibold transition-all overflow-hidden group"
                  >
                    <span className="relative z-10">View All Events</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
              </div>
            </ScrollReveal>
        </div>
    </section>
  );
};

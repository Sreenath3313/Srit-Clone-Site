import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CountUp, ScrollReveal, ParallaxSection } from '@/components/animations';
import { COLLEGE_STATISTICS } from '@/constants/college';

export const About: React.FC = () => {
  return (
    <section className="py-16 bg-secondary text-white relative overflow-hidden">
        {/* Animated Background Pattern with Parallax */}
        <ParallaxSection speed={0.3} className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
                <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <circle cx="25" cy="25" r="10" fill="currentColor" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
            </svg>
        </ParallaxSection>

        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 relative z-10">
            {/* Text Content */}
            <ScrollReveal direction="left" className="lg:w-1/2">
                <div className="mb-4">
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-primary font-bold tracking-widest uppercase text-sm"
                    >
                      About SRIT
                    </motion.span>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-4xl font-bold mt-2 mb-6"
                    >
                      Welcome to SRIT
                    </motion.h2>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-1 bg-primary mb-6"
                    />
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed text-justify">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        This Society was established by Founder-cum-Secretary Sri Aluru Sambasiva Reddy in November 2007 in memory of his mother, Late Smt. Aluru Narayanamma, to give shape to his firm belief that "EDUCATION IS A KEY ENABLER FOR PROGRESS".
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        This belief has shaped his entire life — he himself excelled in his scholastic years and then became a tutor, teaching students not only his subject but also imparting higher human values. As his career progressed, he wanted to ensure that maximum students from rural and developing areas could derive benefit from this credo.
                    </motion.p>
                </div>
                
                {/* Statistics with CountUp Animation */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 grid grid-cols-3 gap-4"
                >
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      <CountUp end={COLLEGE_STATISTICS.yearsOfOperation} duration={2} delay={0.5} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Years</div>
                  </div>
                  <div className="text-center border-x border-white/20">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      <CountUp end={COLLEGE_STATISTICS.totalStudents} duration={2.5} delay={0.5} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      <CountUp end={COLLEGE_STATISTICS.totalFaculty} duration={2} delay={0.5} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Faculty</div>
                  </div>
                </motion.div>
                
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 25px rgba(255, 107, 53, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded font-medium transition-colors flex items-center group"
                >
                    Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </ScrollReveal>

            {/* Image Content */}
            <ScrollReveal direction="right" className="lg:w-1/2">
                <motion.div 
                  whileHover={{ 
                    rotate: 0, 
                    scale: 1.05,
                    transition: { duration: 0.4 }
                  }}
                  className="bg-white p-4 rounded-lg shadow-2xl transform rotate-2 transition-transform duration-500"
                >
                    <motion.img 
                        src="https://picsum.photos/600/400?random=10" 
                        alt="Talent Visionary Award Certificate" 
                        className="w-full h-auto rounded border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    />
                    <div className="mt-4 text-center">
                        <h4 className="text-gray-800 font-bold text-lg">Talent Visionary Award</h4>
                        <p className="text-gray-500 text-sm">Awarded by Salesforce for Excellence</p>
                    </div>
                </motion.div>
            </ScrollReveal>
        </div>
    </section>
  );
};

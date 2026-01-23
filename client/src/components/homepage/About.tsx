import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CountUp, ScrollReveal } from '@/components/animations';
import { COLLEGE_STATISTICS } from '@/constants/college';
import { 
  HexagonalGrid, 
  GeometricShapes3D, 
  ParticleBackground 
} from '@/components/animations';

export const About: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Cyber Background Layers */}
      <Suspense fallback={null}>
        <HexagonalGrid className="opacity-20" gridCount={40} />
      </Suspense>

      <Suspense fallback={null}>
        <GeometricShapes3D className="opacity-30" />
      </Suspense>

      <Suspense fallback={null}>
        <ParticleBackground className="opacity-40" particleCount={1500} />
      </Suspense>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-orange-600/20 via-orange-500/10 to-transparent blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-orange-500/20 via-orange-400/10 to-transparent blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/80" />

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 relative z-10">

        {/* Text Content */}
        <ScrollReveal direction="left" className="lg:w-1/2">
          <div className="mb-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-orange-400 font-bold tracking-widest uppercase text-sm"
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
              className="h-1 bg-orange-500 mb-6"
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
          
          {/* Statistics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400">
                <CountUp end={COLLEGE_STATISTICS.yearsOfOperation} duration={2} delay={0.5} suffix="+" />
              </div>
              <div className="text-sm text-gray-400 mt-1">Years</div>
            </div>

            <div className="text-center border-x border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-orange-400">
                <CountUp end={COLLEGE_STATISTICS.totalStudents} duration={2.5} delay={0.5} suffix="+" />
              </div>
              <div className="text-sm text-gray-400 mt-1">Students</div>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400">
                <CountUp end={COLLEGE_STATISTICS.totalFaculty} duration={2} delay={0.5} suffix="+" />
              </div>
              <div className="text-sm text-gray-400 mt-1">Faculty</div>
            </div>
          </motion.div>
          
         
        </ScrollReveal>

        {/* Image Content */}
        <ScrollReveal direction="right" className="lg:w-1/2">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-2xl transition-transform duration-500"
          >
            <motion.img 
              src="Talent.jpg" 
              alt="Talent Visionary Award Certificate" 
              className="w-full h-auto rounded"
            />
            <div className="mt-4 text-center">
              <h4 className="text-gray-900 font-bold text-lg">Talent Visionary Award</h4>
              <p className="text-gray-600 text-sm">Awarded by Salesforce for Excellence</p>
            </div>
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  );
};

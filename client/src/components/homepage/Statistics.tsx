import React, { Suspense } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Building } from 'lucide-react';
import { 
  HexagonalGrid, 
  GeometricShapes3D, 
  ParticleBackground 
} from '@/components/animations';
import { CyberFallbackBackground } from '@/components/animations/CyberFallbackBackground';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PARTICLE_COUNT, GRID_COUNT } from '@/components/animations/constants3D';

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    value: 5000,
    label: 'Students',
    suffix: '+',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    value: 200,
    label: 'Faculty Members',
    suffix: '+',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: <Building className="w-8 h-8" />,
    value: 6,
    label: 'Departments',
    suffix: '',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: 20,
    label: 'Years of Excellence',
    suffix: '+',
    color: 'from-pink-500 to-pink-600'
  },
];

export const Statistics: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const isMobile = useIsMobile();

  // Determine particle and grid counts based on device
  const particleCount = isMobile ? PARTICLE_COUNT.STATISTICS_MOBILE : PARTICLE_COUNT.STATISTICS_DESKTOP;
  const gridCount = isMobile ? GRID_COUNT.STATISTICS_MOBILE : GRID_COUNT.STATISTICS_DESKTOP;

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* Cyber Background */}
      <Suspense fallback={<div className="absolute inset-0"><CyberFallbackBackground /></div>}>
        <HexagonalGrid className="opacity-20" gridCount={gridCount} isMobile={isMobile} />
      </Suspense>

      <Suspense fallback={<div className="absolute inset-0"><CyberFallbackBackground /></div>}>
        <GeometricShapes3D className="opacity-30" isMobile={isMobile} />
      </Suspense>

      <Suspense fallback={<div className="absolute inset-0"><CyberFallbackBackground /></div>}>
        <ParticleBackground className="opacity-40" particleCount={particleCount} isMobile={isMobile} />
      </Suspense>

      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-3xl" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/80" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SRIT in Numbers
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A legacy of academic excellence and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2">
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>

                {/* Counter */}
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      separator=","
                    />
                  ) : (
                    '0'
                  )}
                </div>

                {/* Label */}
                <p className="text-gray-300 text-lg font-medium">{stat.label}</p>

                {/* Animated border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

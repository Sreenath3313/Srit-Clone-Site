import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Coins, FileText } from 'lucide-react';
import { 
  Logo3D, 
  HexagonalGrid, 
  GeometricShapes3D, 
  ParticleBackground, 
  ScrollIndicator,
  StaggerContainer,
  StaggerItem,
  TiltCard
} from '@/components/animations';
import { CyberFallbackBackground } from '@/components/animations/CyberFallbackBackground';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PARTICLE_COUNT, GRID_COUNT } from '@/components/animations/constants3D';

// Quick access cards
const quickAccessCards = [
  { title: "Courses Offered", icon: <BookOpen size={36} />, link: "/courses" },
  { title: "Admission Procedure", icon: <FileText size={36} />, link: "/admission-procedure" },
  { title: "Fees Structure", icon: <Coins size={36} />, link: "/fees-structure" },
  { title: "Scholarships", icon: <GraduationCap size={36} />, link: "/scholarships" }
];

export const HeroCyber: React.FC = () => {
  const isMobile = useIsMobile();

  // Determine particle and grid counts based on device
  const particleCount = isMobile ? PARTICLE_COUNT.HERO_CYBER_MOBILE : PARTICLE_COUNT.HERO_CYBER_DESKTOP;
  const gridCount = isMobile ? GRID_COUNT.HERO_CYBER_MOBILE : GRID_COUNT.HERO_CYBER_DESKTOP;

  return (
    <div className="w-full">
      {/* HERO SECTION - DSU Cyber27 Style */}
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hexagonal Grid Background */}
        <Suspense fallback={<div className="absolute inset-0"><CyberFallbackBackground /></div>}>
          <HexagonalGrid className="opacity-30" gridCount={gridCount} isMobile={isMobile} />
        </Suspense>

        {/* 3D Geometric Shapes */}
        <Suspense fallback={<div className="absolute inset-0"><CyberFallbackBackground /></div>}>
          <GeometricShapes3D className="opacity-40" isMobile={isMobile} />
        </Suspense>

        {/* 3D Particle Background */}
        <Suspense fallback={<div className="absolute inset-0"><CyberFallbackBackground /></div>}>
          <ParticleBackground className="opacity-50" particleCount={particleCount} isMobile={isMobile} />
        </Suspense>

        {/* Gradient Orbs for Lighting */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-orange-600/20 via-orange-500/10 to-transparent blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-orange-500/20 via-orange-400/10 to-transparent blur-3xl translate-x-1/2 translate-y-1/2" />
        
        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950/80" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          {/* ✅ SRIT LOGO */}
<motion.div
  initial={{ opacity: 0, scale: 0.85, y: -20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
  className="mb-5 flex justify-center"
>
  <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-orange-500/30 shadow-[0_0_50px_rgba(255,107,53,0.4)]">
    <img
      src="/Srit.jpg"
      alt="SRIT Logo"
      className="w-[140px] md:w-[170px] lg:w-[200px] object-contain"
    />
  </div>
</motion.div>


  


          {/* Title with Glow Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-6 leading-tight"
            style={{ 
              textShadow: '0 0 60px rgba(255, 107, 53, 0.8), 0 0 100px rgba(255, 107, 53, 0.4)' 
            }}
          >
            SRINIVASA RAMANUJAN
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-center mb-8"
            style={{ 
              textShadow: '0 0 40px rgba(255, 107, 53, 0.5)' 
            }}
          >
            INSTITUTE OF TECHNOLOGY
          </motion.h2>

          {/* Subtitle */}
<motion.p
  initial={{ opacity: 0, filter: 'blur(10px)' }}
  animate={{ opacity: 1, filter: 'blur(0px)' }}
  transition={{ delay: 1.2, duration: 1, ease: [0.4, 0, 0.2, 1] }}
  className="text-base md:text-lg lg:text-xl text-gray-300 text-center max-w-4xl mb-12 px-4"
>
  Empowering Innovation • Shaping Tomorrow's Leaders
</motion.p>


        {/* CTA Buttons */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.4, duration: 0.8 }}
  className="flex flex-wrap gap-6 justify-center"
>
  {/* Apply Now */}
  <Link to="/admissions">
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 0 25px rgba(255, 107, 53, 0.6), 0 12px 25px rgba(0, 0, 0, 0.3)' 
      }}
      whileTap={{ scale: 0.97 }}
      className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-base shadow-xl overflow-hidden group"
    >
      <span className="relative z-10">Apply Now</span>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.button>
  </Link>

  {/* Explore Campus */}
  <Link to="/about">
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.25)' 
      }}
      whileTap={{ scale: 0.97 }}
      className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-base border border-orange-500/50 hover:bg-white/20 hover:border-orange-500 transition-all duration-300"
    >
      Explore Campus
    </motion.button>
  </Link>
</motion.div>
        </div>

        {/* Animated Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-orange-500/50" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-orange-500/50" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-orange-500/50" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-orange-500/50" />
      </div>

      {/* QUICK LINKS with 3D Effects */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px),
                             repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        <StaggerContainer className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {quickAccessCards.map((card, index) => (
            <StaggerItem key={index}>
              <TiltCard intensity={10}>
                <Link
                  to={card.link}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-500/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 overflow-hidden h-full"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/20 group-hover:via-orange-500/10 group-hover:to-orange-500/5 transition-all duration-700" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  {/* Icon with animation */}
                  <motion.div 
                    className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl mb-6 group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-500 shadow-xl shadow-orange-500/30"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, -10, 0],
                      y: -10,
                      boxShadow: '0 20px 40px rgba(255, 107, 53, 0.4)',
                      transition: { duration: 0.6, ease: 'easeInOut' }
                    }}
                  >
                    {card.icon}
                  </motion.div>
                  
                  <h3 className="relative text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 mb-2">
                    {card.title}
                  </h3>
                  
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-full"
                    initial={{ width: '0%', opacity: 0 }}
                    whileHover={{ width: '100%', opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
};

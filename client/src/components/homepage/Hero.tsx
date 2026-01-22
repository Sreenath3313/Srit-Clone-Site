import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, GraduationCap, Coins, FileText, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { campusImages } from '@/data/campusImages';
import { FloatingElements, StaggerContainer, StaggerItem, ParticleBackground, GradientOrb, TiltCard } from '@/components/animations';
import ReactPlayer from 'react-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const heroImages = campusImages;

// Quick access cards
const quickAccessCards = [
  { title: "Courses Offered", icon: <BookOpen size={36} />, link: "/courses" },
  { title: "Admission Procedure", icon: <FileText size={36} />, link: "/admission-procedure" },
  { title: "Fees Structure", icon: <Coins size={36} />, link: "/fees-structure" },
  { title: "Scholarships", icon: <GraduationCap size={36} />, link: "/scholarships" }
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying && !showVideo) {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, showVideo]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setIsPlaying(false);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsPlaying(false);
  };

  return (
    <div className="w-full">
      
      {/* HERO SLIDER */}
      <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Video Background Option */}
        {showVideo && (
          <div className="absolute inset-0 z-0">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // TODO: Replace with actual SRIT campus tour video URL
              playing
              loop
              muted
              width="100%"
              height="100%"
              className="object-cover"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/50 to-orange-900/40" />
          </div>
        )}

        {/* Image Carousel (when video is not playing) */}
        {!showVideo && (
          <>
            {/* 3D Particle Background */}
            <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-purple-900" />}>
              <ParticleBackground className="opacity-60" particleCount={3000} />
            </Suspense>
            
            {/* Gradient Orbs */}
            <GradientOrb color1="#FF6B35" color2="#F7931E" size={500} className="top-0 -left-40 opacity-20" />
            <GradientOrb color1="#8B5CF6" color2="#EC4899" size={600} className="bottom-0 -right-60 opacity-20" />
            
            {/* Floating Background Elements */}
            <FloatingElements count={12} />
            
            {/* Swiper Carousel */}
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              effect="fade"
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop
              speed={1000}
              className="absolute inset-0"
            >
              {heroImages.map((img) => (
                <SwiperSlide key={img.id}>
                  <div className="relative w-full h-full">
                    <motion.img 
                      src={img.src} 
                      alt={img.alt}
                      className="w-full h-full object-cover mix-blend-overlay opacity-50"
                      style={{ y }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-slate-900/70 to-orange-900/40 gradient-animate" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}

        {/* Overlay Text with enhanced animations */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <motion.h2 
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 40, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="text-white text-4xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl leading-tight"
            style={{ textShadow: '0 0 40px rgba(255, 107, 53, 0.5)' }}
          >
            Empowering Knowledge
          </motion.h2>
          <motion.p 
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="text-gray-100 text-lg md:text-2xl lg:text-3xl max-w-4xl drop-shadow-lg px-4 mb-8"
          >
            Join a community of innovators and leaders at Srinivasa Ramanujan Institute of Technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/admissions">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 107, 53, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              >
                Apply Now
              </motion.button>
            </Link>
            <motion.button
              onClick={() => setShowVideo(!showVideo)}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-3"
            >
              {showVideo ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{showVideo ? 'Pause Video' : 'Watch Campus Tour'}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Arrows with enhanced effects - hide on mobile */}
        <motion.button 
          whileHover={{ scale: 1.15, x: -8, backgroundColor: 'rgba(255, 107, 53, 0.9)' }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide} 
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500/90 text-white p-4 rounded-full z-20 transition-all backdrop-blur-md border border-white/20 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.15, x: 8, backgroundColor: 'rgba(255, 107, 53, 0.9)' }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide} 
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500/90 text-white p-4 rounded-full z-20 transition-all backdrop-blur-md border border-white/20 shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Dots with enhanced animations */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsPlaying(false);
              }}
              whileHover={{ scale: 1.3, backgroundColor: 'rgb(255, 107, 53)' }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 rounded-full transition-all shadow-lg ${
                index === currentSlide 
                  ? 'bg-orange-500 w-10 shadow-orange-500/50' 
                  : 'bg-white/70 w-3 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* QUICK LINKS with 3D Tilt */}
      <div className="relative bg-gradient-to-br from-slate-50 via-purple-50/30 to-orange-50/20 py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
        </div>
        
        <StaggerContainer className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {quickAccessCards.map((card, index) => (
            <StaggerItem key={index}>
              <TiltCard intensity={8}>
                <Link
                  to={card.link}
                  className="group relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-purple-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:via-purple-500/5 group-hover:to-orange-500/10 transition-all duration-700" />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <motion.div 
                    className="relative bg-gradient-to-br from-orange-100 to-purple-100 text-orange-600 p-6 rounded-2xl mb-5 group-hover:from-orange-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-500 shadow-lg"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -12, 12, -12, 0],
                      y: -10,
                      transition: { duration: 0.6, ease: 'easeInOut' }
                    }}
                  >
                    {card.icon}
                  </motion.div>
                  
                  <h3 className="relative text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 mb-2">
                    {card.title}
                  </h3>
                  
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 rounded-full"
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

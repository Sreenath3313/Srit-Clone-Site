import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, GraduationCap, Coins, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { campusImages } from '@/data/campusImages';
import { FloatingElements, StaggerContainer, StaggerItem } from '@/components/animations';

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
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="w-full">
      
      {/* HERO SLIDER */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-black">
        {/* Floating Background Elements */}
        <FloatingElements count={8} />
        
        {heroImages.map((img, index) => (
          <motion.div 
            key={img.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <motion.img 
              src={img.src} 
              alt={img.alt}
              className="w-full h-full object-cover"
              style={{ y }}
            />
            {/* Animated Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-orange-900/30 ${index === currentSlide ? 'gradient-animate' : ''}`} />
          </motion.div>
        ))}

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <motion.h2 
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-white text-3xl md:text-6xl font-bold mb-4 drop-shadow-2xl"
          >
            Empowering Knowledge
          </motion.h2>
          <motion.p 
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="text-gray-200 text-lg md:text-xl max-w-3xl drop-shadow-lg"
          >
            Join a community of innovators and leaders at Srinivasa Ramanujan Institute of Technology.
          </motion.p>
        </div>

        {/* Arrows */}
        <motion.button 
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-500/80 text-white p-3 rounded-full z-20 transition-colors backdrop-blur-sm"
        >
          <ChevronLeft />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-orange-500/80 text-white p-3 rounded-full z-20 transition-colors backdrop-blur-sm"
        >
          <ChevronRight />
        </motion.button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? 'bg-orange-500 w-6' : 'bg-white/60 w-2'}`}
            />
          ))}
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="bg-white py-16">
        <StaggerContainer className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickAccessCards.map((card, index) => (
            <StaggerItem key={index}>
              <Link
                to={card.link}
                className="group relative bg-white border rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Glassmorphism effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/10 transition-all duration-500" />
                
                <motion.div 
                  className="relative bg-orange-100 text-orange-600 p-5 rounded-full mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {card.icon}
                </motion.div>
                
                <h3 className="relative text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {card.title}
                </h3>
                
                {/* Bottom line animation */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-orange-500"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

    </div>
  );
};

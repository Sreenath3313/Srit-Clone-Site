import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Coins, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { campusImages } from '@/data/campusImages';

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
        {heroImages.map((img, index) => (
          <div 
            key={img.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={img.src} 
              alt={img.alt}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        ))}

        {/* Overlay Text */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4 z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-3xl md:text-6xl font-bold mb-4"
          >
            Empowering Knowledge
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-200 text-lg md:text-xl max-w-3xl"
          >
            Join a community of innovators and leaders at Srinivasa Ramanujan Institute of Technology.
          </motion.p>
        </div>

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-20">
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-20">
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? 'bg-orange-500 w-6' : 'bg-white/60 w-2'}`}
            />
          ))}
        </div>
      </div>

      {/* QUICK LINKS — FULLY SEPARATE SECTION */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickAccessCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="group bg-white border rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="bg-orange-100 text-orange-600 p-5 rounded-full mb-4 group-hover:scale-110 transition">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'College Fest',
    date: 'March 15-17, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'Main Campus Ground',
    description: 'Three days of cultural celebrations, competitions, and performances',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'Cultural'
  },
  {
    id: 2,
    title: 'Sankranthi Fest',
    date: 'January 14-15, 2025',
    time: '8:00 AM - 8:00 PM',
    location: 'College Auditorium',
    description: 'Traditional festival celebration with cultural programs and games',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    category: 'Festival'
  },
  {
    id: 3,
    title: 'Tech Fest',
    date: 'February 20-22, 2025',
    time: '10:00 AM - 5:00 PM',
    location: 'Engineering Block',
    description: 'Innovation showcase, hackathons, technical workshops and competitions',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    category: 'Technical'
  },
  {
    id: 4,
    title: 'Freshers Day',
    date: 'August 10, 2025',
    time: '2:00 PM - 7:00 PM',
    location: 'Main Auditorium',
    description: 'Welcome program for new students with cultural performances',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    category: 'Cultural'
  },
  {
    id: 5,
    title: 'Graduation Day',
    date: 'May 30, 2025',
    time: '10:00 AM - 2:00 PM',
    location: 'Main Campus',
    description: 'Convocation ceremony for graduating students',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    category: 'Academic'
  },
  {
    id: 6,
    title: 'Annual Sports Meet',
    date: 'December 10-12, 2024',
    time: '7:00 AM - 6:00 PM',
    location: 'Sports Complex',
    description: 'Inter-departmental sports competitions and athletic events',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    category: 'Sports'
  },
  {
    id: 7,
    title: 'Cultural Night',
    date: 'April 5, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Open Air Theater',
    description: 'Evening of music, dance, and cultural performances',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    category: 'Cultural'
  },
  {
    id: 8,
    title: 'Hackathon',
    date: 'March 1-2, 2025',
    time: '24 Hours',
    location: 'Computer Lab',
    description: '24-hour coding marathon with exciting prizes',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    category: 'Technical'
  },
  {
    id: 9,
    title: 'Science Exhibition',
    date: 'February 28, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Science Block',
    description: 'Showcase of innovative science projects and experiments',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    category: 'Academic'
  },
  {
    id: 10,
    title: 'Alumni Meet',
    date: 'June 15, 2025',
    time: '11:00 AM - 4:00 PM',
    location: 'Conference Hall',
    description: 'Reunion and networking event for college alumni',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    category: 'Social'
  }
];

const categoryColors: Record<string, string> = {
  Cultural: 'from-purple-500 to-pink-500',
  Festival: 'from-orange-500 to-red-500',
  Technical: 'from-blue-500 to-cyan-500',
  Academic: 'from-green-500 to-emerald-500',
  Sports: 'from-yellow-500 to-orange-500',
  Social: 'from-indigo-500 to-purple-500'
};

export const EventSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleCards] = useState(3); // Show 3 cards at a time

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []); // Remove currentIndex dependency to avoid recreating interval

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  // Get visible events based on current index
  const getVisibleEvents = () => {
    const visible = [];
    for (let i = 0; i < visibleCards; i++) {
      visible.push(events[(currentIndex + i) % events.length]);
    }
    return visible;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      rotateY: direction > 0 ? -45 : 45,
      scale: 0.8
    })
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-orange-100 rounded-full">
              Upcoming Events
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Campus Events Calendar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover exciting events happening at our campus throughout the year
          </p>
        </motion.div>

        {/* Event Cards Slider */}
        <div className="relative max-w-7xl mx-auto" style={{ perspective: '2000px' }}>
          <div className="relative h-[500px] md:h-[450px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {getVisibleEvents().map((event, index) => (
                <motion.div
                  key={`${event.id}-${currentIndex}-${index}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 },
                    rotateY: { duration: 0.5 },
                    scale: { duration: 0.5 }
                  }}
                  className="absolute w-full md:w-[calc(33.333%-1rem)] top-0"
                  style={{
                    left: `${index * 33.333}%`,
                    zIndex: visibleCards - index,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="group relative h-[450px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        loading="lazy"
                      />
                      {/* Category Badge */}
                      <div className={`absolute top-4 right-4 bg-gradient-to-r ${categoryColors[event.category]} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg`}>
                        {event.category}
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 w-full bg-gradient-to-r from-orange-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        Learn More
                      </motion.button>
                    </div>

                    {/* 3D Glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 107, 53, 0.15) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.button>
            
            {/* Page Indicators */}
            <div className="flex items-center gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-orange-500 to-purple-500'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

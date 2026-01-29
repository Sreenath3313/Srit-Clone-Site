import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Book, FlaskConical, Home, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const tourSpots = [
  {
    title: 'Main Campus',
    description: 'Explore our state-of-the-art academic buildings',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    link: '/campus/main-campus'
  },
  {
    title: 'Library',
    description: 'World-class learning resources',
    icon: <Book className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    link: '/campus/library'
  },
  {
    title: 'Labs',
    description: 'Advanced research facilities',
    icon: <FlaskConical className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    link: '/campus/labs'
  },
  {
    title: 'Hostel',
    description: 'Comfortable residential facilities',
    icon: <Home className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    link: '/campus/hostel'
  },
];

export const VirtualTour: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Virtual Campus <span className="gradient-text">Tour</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Experience SRIT from anywhere - Take a virtual walk through our beautiful campus
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* VIDEO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">

              {!playVideo && (
                <div
                  onClick={() => setPlayVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-white">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-10 h-10 ml-1" />
                    </div>
                    <p className="mt-4 text-lg font-semibold">
                      Click to Start Tour
                    </p>
                  </div>
                </div>
              )}

              {playVideo && (
                <video
                  src="/video.mp4"
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              )}

            </div>
          </motion.div>

          {/* TOUR SPOTS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {tourSpots.map((spot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Link to={spot.link} className="group cursor-pointer block">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full border border-gray-100">
                    
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${spot.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {spot.icon}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {spot.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {spot.description}
                    </p>

                    <div className="mt-4 flex items-center text-orange-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm">View Gallery</span>
                      <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* MAP PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Interactive Campus Map
            </h3>
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                <p className="font-semibold text-lg">Interactive Map Coming Soon</p>
                <p className="text-sm mt-2">Navigate through different departments and facilities</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

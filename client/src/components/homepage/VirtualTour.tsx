import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';
import { Play, MapPin, Camera } from 'lucide-react';

const tourSpots = [
  {
    title: 'Main Campus',
    description: 'Explore our state-of-the-art academic buildings',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Library',
    description: 'World-class learning resources',
    icon: <Camera className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Labs',
    description: 'Advanced research facilities',
    icon: <Camera className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Sports Complex',
    description: 'Olympic-standard facilities',
    icon: <Camera className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500'
  },
];

export const VirtualTour: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
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
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gradient-to-br from-slate-900 to-slate-700 group">
              {/* Placeholder for video - using fallback image */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10" />
                  </div>
                  <p className="text-lg font-semibold">Click to Start Tour</p>
                </div>
              </div>
              
              {/* Actual video player (will work when video URL is available) */}
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // TODO: Replace with actual SRIT campus tour video URL
                  width="100%"
                  height="100%"
                  controls
                  light
                  playing={false}
                />
              </div>
              
              {/* Decorative border */}
              <div className="absolute inset-0 border-4 border-orange-500/50 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-orange-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <p className="font-bold text-lg">360° View Available</p>
            </div>
          </motion.div>

          {/* Tour Spots Grid */}
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
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full border border-gray-100">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${spot.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {spot.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {spot.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {spot.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-4 flex items-center text-orange-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Explore</span>
                    <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Campus Map Placeholder */}
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

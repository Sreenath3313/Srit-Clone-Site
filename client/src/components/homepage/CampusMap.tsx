import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, BookOpen, Utensils, Dumbbell, Home, X } from 'lucide-react';

interface Building {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  color: string;
}

const buildings: Building[] = [
  {
    id: 'main',
    name: 'Main Academic Block',
    description: 'Primary teaching and administration building with modern classrooms',
    x: 50,
    y: 40,
    icon: <Building2 className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'library',
    name: 'Central Library',
    description: 'State-of-the-art library with 2000+ seating capacity',
    x: 30,
    y: 60,
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'cafeteria',
    name: 'Student Cafeteria',
    description: 'Multi-cuisine dining facility',
    x: 70,
    y: 30,
    icon: <Utensils className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    description: '15+ sports facilities including gymnasium',
    x: 80,
    y: 70,
    icon: <Dumbbell className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'hostel',
    name: 'Student Hostels',
    description: 'Comfortable accommodation for 3000+ students',
    x: 20,
    y: 30,
    icon: <Home className="w-6 h-6" />,
    color: 'from-indigo-500 to-blue-500'
  }
];

const campusStats = [
  { label: 'Academic Blocks', value: '12', icon: <Building2 className="w-5 h-5" /> },
  { label: 'Research Labs', value: '45', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Library Capacity', value: '2000', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Sports Facilities', value: '15', icon: <Dumbbell className="w-5 h-5" /> },
  { label: 'Cafeterias', value: '6', icon: <Utensils className="w-5 h-5" /> },
];

export const CampusMap: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg"
          >
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">Explore Campus</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">Map</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our world-class facilities spread across a sprawling campus
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campus Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-orange-500/20 overflow-hidden"
              style={{ minHeight: '500px' }}
            >
              {/* Map Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 107, 53, 0.3) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* Buildings */}
              <div className="relative w-full h-full">
                {buildings.map((building) => (
                  <motion.div
                    key={building.id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    style={{
                      position: 'absolute',
                      left: `${building.x}%`,
                      top: `${building.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredBuilding(building.id)}
                    onMouseLeave={() => setHoveredBuilding(null)}
                    onClick={() => setSelectedBuilding(building)}
                  >
                    <div className={`relative p-4 rounded-xl bg-gradient-to-br ${building.color} text-white shadow-lg hover:shadow-2xl transition-all duration-300`}>
                      {building.icon}
                      
                      {/* Pulse Animation */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className={`absolute inset-0 bg-gradient-to-br ${building.color} rounded-xl -z-10`}
                      />
                    </div>

                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {hoveredBuilding === building.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-20 border border-gray-200 dark:border-slate-700"
                        >
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{building.name}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                <p className="text-white text-xs font-semibold mb-2">Click on icons to learn more</p>
              </div>
            </motion.div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Campus Statistics</h3>
              
              {campusStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-orange-500/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 text-white">
                        {stat.icon}
                      </div>
                      <span className="text-gray-300 font-medium">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">
                      {stat.value}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Virtual Tour CTA */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 107, 53, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Take 360° Virtual Tour →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Building Info Popup */}
      <AnimatePresence>
        {selectedBuilding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBuilding(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-gradient-to-br ${selectedBuilding.color} rounded-2xl p-8 max-w-md w-full shadow-2xl relative`}
            >
              <button
                onClick={() => setSelectedBuilding(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="text-white">
                <div className="mb-6 p-4 bg-white/20 rounded-xl inline-flex">
                  {selectedBuilding.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4">{selectedBuilding.name}</h3>
                <p className="text-white/90 text-lg">{selectedBuilding.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

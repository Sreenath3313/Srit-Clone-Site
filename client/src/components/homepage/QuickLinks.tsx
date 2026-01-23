import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar, 
  Award,
  TrendingUp,
  Phone,
  Download
} from 'lucide-react';
import { 
  HexagonalGrid, 
  GeometricShapes3D, 
  ParticleBackground 
} from '@/components/animations';

const quickLinks = [
  {
    title: 'Admissions 2025',
    description: 'Start your journey with us',
    icon: <GraduationCap className="w-8 h-8" />,
    link: '/admissions',
    gradient: 'from-blue-500 to-cyan-500',
    stats: 'Now Open'
  },
  {
    title: 'Academic Programs',
    description: '6 Engineering Departments',
    icon: <BookOpen className="w-8 h-8" />,
    link: '/academics',
    gradient: 'from-purple-500 to-pink-500',
    stats: 'UG & PG'
  },
  {
    title: 'Placements',
    description: '90% Placement Record',
    icon: <TrendingUp className="w-8 h-8" />,
    link: '/placements',
    gradient: 'from-green-500 to-emerald-500',
    stats: '200+ Companies'
  },
  {
    title: 'Faculty',
    description: 'Expert Educators',
    icon: <Users className="w-8 h-8" />,
    link: '/faculty',
    gradient: 'from-orange-500 to-red-500',
    stats: '200+ PhDs'
  },
  {
    title: 'Events Calendar',
    description: 'Stay updated with events',
    icon: <Calendar className="w-8 h-8" />,
    link: '/events',
    gradient: 'from-pink-500 to-rose-500',
    stats: 'Year Round'
  },
  {
    title: 'Scholarships',
    description: 'Financial assistance available',
    icon: <Award className="w-8 h-8" />,
    link: '/scholarships',
    gradient: 'from-yellow-500 to-orange-500',
    stats: 'Merit Based'
  },
  {
    title: 'Downloads',
    description: 'Forms and documents',
    icon: <Download className="w-8 h-8" />,
    link: '/downloads',
    gradient: 'from-indigo-500 to-blue-500',
    stats: 'All Resources'
  },
  {
    title: 'Contact Us',
    description: 'Get in touch',
    icon: <Phone className="w-8 h-8" />,
    link: '/contact',
    gradient: 'from-teal-500 to-green-500',
    stats: '24/7 Support'
  },
];

export const QuickLinks: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* Cyber Background */}
      <Suspense fallback={null}>
        <HexagonalGrid className="opacity-20" gridCount={40} />
      </Suspense>

      <Suspense fallback={null}>
        <GeometricShapes3D className="opacity-30" />
      </Suspense>

      <Suspense fallback={null}>
        <ParticleBackground className="opacity-40" particleCount={1500} />
      </Suspense>

      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-3xl" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/80" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quick <span className="text-orange-400">Access</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Everything you need, just a click away
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {quickLinks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={item.link}>
                <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 overflow-hidden h-full">
                  
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    {item.description}
                  </p>

                  {/* Stats badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-gray-200 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-colors duration-300">
                    {item.stats}
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-4 right-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                      →
                    </div>
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-500/50 transition-all duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

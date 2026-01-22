import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  Award,
  TrendingUp,
  Mail,
  Phone,
  Download
} from 'lucide-react';

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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #FF6B35 1px, transparent 1px), linear-gradient(to bottom, #FF6B35 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Quick <span className="gradient-text">Access</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden h-full">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    {item.description}
                  </p>

                  {/* Stats badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors duration-300">
                    {item.stats}
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-4 right-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                      →
                    </div>
                  </div>

                  {/* Animated border */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-500/50 transition-all duration-500`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

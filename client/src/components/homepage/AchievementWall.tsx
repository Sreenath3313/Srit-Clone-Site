import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, BookOpen, Medal, Target, Zap } from 'lucide-react';

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  size: 'large' | 'small';
}

const achievements: Achievement[] = [
  {
    title: '🏆 National Hackathon Winners',
    description: 'First place at Smart India Hackathon 2024, developing innovative solutions for smart cities',
    icon: <Trophy className="w-12 h-12" />,
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    size: 'large'
  },
  {
    title: '95% Placement Rate',
    description: 'Achieving excellence in career outcomes',
    icon: <Target className="w-8 h-8" />,
    gradient: 'from-green-400 to-emerald-600',
    size: 'small'
  },
  {
    title: 'Patent Filed',
    description: 'IoT-based smart agriculture system',
    icon: <Award className="w-8 h-8" />,
    gradient: 'from-purple-400 to-pink-600',
    size: 'small'
  },
  {
    title: '150+ Research Papers',
    description: 'Published in international journals',
    icon: <BookOpen className="w-8 h-8" />,
    gradient: 'from-blue-400 to-cyan-600',
    size: 'small'
  },
  {
    title: 'Sports Excellence',
    description: 'State-level championships in multiple events',
    icon: <Medal className="w-8 h-8" />,
    gradient: 'from-orange-400 to-red-600',
    size: 'small'
  },
  {
    title: 'Innovation Lab',
    description: '50+ startup ideas incubated',
    icon: <Zap className="w-8 h-8" />,
    gradient: 'from-indigo-400 to-purple-600',
    size: 'small'
  }
];

export const AchievementWall: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-orange-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

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
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">Our Achievements</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Excellence</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Celebrating our journey of innovation, success, and continuous growth
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: achievement.size === 'large' ? 0 : 3,
                transition: { duration: 0.3 }
              }}
              className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                achievement.size === 'large' 
                  ? 'md:col-span-2 md:row-span-2' 
                  : 'col-span-1'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-sm" />

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Content */}
              <div className={`relative p-8 flex flex-col ${
                achievement.size === 'large' ? 'h-full justify-center' : 'h-full'
              } text-white`}>
                {/* Icon */}
                <motion.div
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                  className={`${
                    achievement.size === 'large' ? 'mb-8' : 'mb-4'
                  } inline-flex items-center justify-center ${
                    achievement.size === 'large' ? 'w-24 h-24' : 'w-16 h-16'
                  } bg-white/20 backdrop-blur-md rounded-2xl shadow-lg`}
                >
                  {achievement.icon}
                </motion.div>

                {/* Title */}
                <h3 className={`font-bold mb-3 ${
                  achievement.size === 'large' ? 'text-3xl md:text-4xl' : 'text-xl'
                }`}>
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className={`${
                  achievement.size === 'large' ? 'text-lg md:text-xl' : 'text-sm'
                } text-white/90`}>
                  {achievement.description}
                </p>

                {/* Decorative Elements for Large Card */}
                {achievement.size === 'large' && (
                  <>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  </>
                )}

                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  className="absolute bottom-0 left-0 h-1 bg-white/30"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '25+', label: 'Awards Won' },
            { value: '1000+', label: 'Certifications' },
            { value: '50+', label: 'Competitions' },
            { value: '95%', label: 'Success Rate' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-slate-700"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

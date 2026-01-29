import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, TrendingUp, Award, Users, Building2 } from 'lucide-react';

// CountUp component
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ 
  end, 
  duration = 2, 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    
    let animationFrameId: number;
    let startTime: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);
      
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Company logos (using text as placeholders - you can replace with actual logos)
const topCompanies = [
  { name: "Google", img: "/Google.jpg" },
  { name: "Microsoft", img: "/Microsoft.jpg" },
  { name: "Amazon", img: "/Amazon.jpg" },
  { name: "TCS", img: "/Tcs.jpg" },
  { name: "Infosys", img: "/Infosys.jpg" },
  { name: "Wipro", img: "/Wipro_Logo.jpg" },
];



export const PlacementDashboard: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: 845,
      label: 'Students Placed',
      suffix: '+',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: 127,
      label: 'Companies Visited',
      suffix: '+',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 28,
      label: 'Highest Package',
      suffix: ' LPA',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 95,
      label: 'Placement Rate',
      suffix: '%',
      gradient: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
            <Briefcase className="w-5 h-5" />
            <span className="font-semibold">Live Placements {new Date().getFullYear()}</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Placement <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Statistics</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Empowering students with industry-leading opportunities and career excellence
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${stat.gradient} text-white mb-4 shadow-lg`}>
                  {stat.icon}
                </div>
                
                {/* Value */}
                <div className="relative">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>

                {/* Bottom Accent */}
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.gradient}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top Companies Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-slate-700"
>
  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
    Top Recruiting{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
      Companies
    </span>
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {topCompanies.map((company, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.15 }}
        whileHover={{ y: -5, scale: 1.05 }}
        className="group"
      >
        <div className="relative bg-white dark:bg-slate-900 rounded-xl p-6 flex items-center justify-center h-24 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-slate-700">

          <img
            src={company.img}
            alt={company.name}
            className="max-h-12 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
            draggable={false}
          />

          {/* Shine effect */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 107, 53, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            View All Placement Details →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

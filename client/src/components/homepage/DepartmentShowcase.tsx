import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Zap, Cog, Building2, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

const departments = [
  {
    name: 'Computer Science & Engineering',
    icon: <Cpu className="w-12 h-12" />,
    description: 'Leading-edge programs in software development, AI, and machine learning',
    students: '1200+',
    path: '/departments/cse',
    gradient: 'from-blue-500 to-cyan-500',
    image: '/pics/Screenshot 2026-01-16 133343.png'
  },
  {
    name: 'Electronics & Communication',
    icon: <Zap className="w-12 h-12" />,
    description: 'Advanced electronics, embedded systems, and communication technologies',
    students: '800+',
    path: '/departments/ece',
    gradient: 'from-purple-500 to-pink-500',
    image: '/pics/Screenshot 2026-01-16 133349.png'
  },
  {
    name: 'Mechanical Engineering',
    icon: <Cog className="w-12 h-12" />,
    description: 'Innovation in design, manufacturing, and automation',
    students: '600+',
    path: '/departments/mech',
    gradient: 'from-orange-500 to-red-500',
    image: '/pics/Screenshot 2026-01-16 133359.png'
  },
  {
    name: 'Civil Engineering',
    icon: <Building2 className="w-12 h-12" />,
    description: 'Building sustainable infrastructure and smart cities',
    students: '500+',
    path: '/departments/civil',
    gradient: 'from-green-500 to-emerald-500',
    image: '/pics/Screenshot 2026-01-16 133405.png'
  },
  {
    name: 'Chemical Engineering',
    icon: <FlaskConical className="w-12 h-12" />,
    description: 'Process engineering and sustainable chemical solutions',
    students: '400+',
    path: '/departments/chemical',
    gradient: 'from-yellow-500 to-amber-500',
    image: '/pics/Screenshot 2026-01-16 133343.png'
  },
];

export const DepartmentShowcase: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="gradient-text">Departments</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            World-class education across diverse engineering disciplines
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={dept.path}>
                <div className="group relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Image background */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-90 group-hover:opacity-80 transition-opacity duration-500`}
                    />
                    <img 
                      src={dept.image} 
                      alt={dept.name}
                      loading="lazy"
                      className="w-full h-full object-cover mix-blend-overlay opacity-40"
                    />
                    
                    {/* Icon */}
                    <div className="absolute top-6 left-6 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white group-hover:scale-110 transition-transform duration-300">
                      {dept.icon}
                    </div>

                    {/* Student count badge */}
                    <div className="absolute top-6 right-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-sm font-semibold">
                      {dept.students} Students
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {dept.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {dept.description}
                    </p>

                    {/* Learn more link */}
                    <div className="mt-4 flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all duration-300">
                      <span>Explore Department</span>
                      <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>

                  {/* Hover gradient border */}
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 rounded-2xl transition-all duration-500 pointer-events-none`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

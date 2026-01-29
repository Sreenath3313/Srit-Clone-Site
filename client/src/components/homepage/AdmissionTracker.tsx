import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, ClipboardCheck, Video, GraduationCap, CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'pending';
}

const admissionSteps: Step[] = [
  {
    id: 1,
    title: 'Register',
    description: 'Create your account and start your journey',
    icon: <UserPlus className="w-6 h-6" />,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Apply',
    description: 'Fill out the application form with your details',
    icon: <FileText className="w-6 h-6" />,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Test',
    description: 'Appear for the entrance examination',
    icon: <ClipboardCheck className="w-6 h-6" />,
    status: 'active'
  },
  {
    id: 4,
    title: 'Interview',
    description: 'Personal interview with faculty panel',
    icon: <Video className="w-6 h-6" />,
    status: 'pending'
  },
  {
    id: 5,
    title: 'Enrolled',
    description: 'Complete admission and begin your studies',
    icon: <GraduationCap className="w-6 h-6" />,
    status: 'pending'
  }
];

export const AdmissionTracker: React.FC = () => {
  const activeStep = admissionSteps.findIndex(step => step.status === 'active');

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Animated Grid */}
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
            <GraduationCap className="w-5 h-5" />
            <span className="font-semibold">Admission Journey</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">Success</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Track your admission progress through our gamified step-by-step journey
          </p>
        </motion.div>

        {/* Progress Tracker */}
        <div className="max-w-5xl mx-auto">
          {/* Steps */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-slate-700 hidden md:block">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: `${(activeStep / (admissionSteps.length - 1)) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-orange-500 to-purple-500 relative"
              >
                {/* Animated Pulse at End */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full"
                />
              </motion.div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {admissionSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    className={`relative bg-gradient-to-br ${
                      step.status === 'completed'
                        ? 'from-green-600 to-emerald-600'
                        : step.status === 'active'
                        ? 'from-orange-600 to-purple-600'
                        : 'from-slate-700 to-slate-800'
                    } rounded-2xl p-6 shadow-xl border-2 ${
                      step.status === 'active' ? 'border-orange-400' : 'border-transparent'
                    } transition-all duration-300`}
                  >
                    {/* Pulse Animation for Active Step */}
                    {step.status === 'active' && (
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-500 rounded-2xl -z-10 blur-xl"
                      />
                    )}

                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        step.status === 'completed'
                          ? 'bg-white/20'
                          : step.status === 'active'
                          ? 'bg-white/30'
                          : 'bg-white/10'
                      } text-white backdrop-blur-sm`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          step.id
                        )}
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        step.status === 'completed'
                          ? 'bg-green-400/20 text-green-300'
                          : step.status === 'active'
                          ? 'bg-orange-400/20 text-orange-300'
                          : 'bg-slate-600/20 text-slate-400'
                      }`}>
                        {step.status === 'completed' ? 'Done' : step.status === 'active' ? 'Current' : 'Pending'}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-4 text-white">
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/80">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Next Action Card */}
          {activeStep >= 0 && activeStep < admissionSteps.length && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-orange-500/30 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Next Step: {admissionSteps[activeStep].title}
                  </h3>
                  <p className="text-gray-400">
                    {admissionSteps[activeStep].description}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 107, 53, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 whitespace-nowrap"
                >
                  Continue →
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

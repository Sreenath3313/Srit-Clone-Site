import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, GraduationCap, Building2, Users, Book } from 'lucide-react';

const quickQuestions = [
  {
    question: 'What are the eligibility criteria?',
    icon: <GraduationCap className="w-5 h-5" />,
    answer: 'Minimum 60% in 10+2 with Physics, Chemistry, and Mathematics for B.Tech programs.'
  },
  {
    question: 'How do I apply for scholarships?',
    icon: <Book className="w-5 h-5" />,
    answer: 'Merit-based scholarships are automatically considered during admission. Visit our scholarships page for details.'
  },
  {
    question: 'Tell me about campus facilities',
    icon: <Building2 className="w-5 h-5" />,
    answer: '45+ research labs, 2000-capacity library, sports complex, hostels, and modern cafeterias.'
  },
  {
    question: 'What about placements?',
    icon: <Users className="w-5 h-5" />,
    answer: '95% placement rate with 127+ companies visiting. Highest package of 28 LPA this year.'
  }
];

export const VirtualCounselor: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
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
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Ask Me Anything</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Virtual Admission <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Counselor</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Get instant answers to your admission queries from our AI counselor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Counselor Avatar/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* 3D Avatar Container */}
            <div className="relative">
              {/* Floating Animation */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative"
              >
                {/* Avatar Circle */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full blur-2xl opacity-30" />
                  
                  {/* Avatar Background */}
                  <div className="relative w-full h-full bg-gradient-to-br from-orange-500 to-purple-500 rounded-full p-1 shadow-2xl">
                    <div className="w-full h-full bg-white dark:bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                      {/* Placeholder Avatar - Using emoji/icon */}
                      <div className="text-8xl">🎓</div>
                    </div>
                  </div>

                  {/* Orbiting Badges */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full shadow-lg">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-full shadow-lg">
                      <Book className="w-6 h-6" />
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg">
                      <Building2 className="w-6 h-6" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -top-4 -right-4 md:top-8 md:-right-12 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-2xl border border-gray-200 dark:border-slate-700 max-w-xs"
              >
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  👋 Hi! I'm your virtual counselor. How can I help you today?
                </p>
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 left-8 w-4 h-4 bg-white dark:bg-slate-800 transform rotate-45 translate-y-2 border-r border-b border-gray-200 dark:border-slate-700" />
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Questions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Questions
            </h3>

            {quickQuestions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.button
                  onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    selectedQuestion === index
                      ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-xl'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedQuestion === index
                        ? 'bg-white/20'
                        : 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-semibold">{item.question}</span>
                  </div>
                </motion.button>

                {/* Answer */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedQuestion === index ? 'auto' : 0,
                    opacity: selectedQuestion === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Chat CTA */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 107, 53, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Start Live Chat
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

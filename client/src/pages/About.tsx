import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { BookOpen, Target, Award, Users } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { ScrollReveal, TiltCard, ParallaxSection, GradientOrb, CountUp } from '@/components/animations';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import { ModernCard, ModernCardBody } from '@/components/common/ModernCard';
import { accreditations } from '@/data/accreditations';

const About: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with 3D elements */}
        <section className="relative bg-gradient-to-br from-purple-900 via-slate-900 to-orange-900 text-white py-24 md:py-32 overflow-hidden">
          {/* 3D Gradient Orbs */}
          <GradientOrb color1="#FF6B35" color2="#F7931E" size={600} className="-top-40 -left-40 opacity-20" />
          <GradientOrb color1="#8B5CF6" color2="#EC4899" size={700} className="-bottom-60 -right-60 opacity-20" />
          
          {/* Animated particles background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                style={{
                  textShadow: '0 0 40px rgba(255, 107, 53, 0.5)',
                }}
              >
                About <span className="gradient-text">SRIT</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Srinivasa Ramanujan Institute of Technology - Excellence in Technical Education Since 1998
              </motion.p>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* College Overview with parallax */}
        <section id="overview" className="relative py-20 bg-gradient-to-br from-slate-50 to-purple-50/30 overflow-hidden">
          <ParallaxSection speed={0.5} className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </ParallaxSection>
          
          <div className="container mx-auto px-4 relative">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <motion.div className="text-center mb-12">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-orange-100 rounded-full inline-block mb-4">
                    Our Journey
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Our Story
                  </h2>
                </motion.div>
                
                <div className="bg-gradient-to-br from-orange-50/80 to-white p-8 rounded-2xl shadow-sm space-y-6 text-gray-700 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-lg"
                  >
                    Srinivasa Ramanujan Institute of Technology (SRIT) was established in 1998 with a vision to provide 
                    quality technical education and create skilled professionals who can contribute to society and industry. 
                    Named after the legendary mathematician Srinivasa Ramanujan, our institution embodies his spirit of 
                    innovation, curiosity, and excellence.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg"
                  >
                    Over the past two decades, SRIT has grown from a small engineering college to a premier technical 
                    institution offering undergraduate and postgraduate programs in various disciplines. Our state-of-the-art 
                    infrastructure, experienced faculty, and industry partnerships ensure that our students receive education 
                    that is both theoretical and practical.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg"
                  >
                    We take pride in our commitment to holistic development, fostering not just academic excellence but also 
                    character building, leadership skills, and social responsibility among our students. Our alumni have gone 
                    on to make significant contributions in leading organizations worldwide.
                  </motion.p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Vision & Mission with 3D cards */}
        <section id="vision" className="relative py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-orange-100 rounded-full inline-block mb-4">
                  Our Foundation
                </span>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                  Vision & Mission
                </h2>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Vision */}
              <ScrollReveal direction="left">
                <TiltCard intensity={10}>
                  <motion.div 
                    className="bg-gradient-to-br from-orange-50 to-orange-100 p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-orange-200"
                    whileHover={{ y: -10 }}
                  >
                    <motion.div 
                      className="flex items-center mb-6"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-xl mr-4 shadow-lg">
                        <Target className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                    </motion.div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      To be a globally recognized institution of excellence in technical education, research, and innovation, 
                      producing competent professionals who are ethically grounded and socially responsible.
                    </p>
                    
                    {/* Animated border */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </motion.div>
                </TiltCard>
              </ScrollReveal>

              {/* Mission */}
              <ScrollReveal direction="right">
                <TiltCard intensity={10}>
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-purple-100 p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-purple-200"
                    whileHover={{ y: -10 }}
                  >
                    <motion.div 
                      className="flex items-center mb-6"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl mr-4 shadow-lg">
                        <BookOpen className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                    </motion.div>
                    <ul className="text-gray-700 space-y-3 text-lg">
                      {[
                        'Provide quality education with state-of-the-art infrastructure',
                        'Foster research and innovation in emerging technologies',
                        'Develop industry-ready professionals through practical training',
                        'Promote ethical values and social responsibility'
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="text-purple-500 mr-2 mt-1">▸</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* Animated border */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Key Highlights with animated counters */}
        <section className="relative py-20 bg-gradient-to-br from-purple-50/50 to-orange-50/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-orange-100 rounded-full inline-block mb-4">
                  Achievements
                </span>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                  Key Highlights
                </h2>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <ScrollReveal delay={0.1}>
                <TiltCard>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-3">
                      <CountUp end={1998} duration={2} />
                    </div>
                    <div className="text-gray-600 font-semibold text-lg">Established</div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <TiltCard>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-3">
                      A+
                    </div>
                    <div className="text-gray-600 font-semibold text-lg">NAAC Rating</div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <TiltCard>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">
                      <CountUp end={2000} duration={2.5} suffix="+" />
                    </div>
                    <div className="text-gray-600 font-semibold text-lg">Students</div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <TiltCard>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">
                      <CountUp end={100} duration={2} suffix="+" />
                    </div>
                    <div className="text-gray-600 font-semibold text-lg">Faculty Members</div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <TiltCard>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-3">
                      <CountUp end={95} duration={2} suffix="%" />
                    </div>
                    <div className="text-gray-600 font-semibold text-lg">Placement Rate</div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
              
              <ScrollReveal delay={0.6}>
                <TiltCard>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <div className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent mb-3">
                      <CountUp end={50} duration={2} suffix="+" />
                    </div>
                    <div className="text-gray-600 font-semibold text-lg">Acres Campus</div>
                  </motion.div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" 
                    alt="Dr. Rajesh Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Rajesh Kumar</h3>
                <p className="text-orange-600 font-medium mb-2">Principal</p>
                <p className="text-gray-600 text-sm">Ph.D. in Computer Science, 25+ years of experience in academia</p>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" 
                    alt="Prof. Lakshmi Devi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prof. Lakshmi Devi</h3>
                <p className="text-blue-600 font-medium mb-2">Vice Principal (Academics)</p>
                <p className="text-gray-600 text-sm">M.Tech, 20+ years of teaching experience</p>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" 
                    alt="Dr. Arun Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Arun Sharma</h3>
                <p className="text-green-600 font-medium mb-2">Dean (Research & Development)</p>
                <p className="text-gray-600 text-sm">Ph.D., 15+ research publications</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Accreditations - Prominently Highlighted */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Award className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                </motion.div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-orange-100 rounded-full inline-block mb-4">
                  Our Credentials
                </span>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                  Accreditations & Approvals
                </h2>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Recognized and accredited by premier national bodies for quality education
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {accreditations.map((accreditation, index) => (
                <motion.div
                  key={accreditation.name}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                >
                  <ModernCard
                    variant={accreditation.highlight ? "gradient" : "default"}
                    gradient={
                      accreditation.name === 'NBA' ? 'from-yellow-50 to-orange-100' :
                      accreditation.name === 'NAAC' ? 'from-green-50 to-emerald-100' :
                      accreditation.name === 'JNTUA' ? 'from-blue-50 to-indigo-100' :
                      'from-gray-50 to-gray-100'
                    }
                    orangeAccent={accreditation.highlight}
                    className="h-full relative overflow-hidden"
                  >
                    {accreditation.highlight && (
                      <motion.div
                        className="absolute top-0 right-0 bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg"
                        initial={{ x: 100 }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        FEATURED
                      </motion.div>
                    )}
                    <ModernCardBody className="text-center pt-12 pb-8">
                      <motion.div
                        className="text-6xl mb-4"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {accreditation.logo}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {accreditation.name}
                        {accreditation.grade && (
                          <span className="ml-2 text-3xl text-green-600">"{accreditation.grade}"</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{accreditation.fullName}</p>
                      <p className="text-sm font-semibold text-gray-800">{accreditation.description}</p>
                    </ModernCardBody>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
            
            {/* Additional Emphasis for NAAC A Grade */}
            <motion.div
              className="mt-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <ModernCard variant="gradient" gradient="from-green-100 via-emerald-100 to-green-100" orangeAccent={true}>
                <ModernCardBody className="text-center py-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Award className="h-10 w-10 text-green-600" />
                    <h3 className="text-3xl font-bold text-gray-900">
                      NAAC Accredited with <span className="text-green-600">"A"</span> Grade
                    </h3>
                    <Award className="h-10 w-10 text-green-600" />
                  </div>
                  <p className="text-gray-700 text-lg">
                    Our commitment to excellence in education has been recognized by the National Assessment and Accreditation Council (NAAC) with the prestigious "A" grade.
                  </p>
                </ModernCardBody>
              </ModernCard>
            </motion.div>
          </div>
        </section>

        {/* Infrastructure */}
        <section id="infrastructure" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Infrastructure</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                'Modern Classrooms with Smart Boards',
                'Well-equipped Laboratories',
                'Central Library with 50,000+ Books',
                'Computer Center with Latest Software',
                'Sports Complex & Gymnasium',
                'Auditorium with 500+ Seating',
                'Cafeteria & Mess Facilities',
                'Wi-Fi Enabled Campus',
                'Hostel Accommodation',
              ].map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <ModernCard variant="default" orangeAccent={false} hoverEffect={true}>
                    <ModernCardBody className="p-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    </ModernCardBody>
                  </ModernCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Building2, Utensils, Dumbbell, Music, BookOpen, Home } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import { motion } from 'framer-motion';
import { SlideIn, FadeIn } from '@/components/animations';

const CampusLife: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Campus Life</h1>
            <p className="text-xl max-w-3xl mx-auto">
              A Vibrant Community that Nurtures Growth, Learning, and Well-being
            </p>
          </div>
        </section>

        {/* Campus Facilities Overview */}
        <section className="py-16 bg-gradient-to-br from-orange-50/50 to-purple-50/30">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-4">
                <span className="bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                  World-Class Facilities
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-purple-600 mx-auto mb-12 rounded-full"></div>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hostel */}
              <SlideIn direction="left" delay={0}>
                <motion.div 
                  className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hostel Facilities</h3>
                <p className="text-gray-600 mb-4">
                  Separate hostels for boys and girls with modern amenities, 24/7 security, and comfortable living spaces.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Wi-Fi enabled rooms</li>
                  <li>• 24/7 power backup</li>
                  <li>• Recreation rooms</li>
                  <li>• Laundry facilities</li>
                  <li>• Medical care</li>
                </ul>
              </motion.div>
              </SlideIn>

              {/* Library */}
              <SlideIn direction="up" delay={0.1}>
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Central Library</h3>
                <p className="text-gray-600 mb-4">
                  State-of-the-art library with extensive collection of books, journals, and digital resources.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 50,000+ books</li>
                  <li>• Digital library access</li>
                  <li>• Reading halls</li>
                  <li>• Research journals</li>
                  <li>• E-learning resources</li>
                </ul>
              </motion.div>
              </SlideIn>

              {/* Sports */}
              <SlideIn direction="right" delay={0.2}>
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Dumbbell className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sports Complex</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive sports facilities to promote physical fitness and competitive spirit.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Indoor stadium</li>
                  <li>• Cricket ground</li>
                  <li>• Basketball courts</li>
                  <li>• Volleyball courts</li>
                  <li>• Gymnasium</li>
                </ul>
              </motion.div>
              </SlideIn>

              {/* Canteen */}
              <SlideIn direction="left" delay={0.3}>
                <motion.div 
                  className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Canteen & Dining</h3>
                <p className="text-gray-600 mb-4">
                  Hygienic canteen serving nutritious meals and snacks throughout the day.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Vegetarian & non-veg options</li>
                  <li>• Hygienic food preparation</li>
                  <li>• Affordable prices</li>
                  <li>• Spacious seating</li>
                  <li>• Varied menu</li>
                </ul>
              </motion.div>
              </SlideIn>

              {/* Auditorium */}
              <SlideIn direction="up" delay={0.4}>
                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Music className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Auditorium</h3>
                <p className="text-gray-600 mb-4">
                  Modern auditorium for events, seminars, cultural programs, and guest lectures.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 500+ seating capacity</li>
                  <li>• Audio-visual systems</li>
                  <li>• Air-conditioned</li>
                  <li>• Stage lighting</li>
                  <li>• Sound system</li>
                </ul>
              </motion.div>
              </SlideIn>

              {/* Infrastructure */}
              <SlideIn direction="right" delay={0.5}>
                <motion.div 
                  className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Campus Infrastructure</h3>
                <p className="text-gray-600 mb-4">
                  Sprawling campus with modern buildings, labs, and green spaces.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 30+ acres campus</li>
                  <li>• Smart classrooms</li>
                  <li>• Research labs</li>
                  <li>• Wi-Fi campus</li>
                  <li>• Green campus</li>
                </ul>
              </motion.div>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* Cultural Activities */}
        <section className="py-16 bg-gradient-to-br from-white to-blue-50/30">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Cultural Activities
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full"></div>
            </FadeIn>
            <div className="max-w-4xl mx-auto">
              <FadeIn delay={0.2}>
                <p className="text-gray-700 mb-8 text-center">
                  SRIT hosts numerous cultural events throughout the year, providing students with platforms to showcase their talents.
                </p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <SlideIn direction="left">
                  <motion.div 
                    className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Annual Fest - TECHNOVISION</h3>
                  <p className="text-gray-700">
                    Our flagship technical and cultural festival featuring competitions, workshops, exhibitions, 
                    guest lectures, and entertainment events spanning multiple days.
                  </p>
                </motion.div>
                </SlideIn>
                <SlideIn direction="right">
                  <motion.div 
                    className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Programs</h3>
                  <p className="text-gray-700">
                    Regular cultural activities including dance, music, drama, and art competitions. 
                    Students participate in inter-college competitions and win accolades.
                  </p>
                </motion.div>
                </SlideIn>
                <SlideIn direction="left" delay={0.2}>
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Technical Events</h3>
                  <p className="text-gray-700">
                    Hackathons, coding competitions, project exhibitions, paper presentations, 
                    and guest lectures by industry experts.
                  </p>
                </motion.div>
                </SlideIn>
                <SlideIn direction="right" delay={0.2}>
                  <motion.div 
                    className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Sports Events</h3>
                  <p className="text-gray-700">
                    Annual sports meet, inter-department tournaments, and participation in 
                    university-level competitions in various sports.
                  </p>
                </motion.div>
                </SlideIn>
              </div>
            </div>
          </div>
        </section>

        {/* Student Life Stats */}
        <section className="py-16 bg-gradient-to-br from-purple-50/30 to-orange-50/30">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                  Campus by Numbers
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-orange-600 mx-auto mb-12 rounded-full"></div>
            </FadeIn>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { value: '30+', label: 'Acres Campus', colorClass: 'text-orange-600', delay: 0 },
                { value: '2000+', label: 'Students', colorClass: 'text-blue-600', delay: 0.1 },
                { value: '20+', label: 'Student Clubs', colorClass: 'text-purple-600', delay: 0.2 },
                { value: '50+', label: 'Events Annually', colorClass: 'text-green-600', delay: 0.3 }
              ].map((stat, index) => (
                <SlideIn key={index} direction="up" delay={stat.delay}>
                  <motion.div 
                    className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all"
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <p className={`text-4xl font-bold ${stat.colorClass} mb-2`}>{stat.value}</p>
                    <p className="text-gray-700">{stat.label}</p>
                  </motion.div>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CampusLife;

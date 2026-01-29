import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { BookOpen, GraduationCap, Calendar, Users } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import { ModernCard, ModernCardBody } from '@/components/common/ModernCard';
import { motion } from 'framer-motion';

const Academics: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Academics</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Excellence in Education through Innovation and Research
            </p>
          </div>
        </section>

        {/* Programs Overview */}
        <section id="programs" className="py-16 bg-gradient-to-br from-orange-50 to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Academic Programs</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <ModernCard variant="gradient" gradient="from-orange-50 to-orange-100" orangeAccent={true}>
                <ModernCardBody>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Undergraduate Programs</h3>
                  <p className="text-gray-600 mb-6">4-year Bachelor of Technology (B.Tech) programs</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Computer Science Engineering</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Electronics & Communication Engineering</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Mechanical Engineering</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Civil Engineering</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Electrical & Electronics Engineering</span>
                    </li>
                  </ul>
                </ModernCardBody>
              </ModernCard>

              <ModernCard variant="gradient" gradient="from-blue-50 to-purple-100" orangeAccent={true}>
                <ModernCardBody>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Postgraduate Programs</h3>
                  <p className="text-gray-600 mb-6">2-year Master of Technology (M.Tech) programs</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                      <span>Computer Science Engineering</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                      <span>VLSI Design</span>
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
                      <span>Structural Engineering</span>
                    </li>
                  </ul>
                </ModernCardBody>
              </ModernCard>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Departments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: 'cse', name: 'Computer Science', code: 'CSE', color: 'from-blue-500 to-blue-600' },
                { id: 'ece', name: 'Electronics & Communication', code: 'ECE', color: 'from-purple-500 to-purple-600' },
                { id: 'mech', name: 'Mechanical', code: 'MECH', color: 'from-orange-500 to-orange-600' },
                { id: 'civil', name: 'Civil', code: 'CIVIL', color: 'from-green-500 to-green-600' },
              ].map((dept, index) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link to={`/departments/${dept.id}`}>
                    <ModernCard variant="default" orangeAccent={true} className="h-full">
                      <ModernCardBody className="text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                        <p className="text-sm text-gray-600">{dept.code}</p>
                      </ModernCardBody>
                    </ModernCard>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/departments" className="text-orange-600 hover:text-orange-700 font-semibold">
                View All Departments →
              </Link>
            </div>
          </div>
        </section>

        {/* Academic Calendar */}
        <section id="calendar" className="py-16 bg-gradient-to-br from-orange-50/50 to-blue-50/50">
          <div className="container mx-auto px-4">
            <ModernCard variant="gradient" gradient="from-orange-50 to-blue-100/50" className="max-w-4xl mx-auto" orangeAccent={true}>
              <ModernCardBody>
                <div className="flex items-center mb-6">
                  <Calendar className="h-8 w-8 text-orange-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Academic Calendar 2026-27</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold text-gray-700">Odd Semester Begins</span>
                    <span className="text-gray-600">July 1, 2026</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold text-gray-700">Mid-Term Examinations</span>
                    <span className="text-gray-600">September 15-20, 2026</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold text-gray-700">Odd Semester End</span>
                    <span className="text-gray-600">December 20, 2026</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold text-gray-700">Even Semester Begins</span>
                    <span className="text-gray-600">January 5, 2027</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="font-semibold text-gray-700">Mid-Term Examinations</span>
                    <span className="text-gray-600">March 15-20, 2027</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Even Semester End</span>
                    <span className="text-gray-600">May 30, 2027</span>
                  </div>
                </div>
              </ModernCardBody>
            </ModernCard>
          </div>
        </section>

        {/* Faculty Section */}
        <section id="faculty" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Distinguished Faculty</h2>
              <p className="text-gray-700 mb-6">
                Our faculty members are highly qualified with Ph.D. and Master's degrees from premier institutions. 
                They bring extensive industry and research experience to provide quality education.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <ModernCard variant="gradient" gradient="from-orange-50 to-orange-100" orangeAccent={true}>
                  <ModernCardBody className="text-center">
                    <p className="text-4xl font-bold text-orange-600 mb-2">100+</p>
                    <p className="text-gray-700">Faculty Members</p>
                  </ModernCardBody>
                </ModernCard>
                <ModernCard variant="gradient" gradient="from-blue-50 to-blue-100" orangeAccent={true}>
                  <ModernCardBody className="text-center">
                    <p className="text-4xl font-bold text-blue-600 mb-2">30+</p>
                    <p className="text-gray-700">Ph.D. Holders</p>
                  </ModernCardBody>
                </ModernCard>
                <ModernCard variant="gradient" gradient="from-purple-50 to-purple-100" orangeAccent={true}>
                  <ModernCardBody className="text-center">
                    <p className="text-4xl font-bold text-purple-600 mb-2">15:1</p>
                    <p className="text-gray-700">Student-Faculty Ratio</p>
                  </ModernCardBody>
                </ModernCard>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Academics;

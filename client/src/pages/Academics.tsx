import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { BookOpen, GraduationCap, Calendar, Users } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';

const Academics: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
        <section id="programs" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Academic Programs</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
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
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Postgraduate Programs</h3>
                <p className="text-gray-600 mb-6">2-year Master of Technology (M.Tech) programs</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Computer Science Engineering</span>
                  </li>
                  <li className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                    <span>VLSI Design</span>
                  </li>
                  <li className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Structural Engineering</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Departments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: 'cse', name: 'Computer Science', code: 'CSE' },
                { id: 'ece', name: 'Electronics & Communication', code: 'ECE' },
                { id: 'mech', name: 'Mechanical', code: 'MECH' },
                { id: 'civil', name: 'Civil', code: 'CIVIL' },
              ].map((dept) => (
                <Link 
                  key={dept.id}
                  to={`/departments/${dept.id}`}
                  className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow border-t-4 border-orange-500"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                    <p className="text-sm text-gray-600">{dept.code}</p>
                  </div>
                </Link>
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
        <section id="calendar" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
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
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section id="faculty" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Distinguished Faculty</h2>
              <p className="text-gray-700 mb-6">
                Our faculty members are highly qualified with Ph.D. and Master's degrees from premier institutions. 
                They bring extensive industry and research experience to provide quality education.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-4xl font-bold text-orange-600 mb-2">100+</p>
                  <p className="text-gray-700">Faculty Members</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-4xl font-bold text-orange-600 mb-2">30+</p>
                  <p className="text-gray-700">Ph.D. Holders</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-4xl font-bold text-orange-600 mb-2">15:1</p>
                  <p className="text-gray-700">Student-Faculty Ratio</p>
                </div>
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

import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { BookOpen, GraduationCap, Clock, Users } from 'lucide-react';

const Courses: React.FC = () => {
  const btechPrograms = [
    {
      name: 'Computer Science & Engineering',
      code: 'CSE',
      duration: '4 Years',
      intake: 120,
      description: 'Comprehensive program covering software development, algorithms, AI, and emerging technologies.',
      highlights: ['Artificial Intelligence', 'Machine Learning', 'Cloud Computing', 'Cybersecurity']
    },
    {
      name: 'Electronics & Communication Engineering',
      code: 'ECE',
      duration: '4 Years',
      intake: 60,
      description: 'Focus on electronic devices, communication systems, VLSI, and embedded systems.',
      highlights: ['VLSI Design', 'Embedded Systems', 'Signal Processing', 'Wireless Communication']
    },
    {
      name: 'Mechanical Engineering',
      code: 'MECH',
      duration: '4 Years',
      intake: 60,
      description: 'Traditional engineering discipline covering design, manufacturing, and thermal systems.',
      highlights: ['CAD/CAM', 'Robotics', 'Thermal Engineering', 'Manufacturing Technology']
    },
    {
      name: 'Civil Engineering',
      code: 'CIVIL',
      duration: '4 Years',
      intake: 60,
      description: 'Infrastructure development, structural design, and construction management.',
      highlights: ['Structural Design', 'Transportation Engineering', 'Environmental Engineering', 'Geotechnical Engineering']
    },
    {
      name: 'Electrical & Electronics Engineering',
      code: 'EEE',
      duration: '4 Years',
      intake: 60,
      description: 'Power systems, electrical machines, control systems, and renewable energy.',
      highlights: ['Power Systems', 'Control Systems', 'Renewable Energy', 'Electric Vehicles']
    }
  ];

  const mtechPrograms = [
    {
      name: 'Computer Science & Engineering',
      code: 'M.Tech CSE',
      duration: '2 Years',
      intake: 18,
      specialization: 'Advanced Computing'
    },
    {
      name: 'VLSI Design',
      code: 'M.Tech VLSI',
      duration: '2 Years',
      intake: 18,
      specialization: 'Chip Design & Fabrication'
    },
    {
      name: 'Thermal Engineering',
      code: 'M.Tech Thermal',
      duration: '2 Years',
      intake: 18,
      specialization: 'Heat Transfer & Energy Systems'
    },
    {
      name: 'Structural Engineering',
      code: 'M.Tech Structural',
      duration: '2 Years',
      intake: 18,
      specialization: 'Advanced Structural Analysis'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Courses Offered</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover world-class engineering programs designed to shape tomorrow's innovators
            </p>
          </div>
        </section>

        {/* B.Tech Programs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Undergraduate Programs (B.Tech)</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                4-year Bachelor of Technology programs approved by AICTE and affiliated to JNTUA
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {btechPrograms.map((program, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{program.name}</h3>
                        <p className="text-orange-100">Code: {program.code}</p>
                      </div>
                      <BookOpen className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2 text-orange-600" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 mr-2 text-orange-600" />
                        <span>{program.intake} Seats</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.highlights.map((highlight, idx) => (
                          <span key={idx} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Link 
                      to={`/departments/${program.code.toLowerCase()}`}
                      className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-2 rounded-lg transition-colors"
                    >
                      View Department
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* M.Tech Programs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Postgraduate Programs (M.Tech)</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                2-year Master of Technology programs for advanced specialization
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {mtechPrograms.map((program, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{program.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">{program.specialization}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{program.intake} Seats</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join SRIT?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Take the first step towards a successful engineering career
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/admissions"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link 
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;

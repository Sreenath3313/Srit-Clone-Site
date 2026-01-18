import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { BookOpen, Target, Award, Users } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';

const About: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About SRIT</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Srinivasa Ramanujan Institute of Technology - Excellence in Technical Education Since 1998
            </p>
          </div>
        </section>

        {/* College Overview */}
        <section id="overview" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Srinivasa Ramanujan Institute of Technology (SRIT) was established in 1998 with a vision to provide 
                  quality technical education and create skilled professionals who can contribute to society and industry. 
                  Named after the legendary mathematician Srinivasa Ramanujan, our institution embodies his spirit of 
                  innovation, curiosity, and excellence.
                </p>
                <p>
                  Over the past two decades, SRIT has grown from a small engineering college to a premier technical 
                  institution offering undergraduate and postgraduate programs in various disciplines. Our state-of-the-art 
                  infrastructure, experienced faculty, and industry partnerships ensure that our students receive education 
                  that is both theoretical and practical.
                </p>
                <p>
                  We take pride in our commitment to holistic development, fostering not just academic excellence but also 
                  character building, leadership skills, and social responsibility among our students. Our alumni have gone 
                  on to make significant contributions in leading organizations worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section id="vision" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Vision */}
              <div className="bg-orange-50 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-orange-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To be a globally recognized institution of excellence in technical education, research, and innovation, 
                  producing competent professionals who are ethically grounded and socially responsible.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>Provide quality education with state-of-the-art infrastructure</li>
                  <li>Foster research and innovation in emerging technologies</li>
                  <li>Develop industry-ready professionals through practical training</li>
                  <li>Promote ethical values and social responsibility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Highlights</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">1998</div>
                <div className="text-gray-600">Established</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">A+</div>
                <div className="text-gray-600">NAAC Rating</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">2000+</div>
                <div className="text-gray-600">Students</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
                <div className="text-gray-600">Faculty Members</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                <div className="text-gray-600">Placement Rate</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-gray-600">Acres Campus</div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Rajesh Kumar</h3>
                <p className="text-orange-600 font-medium mb-2">Principal</p>
                <p className="text-gray-600 text-sm">Ph.D. in Computer Science, 25+ years of experience in academia</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Prof. Lakshmi Devi</h3>
                <p className="text-blue-600 font-medium mb-2">Vice Principal (Academics)</p>
                <p className="text-gray-600 text-sm">M.Tech, 20+ years of teaching experience</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Arun Sharma</h3>
                <p className="text-green-600 font-medium mb-2">Dean (Research & Development)</p>
                <p className="text-gray-600 text-sm">Ph.D., 15+ research publications</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accreditations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Accreditations & Approvals</h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Award className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">AICTE</h4>
                <p className="text-sm text-gray-600">Approved by AICTE</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Award className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">NAAC</h4>
                <p className="text-sm text-gray-600">A+ Grade Accredited</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Award className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">NBA</h4>
                <p className="text-sm text-gray-600">NBA Accredited Programs</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Award className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">University</h4>
                <p className="text-sm text-gray-600">Affiliated to State University</p>
              </div>
            </div>
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
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{facility}</span>
                  </div>
                </div>
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

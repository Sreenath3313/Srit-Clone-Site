import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Briefcase, TrendingUp, Users, Award, Building } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';

const Placements: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Placements</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Connecting Talent with Opportunities - Building Successful Careers
            </p>
          </div>
        </section>

        {/* Placement Highlights */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Placement Highlights 2025-26</h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <p className="text-4xl font-bold text-orange-600 mb-2">85%</p>
                <p className="text-gray-700 font-semibold">Placement Rate</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <p className="text-4xl font-bold text-orange-600 mb-2">500+</p>
                <p className="text-gray-700 font-semibold">Students Placed</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Building className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <p className="text-4xl font-bold text-orange-600 mb-2">100+</p>
                <p className="text-gray-700 font-semibold">Companies Visited</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Award className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <p className="text-4xl font-bold text-orange-600 mb-2">₹42 LPA</p>
                <p className="text-gray-700 font-semibold">Highest Package</p>
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Package Distribution</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Highest Package</p>
                    <p className="text-2xl font-bold text-orange-600">₹42 LPA</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Average Package</p>
                    <p className="text-2xl font-bold text-orange-600">₹6.5 LPA</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Median Package</p>
                    <p className="text-2xl font-bold text-orange-600">₹5.2 LPA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Recruiters */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Briefcase className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Our Top Recruiters</h2>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Tech Mahindra', 'HCL',
                  'Capgemini', 'Accenture', 'IBM', 'Amazon', 'Microsoft', 'Google',
                  'Deloitte', 'Oracle', 'SAP', 'Cisco', 'Intel', 'Qualcomm',
                  'Bosch', 'L&T', 'Ashok Leyland', 'Mahindra', 'TATA Motors', 'Hyundai'
                ].map((company) => (
                  <div key={company} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex items-center justify-center">
                    <p className="text-center font-semibold text-gray-700">{company}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Training & Development */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Training & Development</h2>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pre-Placement Training</h3>
                <p className="text-gray-700 mb-4">
                  Comprehensive training program to prepare students for campus placements starting from third year.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Aptitude Training:</strong> Quantitative, Logical, Verbal reasoning</li>
                  <li>• <strong>Technical Training:</strong> Programming, Data Structures, Algorithms</li>
                  <li>• <strong>Soft Skills:</strong> Communication, Presentation, Group Discussion</li>
                  <li>• <strong>Mock Interviews:</strong> Technical and HR rounds practice</li>
                  <li>• <strong>Resume Building:</strong> Professional CV creation guidance</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Partnerships</h3>
                <p className="text-gray-700 mb-4">
                  Strong collaborations with leading companies for internships, projects, and placements.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Industry guest lectures and workshops</li>
                  <li>• Summer internship programs</li>
                  <li>• Live project opportunities</li>
                  <li>• Industry visits and exposure</li>
                  <li>• Hackathons and coding competitions</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Skill Development Programs</h3>
                <p className="text-gray-700 mb-4">
                  Additional certification programs to enhance employability and technical expertise.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Programming language certifications</li>
                  <li>• Cloud computing (AWS, Azure, GCP)</li>
                  <li>• Data Science and AI/ML courses</li>
                  <li>• Web development bootcamps</li>
                  <li>• Cybersecurity training</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Guidance</h3>
                <p className="text-gray-700 mb-4">
                  Dedicated placement cell providing continuous support and guidance throughout the placement process.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• One-on-one career counseling</li>
                  <li>• Higher studies guidance (MS, MBA)</li>
                  <li>• Entrepreneurship support</li>
                  <li>• Alumni mentorship program</li>
                  <li>• Job portal access and notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Placement Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Placement Process</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">1</div>
                  <div className="bg-gray-50 p-6 rounded-lg flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pre-Placement Talk (PPT)</h3>
                    <p className="text-gray-700">Company representatives present their organization, job roles, and selection criteria to students.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">2</div>
                  <div className="bg-gray-50 p-6 rounded-lg flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Online Assessment</h3>
                    <p className="text-gray-700">Aptitude test, technical test, and coding assessment conducted online on campus.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">3</div>
                  <div className="bg-gray-50 p-6 rounded-lg flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Group Discussion</h3>
                    <p className="text-gray-700">Assessment of communication skills, leadership, and teamwork abilities (if applicable).</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">4</div>
                  <div className="bg-gray-50 p-6 rounded-lg flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Interview</h3>
                    <p className="text-gray-700">In-depth evaluation of technical knowledge, problem-solving skills, and project work.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">5</div>
                  <div className="bg-gray-50 p-6 rounded-lg flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">HR Interview</h3>
                    <p className="text-gray-700">Final round focusing on personality, attitude, cultural fit, and salary negotiation.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">6</div>
                  <div className="bg-gray-50 p-6 rounded-lg flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Offer Letter</h3>
                    <p className="text-gray-700">Selected candidates receive offer letters with joining details and package information.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alumni Success Stories */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Alumni Success Stories</h2>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Rajesh Kumar</h3>
                <p className="text-sm text-orange-600 mb-3 text-center">Software Engineer at Google</p>
                <p className="text-gray-700 text-sm text-center">
                  "SRIT provided me with strong fundamentals and excellent placement training that helped me crack interviews at top tech companies."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Priya Sharma</h3>
                <p className="text-sm text-orange-600 mb-3 text-center">Data Scientist at Amazon</p>
                <p className="text-gray-700 text-sm text-center">
                  "The technical training and project exposure at SRIT prepared me well for a career in data science and machine learning."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Anil Reddy</h3>
                <p className="text-sm text-orange-600 mb-3 text-center">Project Manager at TCS</p>
                <p className="text-gray-700 text-sm text-center">
                  "SRIT's holistic approach to education, combining technical and soft skills, has been instrumental in my career growth."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Placement Cell */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">For Recruiters</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Interested in hiring our talented students? Get in touch with our placement cell.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="mailto:placements@srit.ac.in" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                placements@srit.ac.in
              </a>
              <a href="tel:+919515611111" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                +91 951 561 1111
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Placements;

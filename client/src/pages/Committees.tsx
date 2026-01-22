import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Users, Shield, BookOpen, Scale } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const Committees: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Committees</h1>
            <p className="text-base md:text-xl max-w-3xl mx-auto">
              Ensuring Excellence, Safety, and Fair Practices in Education
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-base md:text-lg text-gray-700">
                SRIT has established various committees to ensure smooth functioning of academic activities, 
                maintain discipline, protect student rights, and promote overall well-being of the college community.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Committees */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-orange-600 mr-3 md:mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Academic Committees</h2>
            </div>
            
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Board of Studies (BoS)</h3>
                <p className="text-gray-700 mb-4">
                  The Board of Studies is responsible for designing and updating curriculum, recommending syllabus changes, 
                  and ensuring academic standards are maintained as per university guidelines.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Curriculum development and revision</li>
                      <li>• Academic calendar planning</li>
                      <li>• Assessment and evaluation methods</li>
                      <li>• Quality assurance in teaching</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Members:</h4>
                    <p className="text-sm text-gray-700">HODs of all departments, Senior faculty members, External experts</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Academic Council</h3>
                <p className="text-gray-700 mb-4">
                  The Academic Council oversees all academic matters, approves new programs, monitors teaching-learning processes, 
                  and ensures maintenance of academic standards.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Functions:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Approve new courses and programs</li>
                      <li>• Monitor faculty performance</li>
                      <li>• Review examination processes</li>
                      <li>• Academic policy formulation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Composition:</h4>
                    <p className="text-sm text-gray-700">Principal (Chairman), All HODs, Senior professors, Nominated members</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Examination Committee</h3>
                <p className="text-gray-700 mb-4">
                  Manages all examination-related activities including scheduling, conduct, evaluation, and result processing.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Examination scheduling and timetable preparation</li>
                  <li>• Invigilation duty allocation</li>
                  <li>• Answer sheet evaluation coordination</li>
                  <li>• Result compilation and declaration</li>
                  <li>• Handling revaluation requests</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Disciplinary Committees */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Scale className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Disciplinary Committees</h2>
            </div>
            
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Discipline Committee</h3>
                <p className="text-gray-700 mb-4">
                  Ensures maintenance of discipline among students, addresses behavioral issues, and enforces code of conduct.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Enforce college rules and regulations</li>
                      <li>• Handle indiscipline cases</li>
                      <li>• Recommend corrective actions</li>
                      <li>• Conduct enquiries</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contact:</h4>
                    <p className="text-sm text-gray-700">discipline@srit.ac.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Welfare Committees */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Shield className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Student Welfare & Safety Committees</h2>
            </div>
            
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Anti-Ragging Committee</h3>
                <p className="text-gray-700 mb-4">
                  SRIT maintains a zero-tolerance policy towards ragging. The Anti-Ragging Committee ensures a ragging-free 
                  campus and takes strict action against any such incidents.
                </p>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <p className="text-red-800 font-semibold">🚨 Emergency Helpline: +91 951 561 1111 (24x7)</p>
                  <p className="text-red-700 text-sm mt-1">Email: antiragging@srit.ac.in</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Functions:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Monitor campus for ragging incidents</li>
                      <li>• Receive and investigate complaints</li>
                      <li>• Take disciplinary action</li>
                      <li>• Awareness campaigns</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Report Ragging:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Anonymous complaint box</li>
                      <li>• Email: antiragging@srit.ac.in</li>
                      <li>• Call: +91 951 561 1111</li>
                      <li>• UGC Helpline: 1800-180-5522</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Grievance Redressal Committee</h3>
                <p className="text-gray-700 mb-4">
                  Provides a platform for students and staff to raise concerns and grievances related to academic, 
                  administrative, or personal matters.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Objectives:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Address student complaints promptly</li>
                      <li>• Ensure fair treatment</li>
                      <li>• Mediate conflicts</li>
                      <li>• Suggest corrective measures</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Submit Grievance:</h4>
                    <p className="text-sm text-gray-700">Email: grievances@srit.ac.in</p>
                    <p className="text-sm text-gray-700 mt-2">Drop Box: Available at Admin Block</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Internal Complaints Committee (ICC) - Women Cell</h3>
                <p className="text-gray-700 mb-4">
                  Dedicated committee to address complaints related to sexual harassment and ensure safety of women 
                  students, staff, and faculty on campus.
                </p>
                <div className="bg-pink-50 p-4 rounded-lg mb-4">
                  <p className="text-pink-800 font-semibold">📞 Women Helpline: +91 951 561 1112</p>
                  <p className="text-pink-700 text-sm mt-1">Email: womencell@srit.ac.in</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Functions:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Investigate complaints of sexual harassment</li>
                    <li>• Conduct awareness programs on women's rights</li>
                    <li>• Ensure safe campus environment</li>
                    <li>• Provide counseling support</li>
                    <li>• Recommend preventive measures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">SC/ST Cell</h3>
                <p className="text-gray-700 mb-4">
                  Works to prevent discrimination and harassment of SC/ST students and staff, ensuring their welfare and rights.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Address caste-based discrimination complaints</li>
                  <li>• Ensure implementation of reservation policies</li>
                  <li>• Facilitate scholarship applications</li>
                  <li>• Awareness programs on social equality</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Other Committees */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Users className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Other Important Committees</h2>
            </div>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Placement Cell</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Coordinates campus recruitment, training programs, and career guidance for students.
                </p>
                <p className="text-sm text-orange-600">placements@srit.ac.in</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sports Committee</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Promotes sports activities, organizes tournaments, and manages sports facilities.
                </p>
                <p className="text-sm text-orange-600">sports@srit.ac.in</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Committee</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Organizes cultural events, fests, and extracurricular activities throughout the year.
                </p>
                <p className="text-sm text-orange-600">cultural@srit.ac.in</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Library Committee</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Manages library resources, recommends new books, and oversees digital library services.
                </p>
                <p className="text-sm text-orange-600">library@srit.ac.in</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Infrastructure Committee</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Plans and monitors maintenance of campus infrastructure and facilities.
                </p>
                <p className="text-sm text-orange-600">infrastructure@srit.ac.in</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary hover:border-l-6 hover:translate-x-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Alumni Committee</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Maintains alumni network, organizes reunions, and facilitates alumni-student interaction.
                </p>
                <p className="text-sm text-orange-600">alumni@srit.ac.in</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our committees are here to help. Don't hesitate to reach out for any concerns or queries.
            </p>
            <a href="/contact" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Committees;

import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Code, Palette, Users } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const StudentChapters: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Student Chapters</h1>
            <p className="text-base md:text-xl max-w-3xl mx-auto">
              Empowering Students through Clubs, Societies, and Technical Communities
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
              <p className="text-base md:text-lg text-gray-700">
                SRIT encourages students to participate in various student chapters and clubs that focus on 
                technical skills, leadership, creativity, and social responsibility. These chapters provide 
                platforms for learning beyond classrooms and networking with peers and professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Clubs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <Code className="h-8 w-8 md:h-10 md:w-10 text-orange-600 mr-3 md:mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Technical Clubs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Coding Club</h3>
                <p className="text-gray-600 mb-4">
                  Focus on competitive programming, algorithm development, and participation in coding competitions like ACM ICPC, CodeChef, and Codeforces.
                </p>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Activities:</p>
                  <ul className="space-y-1">
                    <li>• Weekly coding contests</li>
                    <li>• Algorithm workshops</li>
                    <li>• Hackathons</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Web Development Club</h3>
                <p className="text-gray-600 mb-4">
                  Learn modern web technologies, frameworks, and build real-world projects. Focus on full-stack development and UI/UX design.
                </p>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Activities:</p>
                  <ul className="space-y-1">
                    <li>• Project development</li>
                    <li>• Tech talks</li>
                    <li>• Web design competitions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI & ML Club</h3>
                <p className="text-gray-600 mb-4">
                  Explore artificial intelligence, machine learning, and data science through hands-on projects and competitions.
                </p>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Activities:</p>
                  <ul className="space-y-1">
                    <li>• ML workshops</li>
                    <li>• Kaggle competitions</li>
                    <li>• Research projects</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Robotics Club</h3>
                <p className="text-gray-600 mb-4">
                  Design, build, and program robots. Participate in national and international robotics competitions.
                </p>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Activities:</p>
                  <ul className="space-y-1">
                    <li>• Robot building workshops</li>
                    <li>• Competitions</li>
                    <li>• Arduino projects</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">IoT Club</h3>
                <p className="text-gray-600 mb-4">
                  Work on Internet of Things projects, smart systems, and embedded programming with sensor networks.
                </p>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Activities:</p>
                  <ul className="space-y-1">
                    <li>• IoT projects</li>
                    <li>• Smart home systems</li>
                    <li>• Industry visits</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cybersecurity Club</h3>
                <p className="text-gray-600 mb-4">
                  Learn ethical hacking, network security, and participate in Capture The Flag (CTF) competitions.
                </p>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Activities:</p>
                  <ul className="space-y-1">
                    <li>• CTF competitions</li>
                    <li>• Security workshops</li>
                    <li>• Bug bounty programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Clubs */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <Palette className="h-8 w-8 md:h-10 md:w-10 text-orange-600 mr-3 md:mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Cultural Clubs</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Music Club */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-orange-500 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Music Club</h3>
                  <p className="text-sm text-gray-600">
                    Vocal and instrumental music training, performances at college events, and inter-college competitions.
                  </p>
                </div>
              </div>

              {/* Dance Club */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-orange-500 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Dance Club</h3>
                  <p className="text-sm text-gray-600">
                    Classical and contemporary dance forms, choreography, and stage performances at festivals.
                  </p>
                </div>
              </div>

              {/* Drama Club */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-orange-500 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Drama Club</h3>
                  <p className="text-sm text-gray-600">
                    Theater arts, script writing, acting workshops, and annual drama productions.
                  </p>
                </div>
              </div>

              {/* Art & Photography */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-orange-500 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Art & Photography</h3>
                  <p className="text-sm text-gray-600">
                    Painting, sketching, photography workshops, exhibitions, and visual arts competitions.
                  </p>
                </div>
              </div>

              {/* Literary Club */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-orange-500 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Literary Club</h3>
                  <p className="text-sm text-gray-600">
                    Creative writing, poetry, debates, quiz competitions, and literary magazine publication.
                  </p>
                </div>
              </div>

              {/* Film Club */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-orange-500 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Film Club</h3>
                  <p className="text-sm text-gray-600">
                    Film appreciation, short film making, video editing, and film festival screenings.
                  </p>
                </div>
              </div>

              {/* Fashion Club */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-orange-500 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Fashion Club</h3>
                  <p className="text-sm text-gray-600">
                    Fashion designing, styling, ramp walks, and fashion show organization.
                  </p>
                </div>
              </div>

              {/* Cultural Committee */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-orange-500 overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Cultural Committee</h3>
                  <p className="text-sm text-gray-600">
                    Overall cultural event management, fest organization, and talent coordination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Societies */}
        <section className="py-12 md:py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <Users className="h-8 w-8 md:h-10 md:w-10 text-orange-600 mr-3 md:mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Professional Societies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">IEEE Student Branch</h3>
                <p className="text-gray-600 mb-4">
                  SRIT has an active IEEE student branch that organizes technical workshops, seminars, 
                  and provides networking opportunities with IEEE professionals worldwide.
                </p>
                <p className="text-sm text-orange-600 font-semibold">200+ Members</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">CSI Student Chapter</h3>
                <p className="text-gray-600 mb-4">
                  Computer Society of India chapter conducts coding competitions, workshops on emerging 
                  technologies, and guest lectures by industry experts.
                </p>
                <p className="text-sm text-orange-600 font-semibold">150+ Members</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">ISTE Chapter</h3>
                <p className="text-gray-600 mb-4">
                  Indian Society for Technical Education chapter focuses on bridging the gap between 
                  academia and industry through workshops and industrial visits.
                </p>
                <p className="text-sm text-orange-600 font-semibold">100+ Members</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">SAE Chapter</h3>
                <p className="text-gray-600 mb-4">
                  Society of Automotive Engineers chapter for students interested in automotive engineering, 
                  with focus on vehicle design and BAJA competitions.
                </p>
                <p className="text-sm text-orange-600 font-semibold">80+ Members</p>
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-12 md:py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join a Chapter Today!</h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
              Explore your interests, develop new skills, and be part of a vibrant community
            </p>
            <button className="bg-white text-orange-600 px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
              Get Involved
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StudentChapters;

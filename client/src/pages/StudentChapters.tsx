import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Code, Palette, Trophy, Users } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';

const StudentChapters: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Chapters</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Empowering Students through Clubs, Societies, and Technical Communities
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-lg text-gray-700">
                SRIT encourages students to participate in various student chapters and clubs that focus on 
                technical skills, leadership, creativity, and social responsibility. These chapters provide 
                platforms for learning beyond classrooms and networking with peers and professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Clubs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Code className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Technical Clubs</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Palette className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Cultural Clubs</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Music Club</h3>
                <p className="text-sm text-gray-600">
                  Vocal and instrumental music training, performances at college events, and inter-college competitions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Dance Club</h3>
                <p className="text-sm text-gray-600">
                  Classical and contemporary dance forms, choreography, and stage performances at festivals.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Drama Club</h3>
                <p className="text-sm text-gray-600">
                  Theater arts, script writing, acting workshops, and annual drama productions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Art & Photography</h3>
                <p className="text-sm text-gray-600">
                  Painting, sketching, photography workshops, exhibitions, and visual arts competitions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Literary Club</h3>
                <p className="text-sm text-gray-600">
                  Creative writing, poetry, debates, quiz competitions, and literary magazine publication.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Film Club</h3>
                <p className="text-sm text-gray-600">
                  Film appreciation, short film making, video editing, and film festival screenings.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Fashion Club</h3>
                <p className="text-sm text-gray-600">
                  Fashion designing, styling, ramp walks, and fashion show organization.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Cultural Committee</h3>
                <p className="text-sm text-gray-600">
                  Overall cultural event management, fest organization, and talent coordination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sports Clubs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Trophy className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Sports Clubs</h2>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {['Cricket', 'Football', 'Basketball', 'Volleyball', 'Badminton', 'Table Tennis', 'Chess', 'Athletics', 'Kabaddi', 'Yoga'].map((sport) => (
                <div key={sport} className="bg-gray-50 p-4 rounded-lg shadow text-center">
                  <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900">{sport}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Societies */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Users className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Professional Societies</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join a Chapter Today!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explore your interests, develop new skills, and be part of a vibrant community
            </p>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
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

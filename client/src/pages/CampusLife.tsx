import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Building2, Utensils, Dumbbell, Music, BookOpen, Home } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { OrangeBorder } from '@/components/common/OrangeBorder';

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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">World-Class Facilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hostel */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
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
              </div>

              {/* Library */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
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
              </div>

              {/* Sports */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
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
              </div>

              {/* Canteen */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
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
              </div>

              {/* Auditorium */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
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
              </div>

              {/* Infrastructure */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
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
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Activities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Cultural Activities</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 mb-8 text-center">
                SRIT hosts numerous cultural events throughout the year, providing students with platforms to showcase their talents.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Annual Fest - TECHNOVISION</h3>
                  <p className="text-gray-700">
                    Our flagship technical and cultural festival featuring competitions, workshops, exhibitions, 
                    guest lectures, and entertainment events spanning multiple days.
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Programs</h3>
                  <p className="text-gray-700">
                    Regular cultural activities including dance, music, drama, and art competitions. 
                    Students participate in inter-college competitions and win accolades.
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Technical Events</h3>
                  <p className="text-gray-700">
                    Hackathons, coding competitions, project exhibitions, paper presentations, 
                    and guest lectures by industry experts.
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Sports Events</h3>
                  <p className="text-gray-700">
                    Annual sports meet, inter-department tournaments, and participation in 
                    university-level competitions in various sports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Life Stats */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Campus by Numbers</h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl font-bold text-orange-600 mb-2">30+</p>
                <p className="text-gray-700">Acres Campus</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl font-bold text-orange-600 mb-2">2000+</p>
                <p className="text-gray-700">Students</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl font-bold text-orange-600 mb-2">20+</p>
                <p className="text-gray-700">Student Clubs</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-4xl font-bold text-orange-600 mb-2">50+</p>
                <p className="text-gray-700">Events Annually</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CampusLife;

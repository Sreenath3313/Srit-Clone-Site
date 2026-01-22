import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Heart, Users, TreePine, GraduationCap, Droplet, Book } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const CommunityServices: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Making a Difference Through Social Responsibility and Community Engagement
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700">
                At SRIT, we believe in giving back to society and fostering a sense of social responsibility among our students. 
                Through various community service programs, we encourage students to contribute to nation-building and social welfare.
              </p>
            </div>
          </div>
        </section>

        {/* NSS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <Users className="h-12 w-12 text-orange-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">National Service Scheme (NSS)</h2>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg mb-8">
                <p className="text-gray-700 mb-6">
                  SRIT has an active NSS unit with over 200 volunteers who participate in various social service activities 
                  throughout the year. Our NSS volunteers work towards community development, environmental conservation, 
                  and social awareness.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Activities</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Village Adoption:</strong> Regular visits to adopted villages for development work</li>
                      <li>• <strong>Health Camps:</strong> Free medical checkups and health awareness programs</li>
                      <li>• <strong>Literacy Drives:</strong> Teaching adults and organizing awareness campaigns</li>
                      <li>• <strong>Blood Donation:</strong> Regular blood donation camps</li>
                      <li>• <strong>Tree Plantation:</strong> Environmental conservation initiatives</li>
                      <li>• <strong>Swachh Bharat:</strong> Cleanliness and sanitation drives</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Annual Programs</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li>
                        <strong className="block text-orange-600">7-Day NSS Camp</strong>
                        <span className="text-sm">Intensive community service camp in rural areas</span>
                      </li>
                      <li>
                        <strong className="block text-orange-600">Republic Day Celebrations</strong>
                        <span className="text-sm">Organizing cultural programs and parades</span>
                      </li>
                      <li>
                        <strong className="block text-orange-600">Youth Day</strong>
                        <span className="text-sm">Workshops and awareness programs</span>
                      </li>
                      <li>
                        <strong className="block text-orange-600">AIDS Awareness</strong>
                        <span className="text-sm">Educational campaigns on World AIDS Day</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Join NSS Unit</h3>
                    <p className="text-gray-700">Become a volunteer and make a difference in society</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">Contact: nss@srit.ac.in</p>
                    <p className="text-2xl font-bold text-orange-600">200+ Volunteers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NCC */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <GraduationCap className="h-12 w-12 text-orange-600 mr-4" />
                <h2 className="text-3xl font-bold text-gray-900">National Cadet Corps (NCC)</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <p className="text-gray-700 mb-6">
                  The NCC unit at SRIT develops qualities of character, discipline, leadership, and spirit of adventure 
                  among the youth. Our cadets participate in various training programs and national events.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Training Programs</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Drill and weapon training</li>
                      <li>• Physical fitness programs</li>
                      <li>• Map reading and navigation</li>
                      <li>• First aid and disaster management</li>
                      <li>• Leadership development camps</li>
                      <li>• Adventure activities (trekking, camping)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Participation & Camps</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Annual Training Camps (ATC)</li>
                      <li>• Combined Annual Training Camps (CATC)</li>
                      <li>• Republic Day Parade participation</li>
                      <li>• Youth Exchange Programs</li>
                      <li>• National Integration Camps</li>
                      <li>• Sports and cultural events</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Join NCC</h3>
                    <p className="text-gray-700">Build character, discipline, and leadership skills</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">Contact: ncc@srit.ac.in</p>
                    <p className="text-2xl font-bold text-orange-600">150+ Cadets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Initiatives */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Social Initiatives</h2>
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Environmental Conservation */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <TreePine className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Green Campus Initiative</h3>
                <p className="text-gray-700 mb-4">
                  Creating an eco-friendly campus through tree plantation drives, waste management, and renewable energy adoption.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 5000+ trees planted</li>
                  <li>• Plastic-free campus</li>
                  <li>• Solar power utilization</li>
                  <li>• Rainwater harvesting</li>
                </ul>
              </div>

              {/* Health & Wellness */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Health Awareness Programs</h3>
                <p className="text-gray-700 mb-4">
                  Regular health camps and awareness programs for students and surrounding communities.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Free health checkup camps</li>
                  <li>• COVID-19 vaccination drives</li>
                  <li>• Mental health counseling</li>
                  <li>• Yoga and wellness sessions</li>
                </ul>
              </div>

              {/* Blood Donation */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Droplet className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Blood Donation Camps</h3>
                <p className="text-gray-700 mb-4">
                  Regular blood donation drives in collaboration with local hospitals and blood banks.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Quarterly blood donation camps</li>
                  <li>• 500+ units donated annually</li>
                  <li>• Voluntary donor registration</li>
                  <li>• Emergency blood assistance</li>
                </ul>
              </div>

              {/* Rural Development */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Village Adoption Program</h3>
                <p className="text-gray-700 mb-4">
                  Adopted villages for comprehensive development through education, health, and infrastructure support.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Education and literacy programs</li>
                  <li>• Skill development training</li>
                  <li>• Infrastructure improvement</li>
                  <li>• Agricultural guidance</li>
                </ul>
              </div>

              {/* Digital Literacy */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Book className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Literacy Drive</h3>
                <p className="text-gray-700 mb-4">
                  Teaching computer basics and digital skills to underprivileged communities.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Computer training for villagers</li>
                  <li>• Digital payment awareness</li>
                  <li>• Online services guidance</li>
                  <li>• E-governance support</li>
                </ul>
              </div>

              {/* Women Empowerment */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Women Empowerment</h3>
                <p className="text-gray-700 mb-4">
                  Programs focused on education, skill development, and awareness for women in rural areas.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Self-help group formation</li>
                  <li>• Vocational training</li>
                  <li>• Legal rights awareness</li>
                  <li>• Health and hygiene education</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">10+</p>
                <p className="text-lg">Villages Adopted</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">5000+</p>
                <p className="text-lg">People Benefited</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">100+</p>
                <p className="text-lg">Health Camps</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">350+</p>
                <p className="text-lg">Active Volunteers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Involved</h2>
              <p className="text-lg text-gray-700 mb-8">
                Join us in making a positive impact on society. Every contribution, big or small, makes a difference.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Volunteer</h3>
                  <p className="text-gray-700 mb-4">Join NSS or NCC units and participate in community service activities.</p>
                  <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Register Now
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Donate</h3>
                  <p className="text-gray-700 mb-4">Support our initiatives through donations and sponsorships.</p>
                  <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Contribute
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Partner</h3>
                  <p className="text-gray-700 mb-4">Collaborate with us for corporate social responsibility programs.</p>
                  <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Contact Us
                  </button>
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

export default CommunityServices;

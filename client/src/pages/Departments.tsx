import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Monitor, Cpu, Cog, Building2, ArrowRight } from 'lucide-react';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const departments = [
  {
    id: 'cse',
    name: 'Computer Science Engineering',
    code: 'CSE',
    icon: Monitor,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    description: 'Leading the way in software development, artificial intelligence, and cutting-edge computing technologies.',
    highlights: [
      'Software Development',
      'Artificial Intelligence & Machine Learning',
      'Data Science & Big Data',
      'Cloud Computing',
      'Cyber Security',
      'Web & Mobile Development',
    ],
    labs: 'Programming Labs, AI/ML Labs, Cloud Computing Lab, Cyber Security Lab',
    placements: 'Top recruiters: Google, Microsoft, Amazon, TCS, Infosys, Wipro',
  },
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering',
    code: 'ECE',
    icon: Cpu,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    description: 'Pioneering innovations in electronics, telecommunications, and embedded systems for the digital age.',
    highlights: [
      'Digital Electronics',
      'VLSI Design',
      'Communication Systems',
      'Embedded Systems',
      'Signal Processing',
      'IoT & Wireless Technologies',
    ],
    labs: 'Digital Electronics Lab, Communication Lab, VLSI Lab, Microprocessor Lab',
    placements: 'Top recruiters: Qualcomm, Intel, Samsung, Broadcom, Texas Instruments',
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    code: 'MECH',
    icon: Cog,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    description: 'Mastering the principles of design, manufacturing, and thermal systems for industrial excellence.',
    highlights: [
      'Thermodynamics',
      'Manufacturing Technology',
      'Automobile Engineering',
      'CAD/CAM',
      'Robotics & Automation',
      'Fluid Mechanics',
    ],
    labs: 'Manufacturing Lab, CAD/CAM Lab, Thermal Lab, Automobile Workshop',
    placements: 'Top recruiters: L&T, Tata Motors, Mahindra, Ashok Leyland, Bosch',
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    code: 'CIVIL',
    icon: Building2,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    description: 'Building the infrastructure of tomorrow with expertise in construction, design, and environmental engineering.',
    highlights: [
      'Structural Engineering',
      'Concrete Technology',
      'Transportation Engineering',
      'Environmental Engineering',
      'Geotechnical Engineering',
      'Water Resources',
    ],
    labs: 'Structural Analysis Lab, Surveying Lab, Concrete Testing Lab, CAD Lab',
    placements: 'Top recruiters: L&T Construction, Larsen & Toubro, Shapoorji Pallonji, NCC',
  },
];

const Departments: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Departments</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our world-class engineering programs designed to shape future industry leaders
            </p>
          </div>
        </section>

        {/* Departments Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Excellence Across Disciplines</h2>
              <p className="text-gray-600 leading-relaxed">
                SRIT offers undergraduate and postgraduate programs in four core engineering disciplines. 
                Each department is equipped with state-of-the-art laboratories, experienced faculty, and 
                strong industry connections to ensure comprehensive learning.
              </p>
            </div>

            {/* Department Cards */}
            <div className="space-y-16">
              {departments.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <div
                    key={dept.id}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } lg:flex`}
                  >
                    {/* Icon & Title Section */}
                    <div className={`bg-gradient-to-br ${dept.color} p-8 lg:p-12 text-white lg:w-2/5 flex flex-col justify-center`}>
                      <Icon className="h-16 w-16 mb-4" />
                      <h3 className="text-3xl font-bold mb-2">{dept.name}</h3>
                      <p className="text-lg opacity-90 mb-4">{dept.code}</p>
                      <p className="text-white/90 leading-relaxed">{dept.description}</p>
                    </div>

                    {/* Details Section */}
                    <div className="p-8 lg:p-12 lg:w-3/5">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Core Areas</h4>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {dept.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-center text-gray-700">
                            <div className={`w-2 h-2 ${dept.bgColor} rounded-full mr-2`}></div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-lg font-bold text-gray-900 mb-2">Laboratories</h4>
                      <p className="text-gray-600 mb-4">{dept.labs}</p>

                      <h4 className="text-lg font-bold text-gray-900 mb-2">Placements</h4>
                      <p className="text-gray-600 mb-6">{dept.placements}</p>

                      <Link
                        to={`/departments/${dept.id}`}
                        className={`inline-flex items-center ${dept.textColor} font-semibold hover:underline`}
                      >
                        Learn More <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose SRIT</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">01</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Faculty</h3>
                <p className="text-gray-600">
                  Learn from experienced professors and industry experts with years of practical knowledge
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">02</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Infrastructure</h3>
                <p className="text-gray-600">
                  State-of-the-art labs, libraries, and facilities equipped with latest technology
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">03</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Connect</h3>
                <p className="text-gray-600">
                  Strong partnerships with leading companies ensuring excellent placement opportunities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join SRIT and become part of a community of innovators, thinkers, and future leaders
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/admissions"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors border-2 border-white"
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

export default Departments;

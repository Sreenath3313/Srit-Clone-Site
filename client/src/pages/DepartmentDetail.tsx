import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Monitor, Cpu, Cog, Building2, ArrowLeft, Users, BookOpen, Award, LucideIcon } from 'lucide-react';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import { ModernCard, ModernCardBody } from '@/components/common/ModernCard';
import { motion } from 'framer-motion';

interface FacultyMember {
  name: string;
  designation: string;
  specialization: string;
}

interface PlacementInfo {
  rate: string;
  avgPackage: string;
  highestPackage: string;
  companies: string[];
}

interface DepartmentInfo {
  name: string;
  code: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
  vision: string;
  mission: string[];
  programs: string[];
  courses: string[];
  labs: string[];
  faculty: FacultyMember[];
  placements: PlacementInfo;
  research: string[];
}

const departmentData: Record<string, DepartmentInfo> = {
  cse: {
    name: 'Computer Science Engineering',
    code: 'CSE',
    icon: Monitor,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    description: 'The Department of Computer Science Engineering at SRIT is dedicated to producing skilled software engineers and computer scientists who can drive innovation in the digital age. Our curriculum combines theoretical foundations with hands-on practical experience.',
    vision: 'To be a center of excellence in computer science education and research, producing globally competent professionals.',
    mission: [
      'Provide quality education in computer science and engineering',
      'Foster research and innovation in emerging technologies',
      'Develop industry-ready professionals through practical training',
      'Promote ethical computing practices and social responsibility',
    ],
    programs: [
      'B.Tech in Computer Science Engineering (4 years)',
      'M.Tech in Computer Science Engineering (2 years)',
      'Ph.D. in Computer Science',
    ],
    courses: [
      'Programming in C/C++/Java',
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
      'Machine Learning',
      'Artificial Intelligence',
      'Cloud Computing',
      'Cyber Security',
      'Web Technologies',
      'Mobile Application Development',
    ],
    labs: [
      'Programming Languages Lab',
      'Data Structures Lab',
      'Database Management Lab',
      'Computer Networks Lab',
      'AI & Machine Learning Lab',
      'Cloud Computing Lab',
      'Cyber Security Lab',
      'Web Development Lab',
    ],
    faculty: [
      { name: 'Prof. Lakshmi Devi', designation: 'Head of Department', specialization: 'Machine Learning, AI' },
      { name: 'Dr. Rajesh Kumar', designation: 'Professor', specialization: 'Data Structures, Algorithms' },
      { name: 'Dr. Kiran Kumar', designation: 'Associate Professor', specialization: 'Computer Networks, IoT' },
      { name: 'Dr. Vijay Singh', designation: 'Assistant Professor', specialization: 'Operating Systems, Cloud Computing' },
    ],
    placements: {
      rate: '95%',
      avgPackage: '₹6.5 LPA',
      highestPackage: '₹24 LPA',
      companies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant'],
    },
    research: [
      'Machine Learning and Deep Learning',
      'Internet of Things (IoT)',
      'Cloud Computing and Big Data',
      'Cyber Security and Cryptography',
      'Natural Language Processing',
      'Computer Vision',
    ],
  },
  ece: {
    name: 'Electronics & Communication Engineering',
    code: 'ECE',
    icon: Cpu,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    description: 'The Department of Electronics & Communication Engineering focuses on educating students in the design and development of electronic devices, circuits, and communication systems. Our graduates are equipped to work in telecommunications, embedded systems, and VLSI design.',
    vision: 'To be a leading department in electronics and communication engineering, fostering innovation and excellence.',
    mission: [
      'Provide comprehensive education in electronics and communication',
      'Encourage research in emerging areas of electronics',
      'Develop strong industry partnerships for student training',
      'Promote entrepreneurship and innovation',
    ],
    programs: [
      'B.Tech in Electronics & Communication Engineering (4 years)',
      'M.Tech in VLSI Design (2 years)',
      'M.Tech in Communication Systems (2 years)',
    ],
    courses: [
      'Analog & Digital Electronics',
      'Electronic Circuits',
      'Signals & Systems',
      'Communication Systems',
      'Microprocessors & Microcontrollers',
      'VLSI Design',
      'Embedded Systems',
      'Digital Signal Processing',
      'Wireless Communication',
      'Optical Communication',
      'Control Systems',
      'RF & Microwave Engineering',
    ],
    labs: [
      'Digital Electronics Lab',
      'Analog Circuits Lab',
      'Communication Systems Lab',
      'Microprocessor Lab',
      'VLSI Design Lab',
      'Embedded Systems Lab',
      'Signal Processing Lab',
    ],
    faculty: [
      { name: 'Prof. Arun Sharma', designation: 'Head of Department', specialization: 'VLSI Design, Digital Electronics' },
      { name: 'Prof. Meera Joshi', designation: 'Professor', specialization: 'Communication Systems, Signal Processing' },
      { name: 'Dr. Anita Verma', designation: 'Associate Professor', specialization: 'Embedded Systems, IoT' },
    ],
    placements: {
      rate: '92%',
      avgPackage: '₹5.8 LPA',
      highestPackage: '₹18 LPA',
      companies: ['Qualcomm', 'Intel', 'Samsung', 'Broadcom', 'Texas Instruments', 'MediaTek', 'Nokia', 'Bosch'],
    },
    research: [
      'VLSI Design and Testing',
      'Wireless Sensor Networks',
      'Embedded Systems and IoT',
      '5G Communication Systems',
      'Optical Communication',
      'Signal and Image Processing',
    ],
  },
  mech: {
    name: 'Mechanical Engineering',
    code: 'MECH',
    icon: Cog,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    description: 'The Department of Mechanical Engineering provides a strong foundation in core mechanical engineering principles including thermodynamics, manufacturing, and design. Our students gain hands-on experience through modern laboratories and industry internships.',
    vision: 'To excel in mechanical engineering education and research, producing innovative engineers for industry.',
    mission: [
      'Deliver quality education in mechanical engineering fundamentals',
      'Foster practical skills through hands-on laboratory training',
      'Encourage innovation in design and manufacturing',
      'Build strong industry connections for placements',
    ],
    programs: [
      'B.Tech in Mechanical Engineering (4 years)',
      'M.Tech in Thermal Engineering (2 years)',
      'M.Tech in Production Engineering (2 years)',
    ],
    courses: [
      'Engineering Mechanics',
      'Thermodynamics',
      'Fluid Mechanics',
      'Manufacturing Technology',
      'Machine Design',
      'Heat Transfer',
      'Automobile Engineering',
      'CAD/CAM',
      'Robotics & Automation',
      'Industrial Engineering',
      'Finite Element Analysis',
      'Renewable Energy Systems',
    ],
    labs: [
      'Manufacturing Workshop',
      'CAD/CAM Lab',
      'Thermal Engineering Lab',
      'Fluid Mechanics Lab',
      'Automobile Engineering Lab',
      'Metrology Lab',
      'Dynamics Lab',
    ],
    faculty: [
      { name: 'Dr. Priya Reddy', designation: 'Head of Department', specialization: 'Thermodynamics, Heat Transfer' },
      { name: 'Prof. Anita Desai', designation: 'Professor', specialization: 'Fluid Mechanics, CFD' },
      { name: 'Dr. Ravi Kumar', designation: 'Associate Professor', specialization: 'Manufacturing, Robotics' },
    ],
    placements: {
      rate: '90%',
      avgPackage: '₹5.2 LPA',
      highestPackage: '₹15 LPA',
      companies: ['L&T', 'Tata Motors', 'Mahindra', 'Ashok Leyland', 'Bosch', 'Cummins', 'Caterpillar', 'Hyundai'],
    },
    research: [
      'Advanced Manufacturing Techniques',
      'Renewable Energy Systems',
      'Computational Fluid Dynamics',
      'Robotics and Automation',
      'Composite Materials',
      'Additive Manufacturing (3D Printing)',
    ],
  },
  civil: {
    name: 'Civil Engineering',
    code: 'CIVIL',
    icon: Building2,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    description: 'The Department of Civil Engineering prepares students for careers in construction, infrastructure development, and environmental engineering. Our curriculum emphasizes sustainable design practices and modern construction technologies.',
    vision: 'To be a premier department in civil engineering, creating engineers who build a sustainable future.',
    mission: [
      'Provide comprehensive education in civil engineering',
      'Promote sustainable and eco-friendly construction practices',
      'Develop expertise in structural and environmental engineering',
      'Foster research in infrastructure development',
    ],
    programs: [
      'B.Tech in Civil Engineering (4 years)',
      'M.Tech in Structural Engineering (2 years)',
      'M.Tech in Environmental Engineering (2 years)',
    ],
    courses: [
      'Engineering Mechanics',
      'Strength of Materials',
      'Structural Analysis',
      'Concrete Technology',
      'Geotechnical Engineering',
      'Transportation Engineering',
      'Water Resources Engineering',
      'Environmental Engineering',
      'Construction Management',
      'Building Design',
      'Surveying',
      'Town Planning',
    ],
    labs: [
      'Structural Analysis Lab',
      'Concrete Testing Lab',
      'Surveying Lab',
      'Geotechnical Engineering Lab',
      'Environmental Engineering Lab',
      'CAD Lab for Civil Engineering',
      'Highway Engineering Lab',
    ],
    faculty: [
      { name: 'Prof. Sneha Patel', designation: 'Head of Department', specialization: 'Structural Analysis, Design' },
      { name: 'Dr. Rahul Verma', designation: 'Professor', specialization: 'Concrete Technology, Materials' },
      { name: 'Dr. Deepika Sharma', designation: 'Associate Professor', specialization: 'Environmental Engineering' },
    ],
    placements: {
      rate: '88%',
      avgPackage: '₹4.8 LPA',
      highestPackage: '₹12 LPA',
      companies: ['L&T Construction', 'Larsen & Toubro', 'Shapoorji Pallonji', 'NCC', 'Tata Projects', 'GMR', 'NBCC', 'PWD'],
    },
    research: [
      'Sustainable Construction Materials',
      'Structural Health Monitoring',
      'Earthquake Engineering',
      'Water Resource Management',
      'Waste Management and Recycling',
      'Green Building Technologies',
    ],
  },
};

const DepartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dept = id ? departmentData[id] : null;

  if (!dept) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Department Not Found</h1>
            <Link to="/departments" className="text-orange-600 hover:underline">
              Back to Departments
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          {/* Background Image with Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${dept.color}`}>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 text-white">
            <Link to="/departments" className="inline-flex items-center text-white/90 hover:text-white mb-4 md:mb-6 text-sm md:text-base">
              <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Back to Departments
            </Link>
            <div className="flex items-center mb-4">
              <Icon className="h-12 w-12 md:h-16 md:w-16 mr-3 md:mr-4" />
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{dept.name}</h1>
                <p className="text-lg md:text-xl mt-2">{dept.code}</p>
              </div>
            </div>
            <p className="text-sm md:text-base lg:text-lg max-w-3xl mt-4 md:mt-6">{dept.description}</p>
          </div>
        </section>

        {/* Vision & Mission - Redesigned with Modern Cards */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ModernCard variant="gradient" gradient="from-orange-50 to-orange-100" orangeAccent={true} className="h-full">
                  <ModernCardBody>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{dept.vision}</p>
                  </ModernCardBody>
                </ModernCard>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ModernCard variant="gradient" gradient="from-blue-50 to-purple-100" orangeAccent={true} className="h-full">
                  <ModernCardBody>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                    </div>
                    <ul className="space-y-2">
                      {dept.mission.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start text-gray-700"
                        >
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2"></div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </ModernCardBody>
                </ModernCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Programs Offered */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Programs Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
              {dept.programs.map((program, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  <BookOpen className="h-8 w-8 text-orange-600 mb-3" />
                  <p className="text-gray-800 font-medium">{program}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Key Courses</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
              {dept.courses.map((course, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <p className="text-gray-700 text-sm">{course}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Laboratories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Laboratories & Facilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {dept.labs.map((lab, index) => (
                <div key={index} className={`${dept.bgColor} p-6 rounded-lg`}>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-600 rounded-full mr-3"></div>
                    <span className="text-gray-800 font-medium">{lab}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Faculty Members</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {dept.faculty.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${dept.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-sm text-orange-600 font-medium mb-2">{member.designation}</p>
                  <p className="text-xs text-gray-600">{member.specialization}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Placements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Placement Highlights</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-orange-50 p-6 rounded-lg text-center">
                  <Award className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-orange-600 mb-2">{dept.placements.rate}</div>
                  <div className="text-gray-600">Placement Rate</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">{dept.placements.avgPackage}</div>
                  <div className="text-gray-600">Average Package</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600 mb-2">{dept.placements.highestPackage}</div>
                  <div className="text-gray-600">Highest Package</div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-4">Top Recruiters</h4>
                <div className="flex flex-wrap gap-3">
                  {dept.placements.companies.map((company, index) => (
                    <span key={index} className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 border border-gray-200">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Research Areas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {dept.research.map((area, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                    <span className="text-gray-800">{area}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`py-12 md:py-16 bg-gradient-to-r ${dept.color} text-white`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Joining {dept.code}?</h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
              Take the first step towards an exciting career in {dept.name}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
              <Link
                to="/admissions"
                className="bg-white text-gray-900 px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px] inline-flex items-center justify-center"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="bg-white/20 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border-2 border-white min-h-[44px] inline-flex items-center justify-center"
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

export default DepartmentDetail;

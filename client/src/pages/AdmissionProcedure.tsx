import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { CheckCircle, FileText, Upload, CreditCard, ClipboardList, Calendar, Award, UserCheck } from 'lucide-react';

// Configuration
const CURRENT_ACADEMIC_YEAR = '2026-27';

const AdmissionProcedure: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'Fill Application Form',
      icon: <FileText className="h-8 w-8" />,
      description: 'Visit our official website and complete the online application form with accurate personal and academic details.',
      details: [
        'Provide valid email and mobile number',
        'Fill educational qualifications',
        'Select program preference',
        'Choose exam center (if applicable)'
      ]
    },
    {
      step: 2,
      title: 'Upload Documents',
      icon: <Upload className="h-8 w-8" />,
      description: 'Upload scanned copies of all required documents in the specified format (PDF/JPEG, max 2MB each).',
      details: [
        '10th & 12th mark sheets',
        'Transfer certificate',
        'Caste certificate (if applicable)',
        'Passport size photograph',
        'Signature scan'
      ]
    },
    {
      step: 3,
      title: 'Pay Application Fee',
      icon: <CreditCard className="h-8 w-8" />,
      description: 'Pay the non-refundable application fee through secure online payment gateway.',
      details: [
        'Application Fee: ₹1,000',
        'Payment modes: Credit/Debit Card, Net Banking, UPI',
        'Download payment receipt',
        'Note application number for future reference'
      ]
    },
    {
      step: 4,
      title: 'Appear for Entrance Exam',
      icon: <ClipboardList className="h-8 w-8" />,
      description: 'Take the entrance examination or submit valid JEE Main/GATE scores as per program requirements.',
      details: [
        'Download hall ticket',
        'Check exam center and timing',
        'Carry valid ID proof',
        'Results announced within 7 days'
      ]
    },
    {
      step: 5,
      title: 'Check Merit List',
      icon: <Award className="h-8 w-8" />,
      description: 'Check if your name appears in the merit list published on the official website.',
      details: [
        'Merit list based on entrance exam scores',
        'Category-wise cutoff marks',
        'Check counseling schedule',
        'Download provisional allotment letter'
      ]
    },
    {
      step: 6,
      title: 'Attend Counseling',
      icon: <Calendar className="h-8 w-8" />,
      description: 'Participate in the counseling session and choose your branch preference based on rank.',
      details: [
        'Carry all original documents',
        'Choose branch as per availability',
        'Get provisional admission letter',
        'Complete admission formalities'
      ]
    },
    {
      step: 7,
      title: 'Document Verification',
      icon: <UserCheck className="h-8 w-8" />,
      description: 'Submit original documents for verification at the admissions office.',
      details: [
        'Original certificates & mark sheets',
        'Migration certificate',
        'Character certificate',
        'Medical fitness certificate',
        'Income certificate (for fee concession)'
      ]
    },
    {
      step: 8,
      title: 'Fee Payment & Confirmation',
      icon: <CheckCircle className="h-8 w-8" />,
      description: 'Pay the admission fee to confirm your seat and complete the admission process.',
      details: [
        'Pay first-year fee or first semester fee',
        'Collect fee receipt',
        'Get student ID card',
        'Register for orientation program'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission Procedure</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your step-by-step guide to joining SRIT - Simple, transparent, and student-friendly
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Admissions Open for Academic Year {CURRENT_ACADEMIC_YEAR}</h2>
              <p className="text-gray-700 mb-4">
                SRIT follows a merit-based admission process as per AICTE and JNTUA guidelines. 
                We ensure transparency and equal opportunity for all aspiring students.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
                  <p className="text-gray-700">Simple Steps</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-orange-600 mb-2">30</div>
                  <p className="text-gray-700">Days Process</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                  <p className="text-gray-700">Online Process</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Complete Admission Process</h2>
            <div className="max-w-5xl mx-auto space-y-8">
              {steps.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Step Number & Icon */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 md:w-48 flex flex-col items-center justify-center">
                      <div className="text-5xl font-bold mb-4">{item.step}</div>
                      <div className="mb-2">{item.icon}</div>
                      <h3 className="text-lg font-bold text-center">{item.title}</h3>
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-8">
                      <p className="text-gray-700 mb-4 text-lg">{item.description}</p>
                      <div className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Links */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Links</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link to="/courses" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Courses Offered</h3>
                <p className="text-gray-600 text-sm">View all B.Tech & M.Tech programs</p>
              </Link>
              <Link to="/fees-structure" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <CreditCard className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Fee Structure</h3>
                <p className="text-gray-600 text-sm">Check detailed fee breakdown</p>
              </Link>
              <Link to="/scholarships" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Scholarships</h3>
                <p className="text-gray-600 text-sm">Explore scholarship opportunities</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't miss the deadline! Start your application today.
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
                Need Help?
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdmissionProcedure;

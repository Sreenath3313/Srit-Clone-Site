import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Calendar, FileText, IndianRupee, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import { useScrollToHash } from '@/hooks/useScrollToHash';

const Admissions: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join SRIT and embark on a journey of academic excellence and professional growth
            </p>
          </div>
        </section>

        {/* Admissions Open Banner */}
        <section className="py-8 bg-orange-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-orange-600 mr-3" />
              <p className="text-lg font-semibold text-orange-900">
                🎓 Admissions Open for Academic Year 2026-27! Apply before June 30, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Programs Offered */}
        <section id="overview" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Programs Offered</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* UG Programs */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Undergraduate (B.Tech)</h3>
                <p className="text-gray-600 mb-6">4-year Bachelor of Technology programs</p>
                <div className="space-y-4">
                  {[
                    { name: 'Computer Science Engineering', seats: 120 },
                    { name: 'Electronics & Communication Engineering', seats: 60 },
                    { name: 'Mechanical Engineering', seats: 60 },
                    { name: 'Civil Engineering', seats: 60 },
                  ].map((program, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <span className="text-gray-700">{program.name}</span>
                      <span className="text-orange-600 font-semibold">{program.seats} seats</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PG Programs */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Postgraduate (M.Tech)</h3>
                <p className="text-gray-600 mb-6">2-year Master of Technology programs</p>
                <div className="space-y-4">
                  {[
                    { name: 'Computer Science Engineering', seats: 18 },
                    { name: 'VLSI Design', seats: 18 },
                    { name: 'Thermal Engineering', seats: 18 },
                    { name: 'Structural Engineering', seats: 18 },
                  ].map((program, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <span className="text-gray-700">{program.name}</span>
                      <span className="text-orange-600 font-semibold">{program.seats} seats</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section id="eligibility" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Eligibility Criteria</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">For B.Tech Programs</h3>
                <ul className="space-y-3">
                  {[
                    'Pass in 10+2 or equivalent with Physics, Chemistry, and Mathematics',
                    'Minimum 50% aggregate marks (45% for reserved categories)',
                    'Valid score in JEE Main or State Entrance Exam',
                    'Age limit: 17-25 years as on December 31, 2026',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">For M.Tech Programs</h3>
                <ul className="space-y-3">
                  {[
                    'Bachelor\'s degree in Engineering/Technology in relevant discipline',
                    'Minimum 55% aggregate marks (50% for reserved categories)',
                    'Valid GATE score (preferred) or Institute entrance exam',
                    'No age limit',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section id="dates" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Important Dates</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-orange-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Event</th>
                      <th className="px-6 py-4 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { event: 'Application Start Date', date: 'April 1, 2026' },
                      { event: 'Application Last Date', date: 'June 30, 2026' },
                      { event: 'Entrance Exam (if applicable)', date: 'July 15-20, 2026' },
                      { event: 'Merit List Publication', date: 'July 25, 2026' },
                      { event: 'Counseling Dates', date: 'August 1-10, 2026' },
                      { event: 'Document Verification', date: 'August 11-15, 2026' },
                      { event: 'Fee Payment Deadline', date: 'August 20, 2026' },
                      { event: 'Classes Commence', date: 'September 1, 2026' },
                    ].map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 text-gray-700">{item.event}</td>
                        <td className="px-6 py-4 text-orange-600 font-semibold">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section id="fees" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Fee Structure</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">B.Tech Programs (Annual)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Tuition Fee</span>
                    <span className="text-orange-600 font-bold text-lg">₹80,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Development Fee</span>
                    <span className="text-orange-600 font-bold text-lg">₹15,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Library & Lab Fee</span>
                    <span className="text-orange-600 font-bold text-lg">₹10,000</span>
                  </div>
                  <div className="border-t-2 border-orange-300 pt-4 flex justify-between items-center">
                    <span className="text-gray-900 font-bold">Total per Year</span>
                    <span className="text-orange-600 font-bold text-2xl">₹1,05,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">M.Tech Programs (Annual)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Tuition Fee</span>
                    <span className="text-blue-600 font-bold text-lg">₹60,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Development Fee</span>
                    <span className="text-blue-600 font-bold text-lg">₹10,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Library & Lab Fee</span>
                    <span className="text-blue-600 font-bold text-lg">₹8,000</span>
                  </div>
                  <div className="border-t-2 border-blue-300 pt-4 flex justify-between items-center">
                    <span className="text-gray-900 font-bold">Total per Year</span>
                    <span className="text-blue-600 font-bold text-2xl">₹78,000</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto">
              <IndianRupee className="inline h-4 w-4" /> Additional charges may apply for hostel accommodation, 
              transportation, and other facilities. Scholarship opportunities available for meritorious students.
            </p>
          </div>
        </section>

        {/* Admission Process */}
        <section id="how-to-apply" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Admission Process</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {[
                  { step: 1, title: 'Fill Application Form', desc: 'Complete the online application form with accurate details' },
                  { step: 2, title: 'Upload Documents', desc: 'Upload required documents (10+2 marks, ID proof, photos)' },
                  { step: 3, title: 'Pay Application Fee', desc: 'Pay ₹1,000 application fee online' },
                  { step: 4, title: 'Entrance Exam', desc: 'Appear for entrance exam or submit JEE/GATE scores' },
                  { step: 5, title: 'Merit List', desc: 'Check merit list on official website' },
                  { step: 6, title: 'Counseling', desc: 'Attend counseling session and choose branch preference' },
                  { step: 7, title: 'Document Verification', desc: 'Submit original documents for verification' },
                  { step: 8, title: 'Fee Payment', desc: 'Pay admission fee and confirm your seat' },
                ].map((item, index) => (
                  <div key={index} className="flex mb-8 last:mb-0">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {item.step}
                      </div>
                      {index < 7 && (
                        <div className="w-0.5 h-16 bg-orange-300 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div className="ml-6 bg-white p-6 rounded-lg shadow-md flex-grow">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents Required */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Documents Required</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    '10th Marksheet & Certificate',
                    '12th Marksheet & Certificate',
                    'Transfer Certificate',
                    'Migration Certificate',
                    'Character Certificate',
                    'Caste Certificate (if applicable)',
                    'Income Certificate (for fee concession)',
                    'Entrance Exam Scorecard',
                    'Passport Size Photographs (4 copies)',
                    'Aadhar Card',
                    'Domicile Certificate',
                    'Medical Fitness Certificate',
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center">
                      <FileText className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarships */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Scholarships & Financial Aid</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Merit Scholarship</h3>
                <p className="text-gray-600 mb-3">Up to 50% fee waiver</p>
                <p className="text-sm text-gray-500">For students scoring 90%+ in qualifying exam</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Need-Based Aid</h3>
                <p className="text-gray-600 mb-3">Up to 30% fee waiver</p>
                <p className="text-sm text-gray-500">For economically disadvantaged students</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Government Schemes</h3>
                <p className="text-gray-600 mb-3">Various schemes available</p>
                <p className="text-sm text-gray-500">SC/ST/OBC scholarships, state govt. schemes</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Take the first step towards a successful engineering career at SRIT
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <Download className="mr-2 h-5 w-5" />
                Apply Online
              </Link>
              <Link
                to="/contact"
                className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors border-2 border-white"
              >
                Contact Admission Office
              </Link>
            </div>
            <p className="mt-6 text-white/90">
              For queries: admission@srit.ac.in | +91-40-12345678
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admissions;

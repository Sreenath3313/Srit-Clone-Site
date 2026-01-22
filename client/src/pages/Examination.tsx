import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Calendar, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const Examination: React.FC = () => {
  useScrollToHash();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Examination</h1>
            <p className="text-base md:text-xl max-w-3xl mx-auto">
              Transparent and Fair Assessment System
            </p>
          </div>
        </section>

        {/* Examination System Overview */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Examination System</h2>
              <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 text-center">
                SRIT follows a comprehensive evaluation system combining internal assessments and semester-end examinations 
                as per JNTUA regulations. The evaluation is designed to test both theoretical knowledge and practical skills.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-[#FFE5D9] p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Internal Assessment (30 Marks)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Two Mid-Term Examinations (20 marks)</li>
                    <li>• Assignments & Seminars (5 marks)</li>
                    <li>• Attendance (5 marks)</li>
                  </ul>
                </div>
                
                <div className="bg-[#FFE5D9] p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">External Assessment (70 Marks)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Semester End Examination</li>
                    <li>• 3-hour duration</li>
                    <li>• Conducted by JNTUA</li>
                    <li>• Theory & Practical</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examination Schedule */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <Calendar className="h-8 w-8 md:h-10 md:w-10 text-orange-600 mr-3 md:mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Examination Schedule 2026-27</h2>
            </div>
            
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Odd Semester */}
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Odd Semester (I, III, V, VII)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold text-gray-900">Mid-Term I</p>
                      <p className="text-sm text-gray-600">All theory subjects</p>
                    </div>
                    <span className="text-orange-600 font-semibold">August 25-30, 2026</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold text-gray-900">Mid-Term II</p>
                      <p className="text-sm text-gray-600">All theory subjects</p>
                    </div>
                    <span className="text-orange-600 font-semibold">October 20-25, 2026</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold text-gray-900">Practical Examinations</p>
                      <p className="text-sm text-gray-600">Lab subjects</p>
                    </div>
                    <span className="text-orange-600 font-semibold">December 1-10, 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">Semester End Examinations</p>
                      <p className="text-sm text-gray-600">Final theory exams</p>
                    </div>
                    <span className="text-orange-600 font-semibold">December 15-30, 2026</span>
                  </div>
                </div>
              </div>

              {/* Even Semester */}
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Even Semester (II, IV, VI, VIII)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold text-gray-900">Mid-Term I</p>
                      <p className="text-sm text-gray-600">All theory subjects</p>
                    </div>
                    <span className="text-orange-600 font-semibold">February 20-25, 2027</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold text-gray-900">Mid-Term II</p>
                      <p className="text-sm text-gray-600">All theory subjects</p>
                    </div>
                    <span className="text-orange-600 font-semibold">April 15-20, 2027</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold text-gray-900">Practical Examinations</p>
                      <p className="text-sm text-gray-600">Lab subjects</p>
                    </div>
                    <span className="text-orange-600 font-semibold">May 1-10, 2027</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">Semester End Examinations</p>
                      <p className="text-sm text-gray-600">Final theory exams</p>
                    </div>
                    <span className="text-orange-600 font-semibold">May 15-30, 2027</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examination Rules */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <FileText className="h-10 w-10 text-orange-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Examination Rules & Guidelines</h2>
            </div>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Attendance Requirement</h3>
                    <p className="text-sm text-gray-700">Minimum 75% attendance required to appear for semester exams</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Hall Ticket</h3>
                    <p className="text-sm text-gray-700">Hall ticket mandatory for all examinations. Download from student portal</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Reporting Time</h3>
                    <p className="text-sm text-gray-700">Report 30 minutes before exam. Late entry not permitted after 15 minutes</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Answer Sheets</h3>
                    <p className="text-sm text-gray-700">Use only blue/black pen. Write roll number clearly on all sheets</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-3">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Prohibited Items</h3>
                    <p className="text-sm text-gray-700">Mobile phones, calculators (unless specified), and study materials not allowed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-3">
                  <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Malpractice</h3>
                    <p className="text-sm text-gray-700">Strict action against unfair means. May result in exam cancellation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Revaluation */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Results & Revaluation</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Result Declaration</h3>
                <p className="text-gray-700 mb-2">
                  Semester results are typically declared within 30-45 days after the examination completion.
                  Results are published on the JNTUA official website and college notice boards.
                </p>
                <p className="text-sm text-orange-600 font-semibold mt-3">
                  Check results at: jntuaresults.ac.in
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Revaluation Process</h3>
                <p className="text-gray-700 mb-3">
                  Students can apply for revaluation/recounting within the stipulated time (usually 10 days after result declaration).
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Fee: ₹1000 per subject for revaluation</li>
                  <li>• Fee: ₹200 per subject for recounting/challenge valuation</li>
                  <li>• Apply online through JNTUA portal</li>
                  <li>• Results declared within 15 days</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Supplementary Examinations</h3>
                <p className="text-gray-700">
                  Students who fail in any subject can appear for supplementary examinations. These are conducted 
                  before the next regular semester exams. Registration is mandatory through the college.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Links */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Important Links</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a href="#" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
                <FileText className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Download Hall Ticket</h3>
                <p className="text-sm text-gray-600">Get your examination hall ticket</p>
              </a>
              
              <a href="#" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
                <CheckCircle className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Check Results</h3>
                <p className="text-sm text-gray-600">View your examination results</p>
              </a>
              
              <a href="#" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center">
                <Calendar className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Exam Schedule</h3>
                <p className="text-sm text-gray-600">Download detailed time table</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Examination;

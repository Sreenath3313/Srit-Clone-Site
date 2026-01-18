import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { Award, IndianRupee, CheckCircle, FileText, Users, TrendingUp } from 'lucide-react';

const Scholarships: React.FC = () => {
  const scholarships = [
    {
      name: 'Merit Scholarship',
      icon: <Award className="h-12 w-12" />,
      color: 'from-yellow-500 to-yellow-600',
      amount: '25,000 - 75,000',
      eligibility: [
        'Top 10% scorers in entrance exam',
        'Minimum 85% in 12th standard',
        'Valid for all branches',
        'Renewable annually based on academic performance'
      ],
      coverage: 'Up to 75% tuition fee waiver for top rankers',
      benefits: 'Additional benefits: Priority hostel allotment, library membership'
    },
    {
      name: 'Sports Scholarship',
      icon: <Users className="h-12 w-12" />,
      color: 'from-green-500 to-green-600',
      amount: '15,000 - 40,000',
      eligibility: [
        'State/National level sports participation',
        'Certificate from recognized sports authority',
        'Minimum 60% in 12th standard',
        'Commitment to represent college in tournaments'
      ],
      coverage: 'Up to 40% tuition fee waiver',
      benefits: 'Additional benefits: Free sports training, equipment support'
    },
    {
      name: 'Need-Based Scholarship',
      icon: <TrendingUp className="h-12 w-12" />,
      color: 'from-blue-500 to-blue-600',
      amount: '20,000 - 50,000',
      eligibility: [
        'Annual family income below ₹3 lakhs',
        'Valid income certificate required',
        'Minimum 70% in 12th standard',
        'Good academic record'
      ],
      coverage: 'Up to 50% tuition fee waiver',
      benefits: 'Additional benefits: Free textbooks, hostel fee concession'
    },
    {
      name: 'Girl Child Scholarship',
      icon: <Award className="h-12 w-12" />,
      color: 'from-pink-500 to-pink-600',
      amount: '10,000 - 30,000',
      eligibility: [
        'Female candidates only',
        'Minimum 75% in 12th standard',
        'Available for all branches',
        'Encourages women in engineering'
      ],
      coverage: 'Up to 30% tuition fee waiver',
      benefits: 'Additional benefits: Mentorship program, skill development courses'
    },
    {
      name: 'SC/ST Scholarship',
      icon: <FileText className="h-12 w-12" />,
      color: 'from-purple-500 to-purple-600',
      amount: '50,000 - 1,00,000',
      eligibility: [
        'Valid caste certificate required',
        'As per government guidelines',
        'Annual family income criteria',
        'Direct government funding'
      ],
      coverage: 'Full or partial tuition fee waiver',
      benefits: 'Additional benefits: Government post-matric scholarship, hostel allowance'
    },
    {
      name: 'Minority Scholarship',
      icon: <Users className="h-12 w-12" />,
      color: 'from-indigo-500 to-indigo-600',
      amount: '20,000 - 50,000',
      eligibility: [
        'Muslim, Christian, Sikh, Buddhist, Jain, Parsi communities',
        'Annual family income below ₹6 lakhs',
        'Valid minority certificate',
        'As per Maulana Azad Education Foundation guidelines'
      ],
      coverage: 'As per government scheme',
      benefits: 'Additional benefits: Mentorship, career guidance'
    }
  ];

  const governmentSchemes = [
    {
      name: 'Central Sector Scholarship',
      authority: 'Ministry of Education, Govt. of India',
      amount: '₹10,000 - ₹20,000 per year',
      eligibility: 'Top 80% students in 12th from CBSE/State boards'
    },
    {
      name: 'Post-Matric Scholarship for SC/ST',
      authority: 'Department of Social Welfare, Govt. of AP',
      amount: 'Full tuition + maintenance allowance',
      eligibility: 'SC/ST students with family income < ₹2.5 lakhs'
    },
    {
      name: 'Post-Matric Scholarship for OBC',
      authority: 'Department of BC Welfare, Govt. of AP',
      amount: 'Full tuition + maintenance allowance',
      eligibility: 'OBC students with family income < ₹1 lakh'
    },
    {
      name: 'Fee Reimbursement Scheme',
      authority: 'Govt. of Andhra Pradesh',
      amount: 'Full tuition fee reimbursement',
      eligibility: 'AP domicile students with family income < ₹1.5 lakhs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Scholarships</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Financial assistance to ensure no deserving student is left behind
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Making Quality Education Accessible</h2>
              <p className="text-gray-700 mb-8">
                At SRIT, we believe that financial constraints should never be a barrier to quality education. 
                We offer multiple scholarship opportunities to deserving students based on merit, need, and special categories.
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-orange-600 mb-2">6+</div>
                  <p className="text-gray-700">Scholarship Types</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
                  <p className="text-gray-700">Students Benefited</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-orange-600 mb-2">₹2Cr+</div>
                  <p className="text-gray-700">Annual Disbursement</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                  <p className="text-gray-700">Fee Waiver Possible</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Institute Scholarships */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Institute Scholarships</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {scholarships.map((scholarship, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className={`bg-gradient-to-r ${scholarship.color} text-white p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      {scholarship.icon}
                      <Award className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{scholarship.name}</h3>
                    <div className="flex items-center text-white">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      <span className="font-semibold">{scholarship.amount}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Eligibility:</h4>
                    <ul className="space-y-2 mb-4">
                      {scholarship.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-gray-50 p-3 rounded mb-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Coverage:</p>
                      <p className="text-sm text-gray-600">{scholarship.coverage}</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Benefits:</p>
                      <p className="text-sm text-gray-600">{scholarship.benefits}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Government Scholarships */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Government Scholarship Schemes</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              In addition to institute scholarships, students can apply for various government scholarship schemes. 
              Our dedicated team assists students in the application process.
            </p>
            <div className="max-w-5xl mx-auto space-y-4">
              {governmentSchemes.map((scheme, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-grow mb-4 md:mb-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{scheme.authority}</p>
                      <p className="text-sm text-gray-700">{scheme.eligibility}</p>
                    </div>
                    <div className="flex-shrink-0 md:ml-6 md:text-right">
                      <div className="bg-green-50 px-4 py-2 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Amount</p>
                        <p className="text-lg font-bold text-green-600">{scheme.amount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How to Apply for Scholarships</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Institute Scholarships</h3>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                      <div>
                        <p className="font-semibold text-gray-900">Complete Admission</p>
                        <p className="text-sm text-gray-600">Get admitted to the program</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                      <div>
                        <p className="font-semibold text-gray-900">Fill Application</p>
                        <p className="text-sm text-gray-600">Fill scholarship application form</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                      <div>
                        <p className="font-semibold text-gray-900">Submit Documents</p>
                        <p className="text-sm text-gray-600">Provide required certificates</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
                      <div>
                        <p className="font-semibold text-gray-900">Wait for Approval</p>
                        <p className="text-sm text-gray-600">Committee reviews within 15 days</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Government Scholarships</h3>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                      <div>
                        <p className="font-semibold text-gray-900">Visit Portal</p>
                        <p className="text-sm text-gray-600">Go to respective scheme portal</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                      <div>
                        <p className="font-semibold text-gray-900">Register & Apply</p>
                        <p className="text-sm text-gray-600">Create account and apply online</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                      <div>
                        <p className="font-semibold text-gray-900">Institute Verification</p>
                        <p className="text-sm text-gray-600">Get application verified by college</p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
                      <div>
                        <p className="font-semibold text-gray-900">Await Disbursement</p>
                        <p className="text-sm text-gray-600">Amount credited directly to account</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Required Documents</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Common Documents:</h3>
                    <ul className="space-y-2">
                      {[
                        'Admission receipt',
                        '10th & 12th mark sheets',
                        'Entrance exam scorecard',
                        'Passport size photographs',
                        'Aadhar card',
                        'Bank account details'
                      ].map((doc, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Category-Specific:</h3>
                    <ul className="space-y-2">
                      {[
                        'Income certificate (Need-based)',
                        'Caste certificate (SC/ST/OBC)',
                        'Minority certificate (Minority)',
                        'Sports certificate (Sports)',
                        'Domicile certificate (State schemes)',
                        'Previous year marks (Merit renewal)'
                      ].map((doc, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Assistance with Scholarships?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our scholarship cell is here to help you navigate the application process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Scholarship Cell
              </Link>
              <Link 
                to="/admissions"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Apply for Admission
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Scholarships;

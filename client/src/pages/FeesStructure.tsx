import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { IndianRupee, FileText, Calculator, CreditCard, BookOpen, Home, Bus, Utensils } from 'lucide-react';

// Configuration
const CURRENT_ACADEMIC_YEAR = '2026-27';

const FeesStructure: React.FC = () => {
  const btechFees = {
    tuition: 80000,
    development: 15000,
    library: 5000,
    lab: 5000,
    exam: 3000,
    other: 2000,
  };

  const mtechFees = {
    tuition: 60000,
    development: 10000,
    library: 4000,
    lab: 4000,
    exam: 2000,
    other: 1500,
  };

  const hostelFees = {
    accommodation: 30000,
    mess: 35000,
    maintenance: 5000,
  };

  const additionalFees = [
    { item: 'Caution Deposit (Refundable)', amount: 5000, oneTime: true },
    { item: 'ID Card', amount: 500, oneTime: true },
    { item: 'University Registration', amount: 2000, oneTime: true },
    { item: 'Transport (Optional)', amount: 15000, perYear: true },
  ];

  const btechTotal = Object.values(btechFees).reduce((a, b) => a + b, 0);
  const mtechTotal = Object.values(mtechFees).reduce((a, b) => a + b, 0);
  const hostelTotal = Object.values(hostelFees).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fee Structure</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Transparent and affordable education with flexible payment options
            </p>
          </div>
        </section>

        {/* Fee Overview */}
        <section className="py-12 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Academic Year {CURRENT_ACADEMIC_YEAR}</h2>
                <p className="text-gray-700 text-center mb-6">
                  All fees are subject to change as per AICTE and University guidelines. 
                  Fee structure may vary for lateral entry and reserved category students.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <Calculator className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-600 mb-2">₹{(btechTotal / 1000).toFixed(0)}K</div>
                    <p className="text-gray-700">B.Tech Annual Fee</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-600 mb-2">₹{(mtechTotal / 1000).toFixed(0)}K</div>
                    <p className="text-gray-700">M.Tech Annual Fee</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <Calculator className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-600 mb-2">₹{(hostelTotal / 1000).toFixed(0)}K</div>
                    <p className="text-gray-700">Hostel Annual Fee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* B.Tech Fee Structure */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">B.Tech Programs - Annual Fee Structure</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Bachelor of Technology</h3>
                      <p className="text-orange-100">All branches (CSE, ECE, MECH, CIVIL, EEE)</p>
                    </div>
                    <BookOpen className="h-12 w-12" />
                  </div>
                </div>
                
                <div className="p-8">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Tuition Fee</td>
                        <td className="py-4 text-right text-orange-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{btechFees.tuition.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Development Fee</td>
                        <td className="py-4 text-right text-orange-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{btechFees.development.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Library Fee</td>
                        <td className="py-4 text-right text-orange-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{btechFees.library.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Laboratory Fee</td>
                        <td className="py-4 text-right text-orange-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{btechFees.lab.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Examination Fee</td>
                        <td className="py-4 text-right text-orange-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{btechFees.exam.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Other Charges</td>
                        <td className="py-4 text-right text-orange-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{btechFees.other.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-orange-100 font-bold">
                        <td className="py-4 text-gray-900 text-xl">Total Annual Fee</td>
                        <td className="py-4 text-right text-orange-600 text-2xl">
                          <IndianRupee className="inline h-6 w-6" />{btechTotal.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-600 mt-4">
                    * Total fee for 4-year B.Tech program: ₹{(btechTotal * 4).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* M.Tech Fee Structure */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">M.Tech Programs - Annual Fee Structure</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Master of Technology</h3>
                      <p className="text-blue-100">All specializations</p>
                    </div>
                    <BookOpen className="h-12 w-12" />
                  </div>
                </div>
                
                <div className="p-8">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Tuition Fee</td>
                        <td className="py-4 text-right text-blue-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{mtechFees.tuition.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Development Fee</td>
                        <td className="py-4 text-right text-blue-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{mtechFees.development.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Library Fee</td>
                        <td className="py-4 text-right text-blue-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{mtechFees.library.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Laboratory Fee</td>
                        <td className="py-4 text-right text-blue-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{mtechFees.lab.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Examination Fee</td>
                        <td className="py-4 text-right text-blue-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{mtechFees.exam.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-gray-700 font-medium">Other Charges</td>
                        <td className="py-4 text-right text-blue-600 font-bold text-lg">
                          <IndianRupee className="inline h-5 w-5" />{mtechFees.other.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="py-4 text-gray-900 text-xl">Total Annual Fee</td>
                        <td className="py-4 text-right text-blue-600 text-2xl">
                          <IndianRupee className="inline h-6 w-6" />{mtechTotal.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-600 mt-4">
                    * Total fee for 2-year M.Tech program: ₹{(mtechTotal * 2).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hostel & Additional Fees */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Additional Fees</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Hostel Fees */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Home className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Hostel Accommodation</h3>
                </div>
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 text-gray-700">Room Charges</td>
                      <td className="py-3 text-right text-green-600 font-bold">
                        ₹{hostelFees.accommodation.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700">Mess Charges</td>
                      <td className="py-3 text-right text-green-600 font-bold">
                        ₹{hostelFees.mess.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-700">Maintenance</td>
                      <td className="py-3 text-right text-green-600 font-bold">
                        ₹{hostelFees.maintenance.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="bg-green-50 font-bold">
                      <td className="py-3 text-gray-900">Total</td>
                      <td className="py-3 text-right text-green-600 text-lg">
                        ₹{hostelTotal.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-600 mt-4">
                  * Per annum. Separate facilities for boys and girls.
                </p>
              </div>

              {/* Other Fees */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <CreditCard className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Other Charges</h3>
                </div>
                <div className="space-y-4">
                  {additionalFees.map((fee, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="text-gray-700 font-medium">{fee.item}</p>
                        <p className="text-xs text-gray-500">
                          {fee.oneTime ? 'One-time' : fee.perYear ? 'Per year' : ''}
                        </p>
                      </div>
                      <p className="text-purple-600 font-bold">₹{fee.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment Options</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <CreditCard className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Online Payment</h3>
                  <p className="text-sm text-gray-600">Credit/Debit Card, Net Banking, UPI</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Demand Draft</h3>
                  <p className="text-sm text-gray-600">In favor of "SRIT"</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <Calculator className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Installments</h3>
                  <p className="text-sm text-gray-600">Two installments per year</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Important Notes:</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Fee once paid will not be refunded under any circumstances</li>
                  <li>• Fee payment in installments subject to approval</li>
                  <li>• Late payment may attract penalty charges</li>
                  <li>• Scholarship deductions will be adjusted after confirmation</li>
                  <li>• Fee structure subject to change as per government/university guidelines</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Financial Assistance Available</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Multiple scholarship options available for meritorious and economically weaker students
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/scholarships"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Scholarships
              </Link>
              <Link 
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeesStructure;

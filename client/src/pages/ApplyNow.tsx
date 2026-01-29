import React, { useState } from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import { motion } from 'framer-motion';

const ApplyNow: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    qualification: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Application submitted successfully! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Apply for Admission 2026-27
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Start your journey towards excellence in engineering
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Interested In *
                </label>
                <select
                  id="course"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                >
                  <option value="">Select a course</option>
                  <option value="cse">Computer Science & Engineering</option>
                  <option value="ece">Electronics & Communication Engineering</option>
                  <option value="mech">Mechanical Engineering</option>
                  <option value="eee">Electrical & Electronics Engineering</option>
                  <option value="civil">Civil Engineering</option>
                </select>
              </div>

              <div>
                <label htmlFor="qualification" className="block text-sm font-semibold text-gray-700 mb-2">
                  Highest Qualification *
                </label>
                <select
                  id="qualification"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition"
                  value={formData.qualification}
                  onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                >
                  <option value="">Select qualification</option>
                  <option value="12th">12th Standard (PCM)</option>
                  <option value="diploma">Diploma in Engineering</option>
                  <option value="btech">B.Tech (for M.Tech)</option>
                </select>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition"
              >
                Submit Application
              </motion.button>
            </form>

            <div className="mt-8 p-6 bg-orange-50 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">What Happens Next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✅ You'll receive a confirmation email</li>
                <li>✅ Our team will review your application</li>
                <li>✅ You'll be contacted within 48 hours</li>
                <li>✅ Entrance test details will be shared</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplyNow;

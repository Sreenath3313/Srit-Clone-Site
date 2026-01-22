import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ChevronRight, Send, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-300 font-sans relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay <span className="gradient-text">Connected</span>
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Subscribe to our newsletter for latest updates and announcements
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-md transition-all"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-orange-500/50 transition-all"
                >
                  {subscribed ? (
                    <>
                      <Heart className="w-5 h-5" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
            
            {/* Top Links Section */}
            <div className="border-b border-gray-800 pb-8 mb-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-gray-500">
                {['Chairperson', 'Secretary', 'Principal', 'Governing Council', 'Academic Council', 'Mandatory Disclosures', 'News Letters'].map(link => (
                    <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Departments */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-4 border-b-2 border-primary inline-block pb-1">Departments</h3>
                    <ul className="space-y-2">
                        <li><FooterLink text="Computer Science Engineering (CSE)" href="/departments/cse" /></li>
                        <li><FooterLink text="Electronics & Communication (ECE)" href="/departments/ece" /></li>
                        <li><FooterLink text="Mechanical Engineering (MECH)" href="/departments/mech" /></li>
                        <li><FooterLink text="Civil Engineering (CIV)" href="/departments/civil" /></li>
                        <li><FooterLink text="Electrical & Electronics (EEE)" href="/departments" /></li>
                        <li><FooterLink text="CSE - AI & ML" href="/departments" /></li>
                        <li><FooterLink text="CSE - Data Science" href="/departments" /></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white text-lg font-bold mb-4 border-b-2 border-primary inline-block pb-1">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><FooterLink text="Admissions" href="/admissions" /></li>
                        <li><FooterLink text="Placements" href="/placements" /></li>
                        <li><FooterLink text="Examinations" href="/examination" /></li>
                        <li><FooterLink text="Alumni" href="/placements#alumni" /></li>
                        <li><FooterLink text="Contact Us" href="/contact" /></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="lg:col-span-2">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Logo & Address */}
                        <div className="flex-1">
                             <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">SRIT</div>
                                <div className="text-white font-bold leading-tight">
                                    <div>Srinivasa Ramanujan</div>
                                    <div>Institute of Technology</div>
                                </div>
                             </div>
                             <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-primary mt-1 shrink-0" />
                                    <p>Rotarypuram Village, BK Samudram Mandal,<br/>Anantapur District - 515701, AP</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={18} className="text-primary shrink-0" />
                                    <p>91-951 561 1111</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-primary shrink-0" />
                                    <p>hr@srit.ac.in</p>
                                </div>
                             </div>
                        </div>
                        
                        {/* Social Media */}
                        <div className="flex-1">
                             <h3 className="text-white font-bold mb-4">Connect With Us</h3>
                             <div className="flex gap-4 mb-6">
                                <SocialIcon Icon={Facebook} color="bg-blue-600" />
                                <SocialIcon Icon={Twitter} color="bg-sky-500" />
                                <SocialIcon Icon={Instagram} color="bg-pink-600" />
                                <SocialIcon Icon={Linkedin} color="bg-blue-700" />
                                <SocialIcon Icon={Youtube} color="bg-red-600" />
                             </div>
                             <p className="text-xs">
                                Please write your Comments, Feedback, Suggestions, Complaints to <a href="mailto:hr@srit.ac.in" className="text-primary hover:underline">hr@srit.ac.in</a>
                             </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
                <div className="flex gap-4 mb-4 md:mb-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <span className="text-gray-700">|</span>
                    <a href="#" className="hover:text-white">Terms Of Use</a>
                </div>
                <div className="text-center md:text-right">
                    <p>Copyright © 2007 SRIT. All Rights Reserved. Built with <span className="text-red-500">❤</span> for College Project.</p>
                </div>
            </div>
        </div>
    </footer>
  );
};

const FooterLink: React.FC<{ text: string; href?: string }> = ({ text, href = '#' }) => (
    <Link to={href} className="flex items-center hover:text-primary transition-colors group">
        <ChevronRight size={14} className="mr-2 text-gray-600 group-hover:text-primary" />
        {text}
    </Link>
);

const SocialIcon: React.FC<{ Icon: any, color: string }> = ({ Icon, color }) => (
    <a href="#" className={`${color} text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}>
        <Icon size={16} />
    </a>
);

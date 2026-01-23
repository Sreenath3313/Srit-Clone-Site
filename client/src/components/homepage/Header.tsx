import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, User, BookOpen, Download, HelpCircle, GraduationCap, ChevronDown, Menu, X, Search } from 'lucide-react';
import { NavItem } from '@/types/homepage';
import { latestNews } from '@/data/news';
import { SearchBar } from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

// Navigation structure with dropdown items
const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { 
    label: 'About Us', 
    path: '/about',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Overview', path: '/about' },
      { label: 'Vision & Mission', path: '/about#vision' },
      { label: 'Leadership', path: '/about#leadership' },
      { label: 'Infrastructure', path: '/about#infrastructure' }
    ]
  },
  { 
    label: 'Admissions', 
    path: '/admissions',
    hasDropdown: true,
    dropdownItems: [
      { label: 'How to Apply', path: '/admissions#apply' },
      { label: 'Eligibility', path: '/admissions#eligibility' },
      { label: 'Fee Structure', path: '/admissions#fees' },
      { label: 'Important Dates', path: '/admissions#dates' }
    ]
  },
  { 
    label: 'Academics', 
    path: '/academics',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Overview', path: '/academics' },
      { label: 'Departments', path: '/departments' },
      { label: 'CSE', path: '/departments/cse' },
      { label: 'ECE', path: '/departments/ece' },
      { label: 'Mechanical', path: '/departments/mech' },
      { label: 'Civil', path: '/departments/civil' }
    ]
  },
  { 
    label: 'Campus Life', 
    path: '/campus-life',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Overview', path: '/campus-life' },
      { label: 'Hostel', path: '/campus-life#hostel' },
      { label: 'Sports', path: '/campus-life#sports' },
      { label: 'Cultural', path: '/campus-life#cultural' }
    ]
  },
  { 
    label: 'Student Chapters', 
    path: '/student-chapters',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Technical Clubs', path: '/student-chapters#technical' },
      { label: 'Cultural Clubs', path: '/student-chapters#cultural' },
      { label: 'Sports Clubs', path: '/student-chapters#sports' },
      { label: 'Professional Societies', path: '/student-chapters#societies' }
    ]
  },
  { 
    label: 'Examination', 
    path: '/examination',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Schedule', path: '/examination#schedule' },
      { label: 'Rules', path: '/examination#rules' },
      { label: 'Results', path: '/examination#results' },
      { label: 'Revaluation', path: '/examination#revaluation' }
    ]
  },
  { 
    label: 'Placements', 
    path: '/placements',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Statistics', path: '/placements#statistics' },
      { label: 'Recruiters', path: '/placements#recruiters' },
      { label: 'Training', path: '/placements#training' },
      { label: 'Alumni', path: '/placements#alumni' }
    ]
  },
  { 
    label: 'Committees', 
    path: '/committees',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Academic', path: '/committees#academic' },
      { label: 'Disciplinary', path: '/committees#disciplinary' },
      { label: 'Anti-Ragging', path: '/committees#anti-ragging' },
      { label: 'Grievance', path: '/committees#grievance' }
    ]
  },
  { 
    label: 'Community Services', 
    path: '/community-services',
    hasDropdown: true,
    dropdownItems: [
      { label: 'NSS', path: '/community-services#nss' },
      { label: 'NCC', path: '/community-services#ncc' },
      { label: 'Social Initiatives', path: '/community-services#initiatives' }
    ]
  },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = React.useState<string | null>(null);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setExpandedMobileItem(expandedMobileItem === label ? null : label);
  };

  return (
    <header className="w-full flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 print:hidden">
        <div className="flex space-x-4 items-center">
          <div className="flex items-center space-x-1">
            <Phone size={14} />
            <span>91-951 561 1111</span>
          </div>
          <div className="flex items-center space-x-1 border-l border-white/30 pl-4">
            <Mail size={14} />
            <span>hr@srit.ac.in</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <Link to="/login" className="flex items-center space-x-1 hover:text-gray-200 transition-colors hover:scale-105 transform duration-200">
            <User size={14} /> <span>Login Here</span>
          </Link>
          <span className="hidden md:inline">|</span>
          <a href="#" className="flex items-center space-x-1 hover:text-gray-200 transition-colors hover:scale-105 transform duration-200">
            <BookOpen size={14} /> <span>Degree Verification</span>
          </a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="flex items-center space-x-1 hover:text-gray-200 transition-colors hover:scale-105 transform duration-200">
            <Download size={14} /> <span>Downloads</span>
          </a>
          <span className="hidden md:inline">|</span>
          <Link to="/contact" className="flex items-center space-x-1 hover:text-gray-200 transition-colors hover:scale-105 transform duration-200">
            <HelpCircle size={14} /> <span>Contact Us</span>
          </Link>
        </div>
      </div>


      

      {/* Navigation with enhanced animations */}
      <motion.div 
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          isScrolled 
            ? 'bg-white shadow-xl border-gray-200' 
            : 'bg-white/95 backdrop-blur-md shadow-lg border-gray-100'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center md:hidden py-3">
                 {!isMobileMenuOpen && <span className="font-bold text-gray-700">Menu</span>}
                 <div className="flex items-center gap-2 ml-auto">
                   <motion.button
                     onClick={() => setIsSearchOpen(true)}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                   >
                     <Search className="text-primary w-5 h-5" />
                   </motion.button>
                   <motion.button 
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                   >
                      {isMobileMenuOpen ? <X className="text-primary" /> : <Menu className="text-primary" />}
                   </motion.button>
                 </div>
            </div>
            <motion.nav 
              className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row justify-between md:items-center w-full`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
                <div className="flex flex-col md:flex-row flex-1 justify-center">
                {navItems.map((item, index) => (
                    <div key={index} className="group relative">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {/* Mobile: Click-based with chevron toggle */}
                          {isMobile && item.hasDropdown ? (
                            <button
                              onClick={() => toggleMobileDropdown(item.label)}
                              className="block w-full py-4 px-5 text-sm font-semibold text-gray-700 hover:text-primary transition-all duration-300 flex items-center justify-between relative"
                            >
                              <span className="relative">
                                {item.label}
                              </span>
                              <motion.div
                                animate={{ rotate: expandedMobileItem === item.label ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown size={14} className="ml-1" />
                              </motion.div>
                            </button>
                          ) : (
                            <Link 
                              to={item.path || '#'} 
                              className="block py-4 px-5 text-sm font-semibold text-gray-700 hover:text-primary transition-all duration-300 flex items-center justify-between md:justify-start relative"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setExpandedMobileItem(null);
                              }}
                            >
                              <span className="relative">
                                {item.label}
                                {/* Animated underline for desktop */}
                                <motion.span 
                                  className="hidden md:block absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 group-hover:w-full transition-all duration-300"
                                />
                              </span>
                              {item.hasDropdown && !isMobile && (
                                <motion.div
                                  whileHover={{ rotate: 180 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronDown size={14} className="ml-1" />
                                </motion.div>
                              )}
                            </Link>
                          )}
                        </motion.div>
                        
                        {/* Dropdown Menu */}
                        {item.hasDropdown && item.dropdownItems && (
                          <>
                            {/* Desktop: Hover-based dropdown */}
                            {!isMobile && (
                              <motion.div 
                                className="hidden group-hover:block absolute left-0 top-full w-56 bg-white/95 backdrop-blur-md shadow-2xl border-t-2 border-primary py-2 z-50 rounded-b-lg overflow-hidden"
                                initial={{ opacity: 0, y: -10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.dropdownItems.map((dropItem, dropIndex) => (
                                  <motion.div
                                    key={dropIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: dropIndex * 0.03 }}
                                  >
                                    <Link 
                                      to={dropItem.path || '#'} 
                                      className="block px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 hover:text-primary transition-all duration-200 relative group/item"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <motion.span
                                        className="relative"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        {dropItem.label}
                                      </motion.span>
                                      <motion.span 
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-primary group-hover/item:w-1 transition-all duration-200"
                                      />
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                            
                            {/* Mobile: Click-based expandable submenu */}
                            {isMobile && expandedMobileItem === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-50 overflow-hidden"
                              >
                                {item.dropdownItems.map((dropItem, dropIndex) => (
                                  <Link
                                    key={dropIndex}
                                    to={dropItem.path || '#'}
                                    className="block px-8 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-primary transition-all duration-200 border-l-2 border-transparent hover:border-primary"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setExpandedMobileItem(null);
                                    }}
                                  >
                                    {dropItem.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </>
                        )}
                    </div>
                ))}
                </div>
                
                {/* Search Icon */}
                <motion.button
                  onClick={() => setIsSearchOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300"
                >
                  <Search className="w-5 h-5" />
                  <span className="font-semibold">Search</span>
                </motion.button>
            </motion.nav>
        </div>
      </motion.div>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Ticker */}
      <div className="bg-primary text-white py-2 overflow-hidden relative flex items-center ticker-wrapper">
          <div className="absolute left-0 bg-primary z-10 px-4 py-2 font-bold shadow-lg whitespace-nowrap">
              LATEST NEWS
          </div>
          <div className="w-full overflow-hidden flex pl-32">
              <div className="ticker-text text-sm font-medium whitespace-nowrap inline-block">
                  {latestNews} {latestNews}
              </div>
          </div>
      </div>
    </header>
  );
};

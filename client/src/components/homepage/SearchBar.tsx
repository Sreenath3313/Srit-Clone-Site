import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search functionality
    // This would typically involve:
    // 1. Searching through pages, departments, news, events
    // 2. Filtering results based on query
    // 3. Displaying results in the modal
    // 4. Navigating to selected result
    console.log('Searching for:', searchQuery);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center p-6 border-b border-gray-100">
              <Search className="w-6 h-6 text-gray-400 mr-4" />
              <input
                type="text"
                placeholder="Search for courses, departments, faculty, news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-lg outline-none text-gray-900 placeholder-gray-400"
                autoFocus
              />
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Admissions',
                'Departments',
                'Placements',
                'Campus Life',
                'Contact Us',
                'Downloads',
              ].map((link, index) => (
                <button
                  key={index}
                  className="text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 hover:text-orange-600 transition-all duration-300 text-gray-700 font-medium"
                  onClick={onClose}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results (Placeholder) */}
          {searchQuery && (
            <div className="p-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Search Results</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-orange-50 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-gray-900 mb-1">Computer Science Department</h4>
                  <p className="text-sm text-gray-600">Explore our cutting-edge CSE programs...</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 hover:bg-orange-50 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-gray-900 mb-1">Admission Process 2025</h4>
                  <p className="text-sm text-gray-600">Learn about our admission procedure...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

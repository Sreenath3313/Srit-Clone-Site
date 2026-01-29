import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, ZoomIn, ZoomOut, Contrast, Volume2, Keyboard, X } from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibilityFontSize');
      return saved ? parseInt(saved) : 100;
    }
    return 100;
  });
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibilityHighContrast');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Apply settings on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.fontSize = `${fontSize}%`;
      if (highContrast) {
        document.documentElement.classList.add('high-contrast');
      }
    }
  }, []);

  const increaseFontSize = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
      localStorage.setItem('accessibilityFontSize', newSize.toString());
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
      localStorage.setItem('accessibilityFontSize', newSize.toString());
    }
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('accessibilityHighContrast', JSON.stringify(newValue));
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const text = 'Welcome to SRIT. Use our accessibility features to customize your browsing experience.';
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const showKeyboardGuide = () => {
    alert('Keyboard Navigation:\n\nTab - Navigate forward\nShift + Tab - Navigate backward\nEnter - Activate link/button\nEsc - Close dialogs\nSpace - Scroll/Toggle');
  };

  const toolbarItems = [
    {
      icon: <ZoomIn className="w-5 h-5" />,
      label: 'Increase Font Size',
      onClick: increaseFontSize,
      disabled: fontSize >= 150
    },
    {
      icon: <ZoomOut className="w-5 h-5" />,
      label: 'Decrease Font Size',
      onClick: decreaseFontSize,
      disabled: fontSize <= 80
    },
    {
      icon: <Contrast className="w-5 h-5" />,
      label: highContrast ? 'Disable High Contrast' : 'Enable High Contrast',
      onClick: toggleHighContrast,
      active: highContrast
    },
    {
      icon: <Volume2 className="w-5 h-5" />,
      label: 'Text to Speech',
      onClick: speakText
    },
    {
      icon: <Keyboard className="w-5 h-5" />,
      label: 'Keyboard Navigation Guide',
      onClick: showKeyboardGuide
    }
  ];

  return (
    <>
      {/* Toggle Button - Positioned to avoid chatbot overlap */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
        aria-label="Toggle accessibility toolbar"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Accessibility className="w-6 h-6" />}
        </motion.div>
        
        {/* Pulse Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full -z-10"
        />
      </motion.button>

      {/* Toolbar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-24 top-1/2 -translate-y-1/2 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 w-80"
          >
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Accessibility className="w-6 h-6 text-orange-500" />
                Accessibility Tools
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customize your browsing experience
              </p>
            </div>

            {/* Font Size Indicator */}
            <div className="mb-6 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</span>
                <span className="text-sm font-bold text-orange-500">{fontSize}%</span>
              </div>
              <div className="relative h-2 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((fontSize - 80) / 70) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="absolute h-full bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"
                />
              </div>
            </div>

            {/* Toolbar Buttons */}
            <div className="space-y-2">
              {toolbarItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={item.onClick}
                  disabled={item.disabled}
                  whileHover={{ scale: item.disabled ? 1 : 1.02, x: item.disabled ? 0 : 5 }}
                  whileTap={{ scale: item.disabled ? 1 : 0.98 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    item.disabled
                      ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
                      : item.active
                      ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                  }`}
                  title={item.label}
                >
                  <div className={`p-2 rounded-lg ${
                    item.disabled
                      ? 'bg-gray-200 dark:bg-slate-600'
                      : item.active
                      ? 'bg-white/20'
                      : 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Reset Button */}
            <motion.button
              onClick={() => {
                setFontSize(100);
                setHighContrast(false);
                document.documentElement.style.fontSize = '100%';
                document.documentElement.classList.remove('high-contrast');
                localStorage.setItem('accessibilityFontSize', '100');
                localStorage.setItem('accessibilityHighContrast', 'false');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 p-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              Reset to Default
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

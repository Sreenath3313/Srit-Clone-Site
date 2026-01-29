import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BookOpen, Trophy, ChevronDown } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  placementRate: number;
  avgPackage: number;
  researchPapers: number;
}

const departments: Department[] = [
  { id: 'cse', name: 'Computer Science & Engineering', placementRate: 98, avgPackage: 8.5, researchPapers: 45 },
  { id: 'ece', name: 'Electronics & Communication', placementRate: 95, avgPackage: 7.2, researchPapers: 38 },
  { id: 'mech', name: 'Mechanical Engineering', placementRate: 90, avgPackage: 6.5, researchPapers: 32 },
  { id: 'civil', name: 'Civil Engineering', placementRate: 88, avgPackage: 6.0, researchPapers: 28 },
  { id: 'eee', name: 'Electrical & Electronics', placementRate: 92, avgPackage: 7.0, researchPapers: 35 },
];

export const DepartmentComparison: React.FC = () => {
  const [dept1, setDept1] = useState<Department>(departments[0]);
  const [dept2, setDept2] = useState<Department>(departments[1]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const ComparisonMetric: React.FC<{
    icon: React.ReactNode;
    label: string;
    value1: number;
    value2: number;
    suffix: string;
    gradient: string;
  }> = ({ icon, label, value1, value2, suffix, gradient }) => {
    const max = Math.max(value1, value2);
    const percentage1 = (value1 / max) * 100;
    const percentage2 = (value2 / max) * 100;

    return (
      <div className="relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{label}</h3>
        </div>

        {/* Department 1 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dept1.name}</span>
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
              {value1}{suffix}
            </span>
          </div>
          <div className="relative h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage1}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`absolute h-full bg-gradient-to-r ${gradient} rounded-full`}
            />
          </div>
        </div>

        {/* Department 2 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dept2.name}</span>
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
              {value2}{suffix}
            </span>
          </div>
          <div className="relative h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage2}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className={`absolute h-full bg-gradient-to-r ${gradient} rounded-full`}
            />
          </div>
        </div>
      </div>
    );
  };

  const DepartmentDropdown: React.FC<{
    selected: Department;
    onSelect: (dept: Department) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    label: string;
  }> = ({ selected, onSelect, isOpen, setIsOpen, label }) => (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-br from-orange-500 to-purple-500 text-white rounded-xl p-4 flex items-center justify-between shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="font-semibold">{selected.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            {departments.map((dept) => (
              <motion.button
                key={dept.id}
                onClick={() => {
                  onSelect(dept);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  selected.id === dept.id
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {dept.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-white via-orange-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Department Analytics</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Departments</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore and compare key metrics across different engineering departments
          </p>
        </motion.div>

        {/* Department Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto"
        >
          <DepartmentDropdown
            selected={dept1}
            onSelect={setDept1}
            isOpen={isOpen1}
            setIsOpen={setIsOpen1}
            label="Select First Department"
          />
          <DepartmentDropdown
            selected={dept2}
            onSelect={setDept2}
            isOpen={isOpen2}
            setIsOpen={setIsOpen2}
            label="Select Second Department"
          />
        </motion.div>

        {/* Comparison Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <ComparisonMetric
            icon={<Trophy className="w-6 h-6" />}
            label="Placement Rate"
            value1={dept1.placementRate}
            value2={dept2.placementRate}
            suffix="%"
            gradient="from-green-500 to-emerald-600"
          />
          <ComparisonMetric
            icon={<TrendingUp className="w-6 h-6" />}
            label="Average Package"
            value1={dept1.avgPackage}
            value2={dept2.avgPackage}
            suffix=" LPA"
            gradient="from-blue-500 to-cyan-600"
          />
          <ComparisonMetric
            icon={<BookOpen className="w-6 h-6" />}
            label="Research Papers"
            value1={dept1.researchPapers}
            value2={dept2.researchPapers}
            suffix=""
            gradient="from-purple-500 to-pink-600"
          />
        </motion.div>
      </div>
    </section>
  );
};

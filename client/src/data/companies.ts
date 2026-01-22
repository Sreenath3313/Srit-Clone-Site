/**
 * Industry Partners and Company Data
 * Includes placeholder logos and company information
 */

export interface CompanyPartner {
  name: string;
  logo: string; // Using emoji/icon placeholders for now
  category: 'tech' | 'consulting' | 'automotive' | 'cybersecurity' | 'cloud';
  description?: string;
}

export const industryPartners: CompanyPartner[] = [
  {
    name: 'Palo Alto Networks',
    logo: '🛡️',
    category: 'cybersecurity',
    description: 'Global leader in cybersecurity solutions',
  },
  {
    name: 'EC-Council',
    logo: '🔐',
    category: 'cybersecurity',
    description: 'Cybersecurity certification and training',
  },
  {
    name: 'EPAM Systems',
    logo: '💼',
    category: 'consulting',
    description: 'Digital platform engineering services',
  },
  {
    name: 'EduSkills',
    logo: '🎓',
    category: 'tech',
    description: 'Education and skill development',
  },
  {
    name: 'Salesforce',
    logo: '☁️',
    category: 'cloud',
    description: 'Customer relationship management',
  },
  {
    name: 'Wipro',
    logo: '🌐',
    category: 'tech',
    description: 'Global IT services and consulting',
  },
];

export const topRecruiters: CompanyPartner[] = [
  { name: 'TCS', logo: '🏢', category: 'tech' },
  { name: 'Infosys', logo: '💻', category: 'tech' },
  { name: 'Wipro', logo: '🌐', category: 'tech' },
  { name: 'Cognizant', logo: '🔷', category: 'consulting' },
  { name: 'Tech Mahindra', logo: '🔧', category: 'tech' },
  { name: 'HCL', logo: '🏭', category: 'tech' },
  { name: 'Capgemini', logo: '🎯', category: 'consulting' },
  { name: 'Accenture', logo: '💎', category: 'consulting' },
  { name: 'IBM', logo: '🔵', category: 'tech' },
  { name: 'Amazon', logo: '📦', category: 'tech' },
  { name: 'Microsoft', logo: '🪟', category: 'tech' },
  { name: 'Google', logo: '🔍', category: 'tech' },
  { name: 'Deloitte', logo: '💼', category: 'consulting' },
  { name: 'Oracle', logo: '🔴', category: 'tech' },
  { name: 'SAP', logo: '📊', category: 'tech' },
  { name: 'Cisco', logo: '🌐', category: 'tech' },
  { name: 'Intel', logo: '🔷', category: 'tech' },
  { name: 'Qualcomm', logo: '📡', category: 'tech' },
  { name: 'Bosch', logo: '⚙️', category: 'automotive' },
  { name: 'L&T', logo: '🏗️', category: 'tech' },
  { name: 'Ashok Leyland', logo: '🚛', category: 'automotive' },
  { name: 'Mahindra', logo: '🚜', category: 'automotive' },
  { name: 'TATA Motors', logo: '🚗', category: 'automotive' },
  { name: 'Hyundai', logo: '🚙', category: 'automotive' },
];

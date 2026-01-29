/**
 * Industry Partners and Company Data
 * Includes placeholder logos and company information
 */

import { Building2, Shield, Lock, Briefcase, GraduationCap, Cloud, Globe, Laptop, Code, Wrench, Factory, Truck, Car, Store, Database, Target, Cpu, Radio, Cog, Hammer, Tractor } from 'lucide-react';

export interface CompanyPartner {
  name: string;
  logo: string | React.ReactElement; // Using emoji/icon placeholders for now
  category: 'tech' | 'consulting' | 'automotive' | 'cybersecurity' | 'cloud';
  description?: string;
}

export const industryPartners: CompanyPartner[] = [
  {
    name: 'Palo Alto Networks',
    logo: 'Shield',
    category: 'cybersecurity',
    description: 'Global leader in cybersecurity solutions',
  },
  {
    name: 'EC-Council',
    logo: 'Lock',
    category: 'cybersecurity',
    description: 'Cybersecurity certification and training',
  },
  {
    name: 'EPAM Systems',
    logo: 'Briefcase',
    category: 'consulting',
    description: 'Digital platform engineering services',
  },
  {
    name: 'EduSkills',
    logo: 'GraduationCap',
    category: 'tech',
    description: 'Education and skill development',
  },
  {
    name: 'Salesforce',
    logo: 'Cloud',
    category: 'cloud',
    description: 'Customer relationship management',
  },
  {
    name: 'Wipro',
    logo: 'Globe',
    category: 'tech',
    description: 'Global IT services and consulting',
  },
];

export const topRecruiters: CompanyPartner[] = [
  { name: 'TCS', logo: 'Building2', category: 'tech' },
  { name: 'Infosys', logo: 'Laptop', category: 'tech' },
  { name: 'Wipro', logo: 'Globe', category: 'tech' },
  { name: 'Cognizant', logo: 'Code', category: 'consulting' },
  { name: 'Tech Mahindra', logo: 'Wrench', category: 'tech' },
  { name: 'HCL', logo: 'Factory', category: 'tech' },
  { name: 'Capgemini', logo: 'Target', category: 'consulting' },
  { name: 'Accenture', logo: 'Briefcase', category: 'consulting' },
  { name: 'IBM', logo: 'Database', category: 'tech' },
  { name: 'Amazon', logo: 'Store', category: 'tech' },
  { name: 'Microsoft', logo: 'Laptop', category: 'tech' },
  { name: 'Google', logo: 'Globe', category: 'tech' },
  { name: 'Deloitte', logo: 'Briefcase', category: 'consulting' },
  { name: 'Oracle', logo: 'Database', category: 'tech' },
  { name: 'SAP', logo: 'Code', category: 'tech' },
  { name: 'Cisco', logo: 'Globe', category: 'tech' },
  { name: 'Intel', logo: 'Cpu', category: 'tech' },
  { name: 'Qualcomm', logo: 'Radio', category: 'tech' },
  { name: 'Bosch', logo: 'Cog', category: 'automotive' },
  { name: 'L&T', logo: 'Hammer', category: 'tech' },
  { name: 'Ashok Leyland', logo: 'Truck', category: 'automotive' },
  { name: 'Mahindra', logo: 'Tractor', category: 'automotive' },
  { name: 'TATA Motors', logo: 'Car', category: 'automotive' },
  { name: 'Hyundai', logo: 'Car', category: 'automotive' },
];

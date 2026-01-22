/**
 * Accreditation and Approval Data
 * Official accreditations and approvals for SRIT
 */

export interface Accreditation {
  name: string;
  fullName: string;
  logo: string; // Using emoji/icon placeholders
  grade?: string;
  description: string;
  highlight?: boolean;
}

export const accreditations: Accreditation[] = [
  {
    name: 'NBA',
    fullName: 'National Board of Accreditation',
    logo: '🏅',
    description: 'NBA Accredited Programs',
    highlight: true,
  },
  {
    name: 'NAAC',
    fullName: 'National Assessment and Accreditation Council',
    logo: '⭐',
    grade: 'A',
    description: 'NAAC "A" Grade Accredited',
    highlight: true,
  },
  {
    name: 'JNTUA',
    fullName: 'Jawaharlal Nehru Technological University Anantapur',
    logo: '🎓',
    description: 'Affiliated to JNTUA, Ananthapuramu',
    highlight: true,
  },
  {
    name: 'AICTE',
    fullName: 'All India Council for Technical Education',
    logo: '✅',
    description: 'Approved by AICTE',
    highlight: false,
  },
];

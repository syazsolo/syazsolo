export interface Experience {
  id: string;
  company: string;
  title: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  duration: string;
  location?: string;
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 'imttech',
    company: 'IMT Tech Sdn Bhd',
    title: 'Developer',
    employmentType: 'Full Time',
    startDate: 'Jan 2025',
    endDate: 'Oct 2025',
    duration: '10 mos',
    location: 'Bangsar South, Kuala Lumpur, Malaysia',
    logo: '/companies/imt_tech_logo.jpg',
  },
  {
    id: '9loop',
    company: '9LOOP Software Sdn Bhd',
    title: 'Software Engineer II',
    employmentType: 'Full Time',
    startDate: 'Jul 2023',
    endDate: 'May 2024',
    duration: '11 mos',
    location: 'PJ Trade Centre, Damansara Perdana, Petaling Jaya, Selangor',
    logo: '/companies/intex_networking_logo.jpg',
  },
  {
    id: 'webcada',
    company: 'Webcada Sdn Bhd',
    title: 'Junior PHP Developer',
    employmentType: 'Full Time',
    startDate: 'Oct 2021',
    endDate: 'Apr 2023',
    duration: '1 yr 7 mos',
    location: 'Kuala Lumpur, Malaysia',
  },
];

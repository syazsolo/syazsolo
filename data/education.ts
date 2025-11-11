export interface Education {
  id: string;
  institution: string;
  program: string;
  startYear: string;
  endYear: string;
  grade?: string;
  logo?: string;
}

export const educationHistory: Education[] = [
  {
    id: 'mmu',
    institution: 'Multimedia University',
    program: 'Electronics Engineering, Robotics and Automation',
    startYear: '2017',
    endYear: '2021',
    grade: '3.65',
    logo: '/education/mmumalaysia_logo.jpg',
  },
];

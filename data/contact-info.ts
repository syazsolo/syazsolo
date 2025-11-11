import { Link2, Linkedin, Mail, Phone } from 'lucide-react';

export interface ContactItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  isLink: boolean;
}

export const contactItems: ContactItem[] = [
  {
    icon: Linkedin,
    label: 'Linkedin',
    value: 'linkedin.com/in/syazani-zulkhairi-6649b4188',
    href: 'https://linkedin.com/in/syazani-zulkhairi-6649b4188',
    isLink: true,
  },
  {
    icon: Link2,
    label: 'Portfolio',
    value: 'syazsolo.netlify.app',
    href: 'https://syazsolo.netlify.app/',
    isLink: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '0192099853',
    href: '',
    isLink: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'syazanizul@gmail.com',
    href: 'mailto:syazanizul@gmail.com',
    isLink: true,
  },
];

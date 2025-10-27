import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import ProfileCard from './ProfileCard';

const Experience = () => {
  const items = [
    {
      title: 'Software Engineer',
      company: "Touch 'n Go Sdn Bhd",
      duration: 'Apr 2023 - Present · 1 yr 7 mos',
      location:
        'Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia · Hybrid',
      logo: 'https://placehold.co/48x48/f0f0f0/333?text=TNG',
    },
    {
      title: 'Full Stack Developer',
      company: 'Boost',
      duration: 'Nov 2021 - Apr 2023 · 1 yr 6 mos',
      location:
        'Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia · Hybrid',
      logo: 'https://placehold.co/48x48/f0f0f0/333?text=Boost',
    },
    {
      title: 'Software Engineer (Intern)',
      company: 'Web Bytes',
      duration: 'Mar 2021 - Sep 2021 · 7 mos',
      location: 'Bayan Lepas, Penang, Malaysia · On-site',
      logo: 'https://placehold.co/48x48/f0f0f0/333?text=WB',
    },
  ];

  return (
    <ProfileCard
      title="Experience"
      actions={
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          aria-label="Edit experience"
        >
          <Pencil size={18} />
        </Button>
      }
    >
      <div className="flex flex-col divide-y divide-[#eef0f3]">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 md:gap-4 py-3 md:py-4">
            <Avatar className="w-12 h-12 rounded-md shrink-0">
              <AvatarImage src={item.logo} alt={`${item.company} logo`} />
              <AvatarFallback>
                {item.company.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-[16px] font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-[14px] text-secondary-text">{item.company}</p>
              <p className="text-[12px] text-muted-foreground">
                {item.duration}
              </p>
              <p className="text-[12px] text-muted-foreground">
                {item.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ProfileCard>
  );
};

export default Experience;

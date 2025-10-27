import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Pencil, Plus, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ProfileHeader = () => {
  const profile = {
    name: 'Syaz Solo',
    headline:
      'Software Engineer | Full Stack Developer | Mobile App Developer | Tech Enthusiast',
    location: 'Batu Caves, Selangor, Malaysia',
    connections: '500+',
    bannerUrl: '/solo.jpg',
    profileUrl: '/acak.jpg',
  };

  return (
    <Card className="bg-card border-border transition-colors overflow-hidden">
      <div className="h-32 md:h-[196px] bg-secondary">
        <img
          src={profile.bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="relative">
        <div className="absolute -top-10 md:-top-14 left-4 md:left-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white">
            <AvatarImage src={profile.profileUrl} alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex justify-end pt-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Pencil size={18} />
          </Button>
        </div>

        <div className="mt-10 md:mt-12">
          <h1 className="text-[24px] md:text-[28px] leading-[1.2] font-semibold text-foreground">
            {profile.name}
          </h1>
          <p className="text-[14px] md:text-[16px] leading-5 md:leading-6 text-secondary-text mt-1">
            {profile.headline}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-muted-foreground text-[14px]">
            <span>{profile.location}</span>
            <span className="text-muted-foreground/60">·</span>
            <a href="#" className="text-primary font-semibold hover:underline">
              Contact info
            </a>
          </div>
          <div className="mt-1">
            <a
              href="#"
              className="text-primary font-semibold hover:underline text-[14px]"
            >
              {profile.connections} connections
            </a>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              <Plus size={18} className="mr-1.5" />
              Connect
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-hover-bg rounded-full"
            >
              <Send size={16} className="mr-1.5" />
              Message
            </Button>
            <Button
              variant="outline"
              className="border-muted-foreground text-foreground hover:bg-black/5 rounded-full"
            >
              More <ChevronDown size={18} className="ml-1.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;

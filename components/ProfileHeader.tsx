'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

import ContactInfoModal from '@/components/ContactInfoModal';
import { useState } from 'react';

const ProfileHeader = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const profile = {
    name: 'Syazani (Syaz Solo) Zulkhairi',
    headline: 'Software Engineer',
    location: 'Kuala Lumpur, Malaysia',
    bannerUrl: '/background.jpg',
    profileUrl: '/acak.jpg',
  };

  return (
    <>
      <Card className="bg-card border-border transition-colors overflow-hidden">
        <div className="h-[110px] md:h-[196px] bg-secondary">
          <img
            src={profile.bannerUrl}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <CardContent className="relative pb-6">
          <div className="absolute -top-12 md:-top-28 left-4 md:left-6">
            <Avatar className="w-28 h-28 md:w-40 md:h-40 border-4 border-card">
              <AvatarImage src={profile.profileUrl} alt={profile.name} />
              <AvatarFallback>
                {profile.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-18 md:mt-16 px-2">
            <h1 className="text-[24px] leading-[1.2] font-semibold text-foreground">
              {profile.name}
            </h1>
            <p className="text-[14px] md:text-[16px] leading-5 md:leading-6 text-foreground mt-0.5">
              {profile.headline}
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-muted-foreground text-[14px]">
              <span>{profile.location}</span>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-primary font-semibold hover:underline lg:hidden"
              >
                Contact info
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      <ContactInfoModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </>
  );
};

export default ProfileHeader;

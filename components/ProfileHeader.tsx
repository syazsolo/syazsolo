'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

import ContactInfoModal from '@/components/ContactInfoModal';
import ItsMeButton from '@/components/ItsMeButton';
import profileData from '@/data/profile.json';
import { useState } from 'react';
import Image from 'next/image';

const ProfileHeader = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Card className="bg-card border-border overflow-hidden transition-colors">
        <div className="bg-secondary relative h-[110px] md:h-[196px]">
          <Image
            src={profileData.bannerUrl}
            alt="Banner"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
        </div>

        <CardContent className="relative pb-6">
          <div className="absolute -top-12 left-4 md:-top-28 md:left-6">
            <Avatar className="border-card h-28 w-28 border-4 md:h-40 md:w-40">
              <AvatarImage
                src={profileData.profileUrl}
                alt={profileData.name}
              />
              <AvatarFallback>
                {profileData.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-18 px-2 md:mt-16">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground text-[24px] leading-[1.2] font-semibold">
                {profileData.name}
              </h1>
              <ItsMeButton />
            </div>
            <p className="text-foreground mt-0.5 text-[14px] leading-5 md:text-[16px] md:leading-6">
              {profileData.headline}
            </p>
            <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px]">
              <span>{profileData.location}</span>
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

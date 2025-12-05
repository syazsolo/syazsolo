'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import ContactInfoModal from '@/components/ContactInfoModal';
import profileData from '@/data/profile.json';

interface ScrollActionBarProps {
  /** Pixels scrolled before showing the bar */
  thresholdPx?: number;
  /** Distance from the very top to place the bar (kept below header) */
  topOffsetPx?: number;
}

export default function ScrollActionBar({
  thresholdPx = 24,
  topOffsetPx = 52,
}: ScrollActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > thresholdPx);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [thresholdPx]);

  return (
    <div
      className={`fixed right-0 left-0 z-20 transition-transform duration-800 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ top: topOffsetPx }}
      aria-hidden={!isVisible}
    >
      <div className="bg-header-bg/95 supports-backdrop-filter:bg-header-bg/85 border-header-divider border-y shadow-lg backdrop-blur">
        <div className="container-width mx-auto flex h-12 items-center justify-between px-3 md:px-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
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
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground text-sm leading-tight font-semibold">
                {profileData.name}
              </span>
              <span className="text-muted-foreground text-[9.5px] leading-tight sm:text-[12px]">
                {profileData.headline}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => setIsContactModalOpen(true)}
          >
            Contact
          </Button>
        </div>
      </div>
      <ContactInfoModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </div>
  );
}

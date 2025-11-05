'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

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
      className={`fixed left-0 right-0 z-20 transition-transform duration-800 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ top: topOffsetPx }}
      aria-hidden={!isVisible}
    >
      <div className="bg-header-bg/95 backdrop-blur supports-backdrop-filter:bg-header-bg/85 shadow-lg border-y border-header-divider">
        <div className="max-w-[960px] xl:max-w-[1180px] mx-auto px-3 md:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src="/acak.jpg"
                alt="Syazani (Syaz Solo) Zulkhairi"
              />
              <AvatarFallback>SZ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground leading-tight">
                Syazani (Syaz Solo) Zulkhairi
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Software Engineer
              </span>
            </div>
          </div>
          <Button size="sm" className="rounded-full">
            contact Syazani
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Header from '@/components/Header';
import { Messaging } from '@/components/Messaging';
import ProfileHeader from '@/components/ProfileHeader';
import Sidebar from '@/components/Sidebar';
import Skills from '@/components/Skills';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Home() {
  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-background transition-colors">
        <Header />
        <div className="container-max-width mx-auto px-3 md:px-6 py-4 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[18fr_6fr] gap-4 md:gap-6">
            <div className="flex flex-col gap-4 md:gap-6">
              <ProfileHeader />
              <About />
              <Experience />
              <Education />
              <Skills />
            </div>
            <div className="min-w-[300px]">
              <Sidebar />
            </div>
          </div>
        </div>
        <Messaging />
      </div>
    </TooltipProvider>
  );
}

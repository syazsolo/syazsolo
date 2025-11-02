'use client';

import About from '@/components/About';
import ContactInfo from '@/components/ContactInfo';
import Header from '@/components/Header';
import ProfileHeader from '@/components/ProfileHeader';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background transition-colors">
      <Header />
      <div className="max-w-[960px] xl:max-w-[1180px] mx-auto md:px-6 py-3 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-[72fr_28fr] gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-2">
            <ProfileHeader />
            <About />
          </div>
          <div className="hidden lg:flex lg:flex-col">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

import About from '@/components/About';
import ContactInfo from '@/components/ContactInfo';
import DesignPatterns from '@/components/DesignPatterns';
import Directory from '@/components/Directory';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Gap from '@/components/Gap';
import Header from '@/components/Header';
import ProfileHeader from '@/components/ProfileHeader';
import Projects from '@/components/Projects';
import ScrollActionBar from '@/components/ScrollActionBar';

export default function Home() {
  return (
    <div className="bg-background relative min-h-screen pt-[52px] pb-16 transition-colors">
      <Header />
      <ScrollActionBar />
      <div className="container-width mx-auto px-1.5 py-3 md:px-6 md:py-6">
        <div className="grid grid-cols-1 gap-4 min-[770px]:grid-cols-[60%_40%] min-[995px]:grid-cols-[65%_35%] min-[1200px]:grid-cols-[72%_28%]">
          <div className="space-y-2">
            <div className="space-y-2">
              <ProfileHeader />
              <About />
              <Directory />
              <Experience id="experience" />
              <Projects id="projects" />
              <Education id="education" />
            </div>
            <Gap />
            <div className="space-y-2">
              <DesignPatterns id="design-patterns" />
            </div>
          </div>
          <div className="hidden min-[770px]:flex min-[770px]:flex-col">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

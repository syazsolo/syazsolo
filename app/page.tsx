"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, Moon, Pencil, Plus, Send, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting and system preference
  useEffect(() => {
    setMounted(true);
    // Check system preference after mounting
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply dark mode based on current setting
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark, mounted]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const getDarkModeIcon = () => {
    return isDark ? <Moon size={18} /> : <Sun size={18} />;
  };
  return (
    <header className="bg-[#1d1d1d] text-white">
      <div className="max-w-[1128px] mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Name/Logo */}
          <div className="flex items-center">
            <a href="#" className="text-xl font-semibold text-white hover:text-gray-300">
              Syaz Solo
            </a>
          </div>


          {/* Right side - Dark mode toggle and CTA */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {mounted && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDarkMode}
                    className="hover:bg-gray-700"
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                  >
                    {getDarkModeIcon()}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="w-64">
                  <div className="font-medium mb-1">Dark Mode Toggle</div>
                  <div className="text-xs">
                    Did you know LinkedIn has dark mode options? This is a complete mock implementation! 
                    Click to toggle between light and dark mode.
                  </div>
                </TooltipContent>
              </Tooltip>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

const ProfileCard = ({
  title,
  children,
  actions,
}: {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) => (
  <Card className="bg-white dark:bg-[#1a1a1a] border-[#d6d9dc] dark:border-[#333333] transition-colors">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        {title ? (
          <h2 className="text-[20px] leading-6 font-semibold text-[#191919] dark:text-white">
            {title}
          </h2>
        ) : (
          <span />
        )}
        {actions}
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      {children}
    </CardContent>
  </Card>
);

const ProfileHeader = () => {
  const profile = {
    name: "Syaz Solo",
    headline:
      "Software Engineer | Full Stack Developer | Mobile App Developer | Tech Enthusiast",
    location: "Batu Caves, Selangor, Malaysia",
    connections: "500+",
    bannerUrl: "/solo.jpg",
    profileUrl: "/acak.jpg",
  };

  return (
    <Card className="bg-white dark:bg-[#1a1a1a] border-[#d6d9dc] dark:border-[#333333] transition-colors overflow-hidden">
      <div className="h-32 md:h-[196px] bg-[#f3f2ef] dark:bg-[#2a2a2a]">
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
            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex justify-end pt-3">
          <Button variant="ghost" size="icon" className="text-[#666d74]">
            <Pencil size={18} />
          </Button>
        </div>

        <div className="mt-10 md:mt-12">
          <h1 className="text-[24px] md:text-[28px] leading-[1.2] font-semibold text-[#191919] dark:text-white">
            {profile.name}
          </h1>
          <p className="text-[14px] md:text-[16px] leading-5 md:leading-6 text-[#404040] dark:text-gray-300 mt-1">
            {profile.headline}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-[#666d74] dark:text-gray-400 text-[14px]">
            <span>{profile.location}</span>
            <span className="text-[#a1a1a1] dark:text-gray-500">·</span>
            <a
              href="#"
              className="text-[#0a66c2] dark:text-[#70b7ff] font-semibold hover:underline"
            >
              Contact info
            </a>
          </div>
          <div className="mt-1">
            <a
              href="#"
              className="text-[#0a66c2] dark:text-[#70b7ff] font-semibold hover:underline text-[14px]"
            >
              {profile.connections} connections
            </a>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button className="bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full">
              <Plus size={18} className="mr-1.5" />
              Connect
            </Button>
            <Button variant="outline" className="border-[#0a66c2] text-[#0a66c2] hover:bg-[#eef3f8] rounded-full">
              <Send size={16} className="mr-1.5" />
              Message
            </Button>
            <Button variant="outline" className="border-[#666d74] text-[#191919] hover:bg-black/5 rounded-full">
              More <ChevronDown size={18} className="ml-1.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const About = () => (
  <ProfileCard title="About">
    <p className="text-[14px] md:text-[15px] leading-6 text-[#404040] dark:text-gray-300 whitespace-pre-line">
      A passionate and driven software engineer with experience in building and
      maintaining web and mobile applications. Skilled in various technologies
      including React, Node.js, Java, and cloud platforms. Always eager to
      learn, adapt, and take on new challenges in the tech industry.
    </p>
  </ProfileCard>
);

const Experience = () => {
  const items = [
    {
      title: "Software Engineer",
      company: "Touch 'n Go Sdn Bhd",
      duration: "Apr 2023 - Present · 1 yr 7 mos",
      location:
        "Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia · Hybrid",
      logo: "https://placehold.co/48x48/f0f0f0/333?text=TNG",
    },
    {
      title: "Full Stack Developer",
      company: "Boost",
      duration: "Nov 2021 - Apr 2023 · 1 yr 6 mos",
      location:
        "Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia · Hybrid",
      logo: "https://placehold.co/48x48/f0f0f0/333?text=Boost",
    },
    {
      title: "Software Engineer (Intern)",
      company: "Web Bytes",
      duration: "Mar 2021 - Sep 2021 · 7 mos",
      location: "Bayan Lepas, Penang, Malaysia · On-site",
      logo: "https://placehold.co/48x48/f0f0f0/333?text=WB",
    },
  ];

  return (
    <ProfileCard
      title="Experience"
      actions={
        <Button
          variant="ghost"
          size="icon"
          className="text-[#666d74]"
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
              <AvatarFallback>{item.company.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-[16px] font-semibold text-[#191919] dark:text-white">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#404040] dark:text-gray-300">{item.company}</p>
              <p className="text-[12px] text-[#666d74] dark:text-gray-400">{item.duration}</p>
              <p className="text-[12px] text-[#666d74] dark:text-gray-400">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </ProfileCard>
  );
};

const Education = () => {
  const items = [
    {
      school:
        "Asia Pacific University of Technology and Innovation (APU / APIIT)",
      degree: "Bachelor of Science - BS, Computer Science",
      duration: "2018 - 2021",
      logo: "https://placehold.co/48x48/f0f0f0/333?text=APU",
    },
  ];
  return (
    <ProfileCard
      title="Education"
      actions={
        <Button
          variant="ghost"
          size="icon"
          className="text-[#666d74]"
          aria-label="Edit education"
        >
          <Pencil size={18} />
        </Button>
      }
    >
      <div className="flex flex-col divide-y divide-[#eef0f3]">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 md:gap-4 py-3 md:py-4">
            <Avatar className="w-12 h-12 rounded-md shrink-0">
              <AvatarImage src={item.logo} alt={`${item.school} logo`} />
              <AvatarFallback>{item.school.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-[16px] font-semibold text-[#191919] dark:text-white">
                {item.school}
              </h3>
              <p className="text-[14px] text-[#404040] dark:text-gray-300">{item.degree}</p>
              <p className="text-[12px] text-[#666d74] dark:text-gray-400">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </ProfileCard>
  );
};

const Skills = () => {
  const skills = [
    "React.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Java",
    "Python",
    "SQL",
    "MongoDB",
    "Git",
    "Docker",
    "Amazon Web Services (AWS)",
  ];
  return (
    <ProfileCard
      title="Skills"
      actions={
        <Button
          variant="ghost"
          size="icon"
          className="text-[#666d74]"
          aria-label="Edit skills"
        >
          <Pencil size={18} />
        </Button>
      }
    >
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <Badge key={idx} variant="secondary" className="text-[15px] text-[#191919] dark:text-white">
            {skill}
          </Badge>
        ))}
      </div>
    </ProfileCard>
  );
};

const Sidebar = () => {
  const people = [
    {
      name: "John Doe",
      headline: "Senior Software Engineer at Google",
      img: "https://placehold.co/48x48/e0e0e0/333?text=JD",
    },
    {
      name: "Jane Smith",
      headline: "Product Manager at Microsoft",
      img: "https://placehold.co/48x48/e0e0e0/333?text=JS",
    },
    {
      name: "Alex Johnson",
      headline: "Data Scientist at Amazon",
      img: "https://placehold.co/48x48/e0e0e0/333?text=AJ",
    },
  ];
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Card className="bg-white dark:bg-[#1a1a1a] border-[#d6d9dc] dark:border-[#333333] transition-colors">
        <CardHeader className="pb-3">
          <h3 className="text-[16px] font-semibold text-[#191919] dark:text-white">
            People also viewed
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-4">
            {people.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarImage src={p.img} alt={p.name} />
                  <AvatarFallback>{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[#191919] dark:text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-[12px] text-[#666d74] dark:text-gray-400 line-clamp-2">
                    {p.headline}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 h-7 px-3 text-[12px] border-[#666d74] text-[#191919] dark:text-white hover:bg-black/5">
                    <Plus size={14} className="mr-1.5" /> Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-[#1a1a1a] border-[#d6d9dc] dark:border-[#333333] transition-colors">
        <CardHeader className="pb-3">
          <h3 className="text-[16px] font-semibold text-[#191919] dark:text-white">
            People you may know
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-4">
            {people.slice(0, 2).map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarImage src={p.img} alt={p.name} />
                  <AvatarFallback>{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[#191919] dark:text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-[12px] text-[#666d74] dark:text-gray-400 line-clamp-2">
                    {p.headline}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 h-7 px-3 text-[12px] border-[#666d74] text-[#191919] dark:text-white hover:bg-black/5">
                    <Plus size={14} className="mr-1.5" /> Connect
                  </Button>
                </div>
              </div>
            ))}
        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Home() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-[#0a0a0a] transition-colors">
        <Header />
        <div className="max-w-[1128px] mx-auto px-3 md:px-6 py-4 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
              <ProfileHeader />
              <About />
              <Experience />
              <Education />
              <Skills />
            </div>
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

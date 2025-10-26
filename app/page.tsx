"use client";

import { ChevronDown, Pencil, Plus, Send } from "lucide-react";

import React from "react";

const Card = ({
  title,
  children,
  actions,
}: {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) => (
  <section className="bg-white border border-[#d6d9dc] rounded-lg overflow-hidden">
    <div className="px-4 md:px-6 py-4 md:py-5">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        {title ? (
          <h2 className="text-[20px] leading-6 font-semibold text-[#191919]">
            {title}
          </h2>
        ) : (
          <span />
        )}
        {actions}
      </div>
      {children}
    </div>
  </section>
);

const Header = () => {
  const profile = {
    name: "Syaz Solo",
    headline:
      "Software Engineer | Full Stack Developer | Mobile App Developer | Tech Enthusiast",
    location: "Batu Caves, Selangor, Malaysia",
    connections: "500+",
    bannerUrl: "https://placehold.co/1200x300/60a5fa/ffffff?text=Banner+Image",
    profileUrl: "https://placehold.co/160x160/e0e0e0/333?text=Syaz",
  };

  return (
    <section className="bg-white border border-[#d6d9dc] rounded-lg overflow-hidden">
      <div className="h-32 md:h-[196px] bg-[#f3f2ef]">
        <img
          src={profile.bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/1200x300/cccccc/333?text=Banner";
          }}
        />
      </div>

      <div className="px-4 md:px-6 pb-4 md:pb-5 relative">
        <div className="absolute -top-10 md:-top-14 left-4 md:left-6">
          <img
            src={profile.profileUrl}
            alt={profile.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/160x160/cccccc/333?text=Image";
            }}
          />
        </div>

        <div className="flex justify-end pt-3">
          <button
            className="p-2 rounded-full hover:bg-black/5 text-[#666d74]"
            aria-label="Edit profile"
          >
            <Pencil size={18} />
          </button>
        </div>

        <div className="mt-10 md:mt-12">
          <h1 className="text-[24px] md:text-[28px] leading-[1.2] font-semibold text-[#191919]">
            {profile.name}
          </h1>
          <p className="text-[14px] md:text-[16px] leading-5 md:leading-6 text-[#404040] mt-1">
            {profile.headline}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-[#666d74] text-[14px]">
            <span>{profile.location}</span>
            <span className="text-[#a1a1a1]">·</span>
            <a
              href="#"
              className="text-[#0a66c2] font-semibold hover:underline"
            >
              Contact info
            </a>
          </div>
          <div className="mt-1">
            <a
              href="#"
              className="text-[#0a66c2] font-semibold hover:underline text-[14px]"
            >
              {profile.connections} connections
            </a>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0a66c2] text-white rounded-full font-medium text-[14px] hover:bg-[#004182]">
              <Plus size={18} /> Connect
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#0a66c2] text-[#0a66c2] rounded-full font-medium text-[14px] hover:bg-[#eef3f8]">
              <Send size={16} /> Message
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#666d74] text-[#191919] rounded-full font-medium text-[14px] hover:bg-black/5">
              More <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <Card title="About">
    <p className="text-[14px] md:text-[15px] leading-6 text-[#404040] whitespace-pre-line">
      A passionate and driven software engineer with experience in building and
      maintaining web and mobile applications. Skilled in various technologies
      including React, Node.js, Java, and cloud platforms. Always eager to
      learn, adapt, and take on new challenges in the tech industry.
    </p>
  </Card>
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
    <Card
      title="Experience"
      actions={
        <button
          className="p-2 rounded-full hover:bg-black/5 text-[#666d74]"
          aria-label="Edit experience"
        >
          <Pencil size={18} />
        </button>
      }
    >
      <div className="flex flex-col divide-y divide-[#eef0f3]">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 md:gap-4 py-3 md:py-4">
            <img
              src={item.logo}
              alt={`${item.company} logo`}
              className="w-12 h-12 rounded-md object-cover shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/48x48/cccccc/333?text=Logo";
              }}
            />
            <div>
              <h3 className="text-[16px] font-semibold text-[#191919]">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#404040]">{item.company}</p>
              <p className="text-[12px] text-[#666d74]">{item.duration}</p>
              <p className="text-[12px] text-[#666d74]">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
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
    <Card
      title="Education"
      actions={
        <button
          className="p-2 rounded-full hover:bg-black/5 text-[#666d74]"
          aria-label="Edit education"
        >
          <Pencil size={18} />
        </button>
      }
    >
      <div className="flex flex-col divide-y divide-[#eef0f3]">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 md:gap-4 py-3 md:py-4">
            <img
              src={item.logo}
              alt={`${item.school} logo`}
              className="w-12 h-12 rounded-md object-cover shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/48x48/cccccc/333?text=Logo";
              }}
            />
            <div>
              <h3 className="text-[16px] font-semibold text-[#191919]">
                {item.school}
              </h3>
              <p className="text-[14px] text-[#404040]">{item.degree}</p>
              <p className="text-[12px] text-[#666d74]">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
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
    <Card
      title="Skills"
      actions={
        <button
          className="p-2 rounded-full hover:bg-black/5 text-[#666d74]"
          aria-label="Edit skills"
        >
          <Pencil size={18} />
        </button>
      }
    >
      <ul className="flex flex-col">
        {skills.map((skill, idx) => (
          <li
            key={idx}
            className="py-3 border-b last:border-b-0 border-[#eef0f3]"
          >
            <span className="text-[15px] text-[#191919]">{skill}</span>
          </li>
        ))}
      </ul>
    </Card>
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
      <section className="bg-white border border-[#d6d9dc] rounded-lg overflow-hidden">
        <div className="px-4 md:px-6 py-4 md:py-5">
          <h3 className="text-[16px] font-semibold text-[#191919] mb-3 md:mb-4">
            People also viewed
          </h3>
          <div className="flex flex-col gap-4">
            {people.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/48x48/cccccc/333?text=?";
                  }}
                />
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[#191919] truncate">
                    {p.name}
                  </div>
                  <div className="text-[12px] text-[#666d74] line-clamp-2">
                    {p.headline}
                  </div>
                  <button className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 border border-[#666d74] text-[#191919] rounded-full font-medium text-[12px] hover:bg-black/5">
                    <Plus size={14} /> Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border border-[#d6d9dc] rounded-lg overflow-hidden">
        <div className="px-4 md:px-6 py-4 md:py-5">
          <h3 className="text-[16px] font-semibold text-[#191919] mb-3 md:mb-4">
            People you may know
          </h3>
          <div className="flex flex-col gap-4">
            {people.slice(0, 2).map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/48x48/cccccc/333?text=?";
                  }}
                />
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[#191919] truncate">
                    {p.name}
                  </div>
                  <div className="text-[12px] text-[#666d74] line-clamp-2">
                    {p.headline}
                  </div>
                  <button className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 border border-[#666d74] text-[#191919] rounded-full font-medium text-[12px] hover:bg-black/5">
                    <Plus size={14} /> Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f2ef]">
      <div className="max-w-[1128px] mx-auto px-3 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
            <Header />
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
  );
}

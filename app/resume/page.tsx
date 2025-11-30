'use client';

import { Link as LinkIcon, Linkedin, Mail, Phone, Printer } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResumePaginator } from '@/components/resume/ResumePaginator';
import resumeData from '@/data/resume.json';

export default function ResumePage() {
  const { profile, about, experience, projects, education } = resumeData;

  return (
    <div className="min-h-screen bg-gray-50 py-12 print:bg-white print:p-0">
      <PrintButton />

      <ResumePaginator>
        {/* Header */}
        <header className="mb-8 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-light tracking-tight text-slate-900 uppercase">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-600">
            {profile.headline}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            {profile.contact.email && (
              <a
                href={`mailto:${profile.contact.email}`}
                className="flex items-center gap-2 hover:text-slate-900"
              >
                <Mail className="h-4 w-4" />
                {profile.contact.email}
              </a>
            )}
            {profile.contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {profile.contact.phone}
              </div>
            )}
            {profile.contact.linkedin && (
              <a
                href={`https://${profile.contact.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-slate-900"
              >
                <Linkedin className="h-4 w-4" />
                <span className="truncate max-w-[200px]">{profile.contact.linkedin}</span>
              </a>
            )}
            {profile.contact.portfolio && (
              <a
                href={`https://${profile.contact.portfolio}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-slate-900"
              >
                <LinkIcon className="h-4 w-4" />
                {profile.contact.portfolio}
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="mb-4 text-sm font-bold tracking-widest text-slate-400 uppercase">
            About
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-700">
            {about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Experience Header */}
        <div className="mb-6">
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
            Experience
          </h2>
        </div>

        {/* Experience Items */}
        {experience.map(exp => (
          <div key={exp.id} className="mb-8 break-inside-avoid">
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {exp.company}
              </h3>
              <span className="text-sm text-slate-500">
                {exp.startDate} – {exp.endDate}
              </span>
            </div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 italic">
                {exp.title}
              </span>
              <span className="text-xs text-slate-400">{exp.location}</span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-slate-600">
              {exp.description}
            </p>
            {exp.skills && (
              <div className="flex flex-wrap gap-2">
                {exp.skills.map(skill => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-sm bg-slate-100 px-2 py-0.5 text-xs font-normal text-slate-600 hover:bg-slate-200 print:border print:border-slate-200 print:bg-white"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Projects Header */}
        <div className="mb-6">
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
            Projects
          </h2>
        </div>

        {/* Projects Items */}
        {projects.map(project => (
          <div key={project.title} className="mb-6 break-inside-avoid">
            <div className="mb-2 flex items-baseline gap-3">
              <h3 className="text-base font-semibold text-slate-900">
                {project.title}
              </h3>
              <a
                href={`https://${project.url}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-slate-900 hover:underline"
              >
                {project.url}
              </a>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-slate-600">
              {project.description}
            </p>
            {project.skills && (
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-sm bg-slate-100 px-2 py-0.5 text-xs font-normal text-slate-600 hover:bg-slate-200 print:border print:border-slate-200 print:bg-white"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Education Header */}
        <div className="mb-6">
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
            Education
          </h2>
        </div>

        {/* Education Items */}
        {education.map(edu => (
          <div key={edu.id} className="break-inside-avoid">
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {edu.institution}
              </h3>
              <span className="text-sm text-slate-500">
                {edu.startYear} – {edu.endYear}
              </span>
            </div>
            <div className="mt-1 text-sm text-slate-600">{edu.program}</div>
            {edu.grade && (
              <div className="mt-1 text-xs text-slate-400">
                CGPA: {edu.grade}
              </div>
            )}
          </div>
        ))}
      </ResumePaginator>
    </div>
  );
}

function PrintButton() {
  return (
    <div className="fixed right-8 bottom-8 z-50 print:hidden">
      <Button
        onClick={() => window.print()}
        className="gap-2 shadow-xl"
        size="lg"
      >
        <Printer className="h-4 w-4" />
        Print / Save as PDF
      </Button>
    </div>
  );
}

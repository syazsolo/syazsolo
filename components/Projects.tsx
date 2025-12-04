'use client';

import projectsData from '@/data/projects.json';
import skillMetadata from '@/data/skillMetadata.json';
import { useState } from 'react';

import Section from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { SeeMoreButton } from '@/components/ui/SeeMoreButton';

interface Project {
  id: string;
  title: string;
  status?: string;
  url?: string;
  startDate: string;
  endDate: string;
  description?: {
    type: 'ul' | 'ol';
    items: string[];
  };
  skills?: string[];
}

const projects: Project[] = projectsData;

function getSkillColor(skill: string) {
  const metadata = skillMetadata as Record<
    string,
    { bg: string; text: string; border: string }
  >;
  return (
    metadata[skill] || {
      bg: '#E2E8F0',
      text: '#475569',
      border: '#CBD5E1',
    }
  );
}

export default function Projects() {
  return (
    <Section title="Projects">
      <div className="divide-border -mt-2 flex flex-col divide-y">
        {projects.map(project => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

const ProjectItem = ({ project }: { project: Project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="-mx-3 flex w-full gap-3 p-3 text-left">
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-foreground text-[15px] font-semibold">
                {project.title}
              </h3>
              {project.status && (
                <Badge
                  variant="secondary"
                  className="text-[11px] font-normal capitalize"
                >
                  {project.status}
                </Badge>
              )}
            </div>
            {project.url && (
              <a
                href={`https://${project.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground hover:underline text-[14px]"
              >
                {project.url}
              </a>
            )}
            <p className="text-muted-foreground text-[13px]">
              {project.startDate} - {project.endDate}
            </p>
          </div>
          {project.skills && project.skills.length > 0 && (
            <div className="flex flex-wrap justify-end gap-1.5">
              {project.skills.map(skill => {
                const colors = getSkillColor(skill);
                return (
                  <Badge
                    key={skill}
                    className="border text-[12px] font-normal"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                    }}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
        {project.description && (
          <>
            {!expanded && (
              <div className="mt-3">
                <SeeMoreButton
                  onClick={() => setExpanded(true)}
                  expanded={expanded}
                />
              </div>
            )}
            {expanded && (
              <ul className="text-foreground/90 mt-3 ml-5 list-outside list-disc space-y-1.5 pl-1 text-[14px] leading-relaxed">
                {project.description.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};


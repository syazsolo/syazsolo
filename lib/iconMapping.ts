import { Github, Link2, Linkedin, Mail, Phone } from 'lucide-react';

import { ComponentType } from 'react';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Linkedin,
  Link2,
  Phone,
  Mail,
  Github,
};

export function getIcon(
  iconName: string
): ComponentType<{ className?: string }> {
  const Icon = iconMap[iconName];
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in iconMap`);
    return Link2;
  }
  return Icon;
}

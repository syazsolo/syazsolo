import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <Card className="bg-card border-border transition-colors pl-2">
      <CardHeader className="pt-6">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">{children}</CardContent>
    </Card>
  );
};

export default Section;

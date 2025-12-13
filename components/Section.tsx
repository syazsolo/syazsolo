import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Link from 'next/link';
import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  footer?: {
    text: string;
    href: string;
  };
  className?: string;
  id?: string;
}

const Section = ({ title, children, footer, className, id }: SectionProps) => {
  return (
    <Card
      id={id}
      className="bg-card border-border scroll-mt-28 pl-2 transition-colors md:scroll-mt-[150px]"
    >
      <CardHeader className="pt-6">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className={`pb-6 ${className ?? ''}`}>
        {children}
      </CardContent>
      {footer && (
        <div className="mr-0 -ml-2 w-[calc(100%+0.5rem)]">
          <div className="border-border border-t">
            <Link
              href={footer.href}
              className="text-foreground/80 hover:bg-muted flex items-center justify-center rounded py-4 text-sm font-semibold transition-colors dark:hover:bg-[#2c2f33]"
            >
              {footer.text} →
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Section;

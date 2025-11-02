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
}

const Section = ({ title, children, footer }: SectionProps) => {
  return (
    <Card className="bg-card border-border transition-colors pl-2">
      <CardHeader className="pt-6">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">{children}</CardContent>
      {footer && (
        <div className="-ml-2 mr-0 w-[calc(100%+0.5rem)]">
          <div className="border-t border-border">
            <Link
              href={footer.href}
              className="flex items-center justify-center text-foreground/80 text-sm font-semibold hover:bg-muted dark:hover:bg-[#2c2f33] rounded transition-colors py-4"
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

import './globals.css';

import { ConditionalChatbot } from '@/components/ConditionalChatbot';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
  title: 'Syaz Solo | Software Engineer',
  description: 'Portfolio inspired by LinkedIn. Functions as a resume.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <ConditionalChatbot />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

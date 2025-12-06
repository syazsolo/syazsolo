import './globals.css';

import { AuthProvider } from '@/context/AuthContext';
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {/* Hidden form for Netlify form detection at build time */}
        <form
          name="contact"
          netlify-honeypot="bot-field"
          data-netlify="true"
          hidden
        >
          <input type="hidden" name="form-name" value="contact" />
          <input name="bot-field" />
          <input name="name" />
          <input name="mode" />
          <input name="contact-type" />
          <input name="contact-value" />
          <textarea name="message" />
        </form>

        <ThemeProvider>
          <TooltipProvider>
            <AuthProvider>
              {children}
              <ConditionalChatbot />
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import { Moon, Sun } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

const Header = () => {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <header className="bg-background text-foreground">
      <div className="max-w-[1128px] mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
              <Image
                src={isDark ? "/logo-dark.png" : "/logo.png"}
                alt="Syaz Solo Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Right side - Dark mode toggle and CTA */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="text-foreground hover:bg-muted"
                  aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                >
                  {isDark ? <Moon size={18} /> : <Sun size={18} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="w-64">
                <div className="font-medium mb-1">Dark Mode Toggle</div>
                <div className="text-xs">
                  Did you know LinkedIn has dark mode options? This is a
                  complete mock implementation! Click to toggle between light
                  and dark mode.
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

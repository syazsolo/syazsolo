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
    <header className="bg-header-bg text-foreground shadow-xs">
      <div className="container-max-width mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between h-13">
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
              <Image
                src={isDark ? '/logo-dark.png' : '/logo.png'}
                alt="Syaz Solo Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
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
              <TooltipContent side="bottom" className="w-72 text-wrap">
                <div className="text-xs">
                  Did you know that LinkedIn has a dark mode option?
                  <br />
                  <br />
                  It's in Settings & Privacy &gt; Account preferences &gt;
                  Display &gt; Dark Mode.
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

"use client";

import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

const Header = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting and system preference
  useEffect(() => {
    setMounted(true);
    
    // Check localStorage first, then fall back to system preference
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference !== null) {
      setIsDark(storedPreference === 'true');
    } else {
      // Only use system preference if no stored preference exists
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply dark mode based on current setting
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark, mounted]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    // Store the preference in localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const getDarkModeIcon = () => {
    return isDark ? <Moon size={18} /> : <Sun size={18} />;
  };

  return (
    <header className="bg-[#1d1d1d] text-white">
      <div className="max-w-[1128px] mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Name/Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="text-xl font-semibold text-white hover:text-gray-300"
            >
              Syaz Solo
            </a>
          </div>

          {/* Right side - Dark mode toggle and CTA */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {mounted && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDarkMode}
                    className="hover:bg-gray-700"
                    aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                  >
                    {getDarkModeIcon()}
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

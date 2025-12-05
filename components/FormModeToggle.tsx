'use client';

import { Handshake, MessageSquare } from 'lucide-react';

import { cn } from '@/utils';

export type FormMode = 'standard' | 'simple';

interface FormModeToggleProps {
  mode: FormMode;
  onModeChange: (mode: FormMode) => void;
}

export default function FormModeToggle({
  mode,
  onModeChange,
}: FormModeToggleProps) {
  return (
    <div className="space-y-1">
      <div className="bg-muted relative flex rounded-full p-1">
        <div
          className={cn(
            'bg-primary absolute top-1 bottom-1 rounded-full shadow-lg transition-all duration-300 ease-out',
            mode === 'standard' ? 'right-1/2 left-1' : 'right-1 left-1/2'
          )}
          style={{ width: 'calc(50% - 4px)' }}
        />

        <button
          type="button"
          onClick={() => onModeChange('standard')}
          className={cn(
            'relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200',
            mode === 'standard'
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Send a Message</span>
          <span className="sm:hidden">Message</span>
        </button>

        <button
          type="button"
          onClick={() => onModeChange('simple')}
          className={cn(
            'relative z-10 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200',
            mode === 'simple'
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Handshake className="h-4 w-4" />
          <span className="hidden sm:inline">Just Reach Out</span>
          <span className="sm:hidden">Connect</span>
        </button>
      </div>

      <p className="text-muted-foreground animate-in fade-in text-center text-xs duration-200">
        {mode === 'standard'
          ? "Send me a message and I'll respond as soon as I can"
          : "Leave your contact info and I'll reach out to you myself"}
      </p>
    </div>
  );
}

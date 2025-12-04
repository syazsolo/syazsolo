'use client';

import { Button } from '@/components/ui/button';
import { ShieldCheck, Shield } from 'lucide-react';
import { useState } from 'react';
import PasswordDialog from './PasswordDialog';
import { useAuth } from '@/context/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ItsMeButton = () => {
  const [open, setOpen] = useState(false);
  const { isOwner } = useAuth();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-6 w-6 ${
                isOwner
                  ? 'text-green-500 hover:text-green-600'
                  : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={() => setOpen(true)}
            >
              {isOwner ? (
                <ShieldCheck className="h-4 w-4" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isOwner ? 'Manage Access' : "It's Me"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PasswordDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default ItsMeButton;

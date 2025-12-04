'use client';

import { Shield, ShieldCheck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';
import PasswordDialog from './PasswordDialog';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

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
            <p>{isOwner ? "It's You" : "It's Me"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PasswordDialog
        open={open}
        onOpenChange={setOpen}
        errorMessage="No, you're not me."
      />
    </>
  );
};

export default ItsMeButton;

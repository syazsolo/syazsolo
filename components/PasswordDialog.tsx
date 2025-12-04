'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Lock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { InputPassword } from '@/components/InputPassword';
import { useAuth } from '@/context/AuthContext';

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errorMessage?: string;
}

const PasswordDialog = ({
  open,
  onOpenChange,
  errorMessage = 'Incorrect password',
}: PasswordDialogProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { isOwner, login, logout } = useAuth();

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setPassword('');
      setError(false);
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'falcon') {
      login();
      handleOpenChange(false);
    } else {
      setError(true);
    }
  };

  const handleLock = () => {
    logout();
    handleOpenChange(false);
  };

  if (isOwner) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              It&apos;s You
            </DialogTitle>
            <DialogDescription>You&apos;re me.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button onClick={handleLock} variant="destructive">
              Lock Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            It&apos;s Me
          </DialogTitle>
          <DialogDescription>
            You&apos;ve found my private control panel. Visitors can ignore this
            and keep wandering around the site.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <InputPassword
              placeholder="Enter password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={error ? 'border-destructive' : ''}
              autoComplete="off"
            />
            {error && (
              <p className="text-destructive text-sm">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Unlock</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;

'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Lock, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PasswordDialog = ({ open, onOpenChange }: PasswordDialogProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { isOwner, login, logout } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'falcon') {
      login();
      onOpenChange(false);
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLock = () => {
    logout();
    onOpenChange(false);
  };

  if (isOwner) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              It's You
            </DialogTitle>
            <DialogDescription>You're me.</DialogDescription>
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            It&apos;s Me
          </DialogTitle>
          <DialogDescription>
            This feature is for the site owner. If you are a visitor, you can
            safely ignore this.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={error ? 'border-destructive' : ''}
            />
            {error && (
              <p className="text-destructive text-sm">Incorrect password</p>
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

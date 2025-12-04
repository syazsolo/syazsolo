'use client';

import { Check, Copy } from 'lucide-react';
import { ContactItem, contactItems } from '@/data/contact-info';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { profileData } from '@/data/profile';

interface ContactInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const renderContactItem = (
  item: ContactItem,
  index: number,
  copiedIndex: number | null,
  onCopy: (index: number, text: string) => void
) => {
  const Icon = item.icon;
  const isLink = item.isLink;
  const isCopied = copiedIndex === index;

  const valueClasses = `text-sm truncate ${
    isLink ? 'text-primary hover:underline' : 'text-muted-foreground'
  }`;

  const copyValue =
    isLink && item.href.startsWith('mailto:')
      ? item.value
      : isLink
        ? item.href
        : item.value;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCopy(index, copyValue);
  };

  if (isLink) {
    return (
      <div key={index} className="group flex items-center gap-3">
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md transition-colors">
            <Icon className="text-muted-foreground h-5 w-5" />
          </div>
          <div className="w-0 min-w-0 flex-1">
            <div className="text-foreground truncate text-sm font-medium">
              {item.label}
            </div>
            <div className={valueClasses}>{item.value}</div>
          </div>
        </a>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div key={index} className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md transition-colors">
        <Icon className="text-muted-foreground h-5 w-5" />
      </div>
      <div className="w-0 min-w-0 flex-1">
        <div className="text-foreground truncate text-sm font-medium">
          {item.label}
        </div>
        <div className={valueClasses}>{item.value}</div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

const ContactInfoModal = ({ open, onOpenChange }: ContactInfoModalProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const checkPopupBlocked = (popupWindow: Window | null): Promise<boolean> => {
    return new Promise(resolve => {
      if (!popupWindow) {
        resolve(true);
        return;
      }

      setTimeout(() => {
        try {
          const blocked =
            !popupWindow ||
            popupWindow.closed ||
            typeof popupWindow.closed === 'undefined';
          resolve(blocked);
        } catch {
          resolve(true);
        }
      }, 500);
    });
  };

  const handleResumeClick = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (!isMobile) {
        const popupWindow = window.open('/resume', '_blank');
        const isBlocked = await checkPopupBlocked(popupWindow);

        if (isBlocked) {
          setError(
            'Popup blocked. Please allow popups for this site in your browser settings.'
          );
        }
        return;
      }

      const response = await fetch('/resume.pdf', { method: 'HEAD' });
      if (response.ok) {
        const popupWindow = window.open('/resume.pdf', '_blank');
        const isBlocked = await checkPopupBlocked(popupWindow);

        if (isBlocked) {
          setError(
            'Popup blocked. Please allow popups for this site in your browser settings.'
          );
        }
      } else {
        setError(
          'Mobile PDF not found. Please save resume.pdf to public folder.'
        );
      }
    } catch (_err) {
      setError('Error checking for PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (index: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-5 sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle>{profileData.shortName}</DialogTitle>
        </DialogHeader>
        <p className="mt-1 text-lg">Contact Info</p>
        <div className="space-y-3 pt-2">
          {contactItems.map((item, index) =>
            renderContactItem(item, index, copiedIndex, handleCopy)
          )}
        </div>
        <div className="border-border mt-4 border-t pt-4">
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              className="rounded-full transition-opacity active:opacity-70"
              variant="default"
              onClick={handleResumeClick}
              disabled={isLoading}
            >
              {isLoading ? 'Opening...' : 'Resume'}
            </Button>
            {error && (
              <p className="animate-in fade-in text-center text-xs text-red-500 duration-200">
                {error}
              </p>
            )}
            <Button
              size="sm"
              className="rounded-full"
              variant="default"
              disabled
            >
              Cover Letter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoModal;

'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ContactItem, contactItems } from '@/data/contact-info';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
              className="rounded-full"
              variant="default"
              onClick={() => window.open('/resume', '_blank')}
            >
              Resume
            </Button>
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

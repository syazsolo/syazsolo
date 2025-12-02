'use client';

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

const renderContactItem = (item: ContactItem, index: number) => {
  const Icon = item.icon;
  const isLink = item.isLink;

  const valueClasses = `text-sm truncate ${
    isLink ? 'text-primary hover:underline' : 'text-muted-foreground'
  }`;

  const content = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-md transition-colors">
        <Icon className="text-muted-foreground h-5 w-5" />
      </div>
      <div className="w-0 min-w-0 flex-1">
        <div className="text-foreground truncate text-sm font-medium">
          {item.label}
        </div>
        <div className={valueClasses}>{item.value}</div>
      </div>
    </>
  );

  if (isLink) {
    return (
      <a
        key={index}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3"
      >
        {content}
      </a>
    );
  }

  return (
    <div key={index} className="flex items-center gap-3">
      {content}
    </div>
  );
};

const ContactInfoModal = ({ open, onOpenChange }: ContactInfoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-5 sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle>{profileData.shortName}</DialogTitle>
        </DialogHeader>
        <p className="mt-1 text-lg">Contact Info</p>
        <div className="space-y-3 pt-2">
          {contactItems.map((item, index) => renderContactItem(item, index))}
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

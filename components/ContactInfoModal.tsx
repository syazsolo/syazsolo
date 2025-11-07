'use client';

import { ContactItem, contactItems } from '@/data/contact-info';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
      <div className="w-10 h-10 flex items-center justify-center rounded-md transition-colors">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0 w-0">
        <div className="text-sm font-medium text-foreground truncate">
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
        className="flex items-center gap-3 group"
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
      <DialogContent className="sm:max-w-md pb-5">
        <DialogHeader className="relative">
          <DialogTitle>{profileData.shortName}</DialogTitle>
        </DialogHeader>
        <p className="text-lg mt-1">Contact Info</p>
        <div className="space-y-3 pt-2">
          {contactItems.map((item, index) => renderContactItem(item, index))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoModal;

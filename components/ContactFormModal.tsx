'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import ContactForm from '@/components/ContactForm';

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactFormModal = ({ open, onOpenChange }: ContactFormModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto pb-5 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            Reach out to me - I&apos;d love to hear from you!
          </DialogDescription>
        </DialogHeader>
        <div className="pt-2">
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy, FileText, Lock, MessageSquare } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';
import contactInfoData from '@/data/contact-info.json';
import { getIcon } from '@/lib/iconMapping';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import ContactFormModal from '@/components/ContactFormModal';

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href: string;
  isLink: boolean;
}

const contactItems: ContactItem[] = contactInfoData;

const renderContactItem = (
  item: ContactItem,
  index: number,
  copiedIndex: number | null,
  onCopy: (index: number, text: string) => void
) => {
  const Icon = getIcon(item.icon);
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
          <div className="min-w-0 flex-1">
            <div className="text-foreground text-sm font-medium">
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
      <div className="min-w-0 flex-1">
        <div className="text-foreground text-sm font-medium">{item.label}</div>
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

const ContactInfo = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { isOwner } = useAuth();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
    <Card className="bg-card border-border transition-colors">
      <CardContent className="px-3 pt-4 pb-6">
        <div className="space-y-4">
          {contactItems.map((item, index) =>
            renderContactItem(item, index, copiedIndex, handleCopy)
          )}
        </div>
        <div className="border-border mt-6 border-t pt-5">
          <div className="flex flex-col gap-4">
            <Button
              className="bg-primary/10 text-primary hover:bg-primary/20 w-full rounded-full font-semibold shadow-none transition-all active:scale-[0.98]"
              onClick={() => setIsContactModalOpen(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" /> Message Me
            </Button>

            <div className="space-y-2">
              <h4 className="text-muted-foreground px-1 text-xs font-medium tracking-wider uppercase">
                Documents
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  className="w-full rounded-full"
                  variant="secondary"
                  onClick={() => window.open('/resume', '_blank')}
                >
                  <FileText className="mr-2 h-4 w-4" /> Resume
                </Button>
                {isOwner ? (
                  <Button
                    size="sm"
                    className="w-full rounded-full"
                    variant="secondary"
                    onClick={() => window.open('/cover-letter', '_blank')}
                  >
                    <FileText className="mr-2 h-4 w-4" /> Cover Letter
                  </Button>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span tabIndex={0} className="block w-full">
                          <Button
                            size="sm"
                            className="w-full rounded-full opacity-50"
                            variant="secondary"
                            disabled
                          >
                            <Lock className="mr-2 h-3.5 w-3.5" /> Cover Letter
                          </Button>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Only for me</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <ContactFormModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </Card>
  );
};

export default ContactInfo;

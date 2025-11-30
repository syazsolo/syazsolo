import { Card, CardContent } from '@/components/ui/card';
import { ContactItem, contactItems } from '@/data/contact-info';

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
      <div className="min-w-0 flex-1">
        <div className="text-foreground text-sm font-medium">{item.label}</div>
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

const ContactInfo = () => {
  return (
    <Card className="bg-card border-border transition-colors">
      <CardContent className="px-3 pt-4 pb-6">
        <div className="space-y-4">
          {contactItems.map((item, index) => renderContactItem(item, index))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;

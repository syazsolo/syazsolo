import { Card, CardContent } from '@/components/ui/card';
import { ContactItem, contactItems } from '@/lib/contactInfo';

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
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">{item.label}</div>
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

const ContactInfo = () => {
  return (
    <Card className="bg-card border-border transition-colors">
      <CardContent className="pt-4 px-3 pb-6">
        <div className="space-y-4">
          {contactItems.map((item, index) => renderContactItem(item, index))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;

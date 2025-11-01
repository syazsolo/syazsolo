import { Card, CardContent } from '@/components/ui/card';
import { Link2, Linkedin, Mail, Phone } from 'lucide-react';

const ContactInfo = () => {
  const contactItems = [
    {
      icon: Link2,
      label: 'Portfolio',
      value: 'syazsolo.netlify.app',
      href: 'https://syazsolo.netlify.app/',
      isLink: true,
    },
    {
      icon: Linkedin,
      label: 'Your Profile',
      value: 'linkedin.com/in/syazani-zulkhairi-6649b4188',
      href: 'https://linkedin.com/in/syazani-zulkhairi-6649b4188',
      isLink: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '0192099853',
      href: '',
      isLink: false,
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'syazanizul@gmail.com',
      href: '',
      isLink: false,
    },
  ];

  return (
    <Card className="bg-card border-border transition-colors">
      <CardContent className="p-4">
        <div className="space-y-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return item.isLink ? (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-md transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {item.label}
                  </div>
                  <div className="text-sm text-primary truncate">
                    {item.value}
                  </div>
                </div>
              </a>
            ) : (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-md transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {item.label}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {item.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;

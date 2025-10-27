import { Card, CardContent, CardHeader } from '@/components/ui/card';

import React from 'react';

const ProfileCard = ({
  title,
  children,
  actions,
}: {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) => (
  <Card className="bg-card border-border transition-colors">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        {title ? (
          <h2 className="text-[20px] leading-6 font-semibold text-foreground">
            {title}
          </h2>
        ) : (
          <span />
        )}
        {actions}
      </div>
    </CardHeader>
    <CardContent className="pt-0">{children}</CardContent>
  </Card>
);

export default ProfileCard;

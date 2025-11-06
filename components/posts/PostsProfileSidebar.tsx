import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

import Link from 'next/link';
import { profileData } from '@/lib/profile';

const PostsProfileSidebar = () => {
  return (
    <Card className="bg-card border-border transition-colors overflow-hidden">
      <div className="h-[54px] bg-secondary">
        <img
          src={profileData.bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="relative pb-4 pt-8">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <Avatar className="w-20 h-20 border-4 border-card">
            <AvatarImage src={profileData.profileUrl} alt={profileData.name} />
            <AvatarFallback>
              {profileData.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-[14px] leading-5 font-semibold text-foreground hover:underline"
          >
            {profileData.name}
          </Link>
          <p className="text-[12px] leading-4 text-muted-foreground mt-1">
            {profileData.headline}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsProfileSidebar;

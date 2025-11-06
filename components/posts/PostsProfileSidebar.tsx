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

      <CardContent className="relative pb-4 pt-8 px-4">
        <div className="absolute -top-10 left-4">
          <Avatar className="w-[72px] h-[72px] border-4 border-card">
            <AvatarImage
              src={profileData.profileUrl}
              alt={profileData.shortName}
            />
            <AvatarFallback>
              {profileData.shortName
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="text-left">
          <Link
            href="/"
            className="text-[14px] leading-5 font-semibold text-foreground hover:underline block"
          >
            {profileData.name}
          </Link>
          <p className="text-[12px] leading-4 text-muted-foreground mt-0.5">
            {profileData.headline}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsProfileSidebar;

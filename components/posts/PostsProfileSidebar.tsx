import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

import Image from 'next/image';
import Link from 'next/link';
import profileData from '@/data/profile.json';

const PostsProfileSidebar = () => {
  return (
    <Card className="bg-card border-border overflow-hidden transition-colors">
      <div className="bg-secondary relative h-[54px]">
        <Image
          src={profileData.bannerUrl}
          alt="Banner"
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>

      <CardContent className="relative px-4 pt-8 pb-4">
        <div className="absolute -top-10 left-4">
          <Avatar className="border-card h-[72px] w-[72px] border-4">
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
            className="text-foreground block text-[14px] leading-5 font-semibold hover:underline"
          >
            {profileData.name}
          </Link>
          <p className="text-muted-foreground mt-0.5 text-[12px] leading-4">
            {profileData.headline}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsProfileSidebar;

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Globe,
  MessageCircle,
  MoreVertical,
  Repeat,
  Send,
  ThumbsUp,
} from 'lucide-react';
import { dataset, projectId } from '@/lib/sanity';

import Link from 'next/link';
import { Post } from '@/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { formatDistanceToNow } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';

type PostCardProps = {
  post: Post;
  profile: {
    name: string;
    headline: string;
    profileUrl: string;
  };
};

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const PostCard = ({ post, profile }: PostCardProps) => {
  const relative = post.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: false })
    : null;
  const imageUrl = post.image
    ? urlFor(post.image)?.width(620).height(300).url()
    : null;

  return (
    <Card className="bg-card border-border transition-colors min-h-[460px]">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="px-3 pt-3 pb-2 flex items-start gap-3">
          <Avatar className="size-9">
            <AvatarImage src={profile.profileUrl} alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="text-[14px] leading-5 font-semibold text-foreground truncate">
                  {profile.name}
                </div>
                <div className="text-[12px] text-muted-foreground leading-4">
                  {profile.headline}
                </div>
                <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  {relative && <span>{relative}</span>}
                  {relative && <span>·</span>}
                  <Globe size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link href={`/posts/${post.slug.current}`} className="px-3 mt-2">
          <p className="text-[14px] text-foreground leading-5 line-clamp-3">
            {post.excerpt || post.title}
          </p>
        </Link>

        {imageUrl && (
          <div className="mt-2 flex-1">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;

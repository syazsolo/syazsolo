import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { dataset, projectId } from '@/lib/sanity';
import { PortableText } from 'next-sanity';

import { Globe } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { formatDistanceToNow } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
import { compactPortableTextComponents } from '@/components/posts/CompactPortableText';
import { CardRenderStrategy } from '@/components/posts/strategies/CardRenderStrategy';

type BasePostCardProps = {
  post: Post;
  profile: {
    name: string;
    headline: string;
    profileUrl: string;
  };
  strategy: CardRenderStrategy;
};

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default function BasePostCard({
  post,
  profile,
  strategy,
}: BasePostCardProps) {
  const relative = post.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: false })
    : null;

  const dimensions = strategy.getDimensions();
  const imageUrl = post.image
    ? urlFor(post.image)
        ?.width(dimensions.imageWidth)
        .height(dimensions.imageHeight)
        .url()
    : null;

  const hasImage = !!imageUrl;
  const bodyContent = post.body || [];
  const lineClamps = strategy.getLineClamps();

  const renderContent = () => {
    if (hasImage) {
      return (
        <>
          <div className={`line-clamp-${lineClamps.withImage}`}>
            {bodyContent.length > 0 ? (
              <PortableText
                value={bodyContent}
                components={compactPortableTextComponents}
              />
            ) : (
              <p className="text-[14px] text-foreground leading-5">
                {post.title}
              </p>
            )}
          </div>
          {strategy.name === 'vertical' ? (
            <div className="mt-2 flex-1">
              <img
                src={imageUrl}
                alt={post.title}
                className={strategy.getImageClassName()}
              />
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={post.title}
              className={strategy.getImageClassName()}
            />
          )}
        </>
      );
    }

    return (
      <div className={`line-clamp-${lineClamps.withoutImage}`}>
        {bodyContent.length > 0 ? (
          <PortableText
            value={bodyContent}
            components={compactPortableTextComponents}
          />
        ) : (
          <>
            <h3 className="text-[16px] font-semibold text-foreground leading-6 mb-2">
              {post.title}
            </h3>
            <p className="text-[14px] text-foreground leading-6">
              {post.excerpt}
            </p>
          </>
        )}
      </div>
    );
  };

  return (
    <Card className={strategy.getCardClassName()}>
      <CardContent
        className={`p-0 ${strategy.name === 'vertical' ? 'h-full flex flex-col' : ''}`}
      >
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

        <Link
          href={`/posts/${post.slug.current}`}
          className={
            strategy.name === 'vertical'
              ? 'px-3 mt-2 flex flex-col flex-1 overflow-hidden'
              : 'block'
          }
        >
          {strategy.name === 'vertical' ? (
            renderContent()
          ) : (
            <div className={hasImage ? 'px-3 mt-2 mb-3' : 'px-3 mt-2 pb-3'}>
              {renderContent()}
            </div>
          )}
        </Link>
      </CardContent>
    </Card>
  );
}


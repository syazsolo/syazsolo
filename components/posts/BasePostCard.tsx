import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { dataset, projectId } from '@/lib/sanity';

import { CardRenderStrategy } from '@/components/posts/strategies/CardRenderStrategy';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { Post } from '@/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { compactPortableTextComponents } from '@/components/posts/CompactPortableText';
import { formatDistanceToNow } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';

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
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
    : null;

  const metadataItems = [
    relative,
    `${post.readingTimeMinutes} min read`,
  ].filter(Boolean) as string[];

  const metadataText = metadataItems.join(' · ');

  const dimensions = strategy.getDimensions();
  const imageUrl = post.imageUrl
    ? post.imageUrl
    : post.image
      ? urlFor(post.image)
          ?.width(dimensions.imageWidth)
          .height(dimensions.imageHeight)
          .url()
      : null;

  const hasImage = !!imageUrl;

  const bodyContent = post.body || [];
  const lineClamps = strategy.getLineClamps();

  const renderTextContent = () => {
    // Prefer excerpt for cards to avoid overflowing the card and hiding the image
    if (post.excerpt) {
      return (
        <p className="text-foreground text-[14px] leading-6">{post.excerpt}</p>
      );
    }

    if (hasImage) {
      return (
        <p className="text-foreground text-[14px] leading-5 font-semibold">
          {post.title}
        </p>
      );
    }

    if (bodyContent.length > 0) {
      return (
        <PortableText
          value={bodyContent}
          components={compactPortableTextComponents}
        />
      );
    }

    return (
      <p className="text-foreground text-[14px] leading-5">{post.title}</p>
    );
  };

  return (
    <Card className={strategy.getCardClassName()}>
      <CardContent className={strategy.getCardContentClassName()}>
        <div className="flex items-start gap-3 px-3 pt-3 pb-2">
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
                <div className="text-foreground truncate text-[14px] leading-5 font-semibold">
                  {profile.name}
                </div>
                <div className="text-muted-foreground text-[12px] leading-4">
                  {profile.headline}
                </div>
                <div className="text-muted-foreground flex min-w-0 items-center gap-1 text-[12px]">
                  {metadataText && (
                    <>
                      <span className="truncate">{metadataText}</span>
                      <span className="shrink-0">·</span>
                    </>
                  )}
                  <Globe size={14} className="shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`/posts/${post.slug.current}`}
          className={strategy.getPostContentWrapperClassName(hasImage)}
        >
          <div className={strategy.getTextWrapperClassName(hasImage)}>
            <div
              className={`line-clamp-${hasImage ? lineClamps.withImage : lineClamps.withoutImage}`}
            >
              {renderTextContent()}
            </div>
            <p className="text-muted-foreground mt-1.5 text-xs">... see more</p>
          </div>
          {hasImage && imageUrl && (
            <div className={`relative ${strategy.getImageWrapperClassName(hasImage)}`}>
              <Image
                src={imageUrl}
                alt={post.title}
                className={strategy.getImageClassName()}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </Link>
      </CardContent>
    </Card>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { client, dataset, projectId } from '@/lib/sanity';

import { Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { Post } from '@/types';
import PostsLayout from '@/components/layout/PostsLayout';
import PostsProfileSidebar from '@/components/posts/PostsProfileSidebar';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { formatDistanceToNow } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
import { portableTextComponents } from '@/components/posts/PortableTextComponents';
import profileData from '@/data/profile.json';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  image,
  body,
  tags,
  readingTimeMinutes
}`;

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await client.fetch<Post | null>(
    POST_QUERY,
    { slug: resolvedParams.slug },
    options
  );

  if (!post) {
    return (
      <PostsLayout leftSidebar={<PostsProfileSidebar />}>
        <Card className="bg-card border-border transition-colors">
          <CardContent className="p-8">
            <h1 className="mb-4 text-2xl font-bold">Post not found</h1>
            <Link href="/posts" className="text-primary hover:underline">
              ← Back to all posts
            </Link>
          </CardContent>
        </Card>
      </PostsLayout>
    );
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(600).url()
    : null;

  const relative = post.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
    : null;

  const metadataItems = [
    relative,
    `${post.readingTimeMinutes} min read`,
  ].filter(Boolean) as string[];

  const metadataText = metadataItems.join(' · ');

  return (
    <PostsLayout leftSidebar={<PostsProfileSidebar />}>
      <Card className="bg-card border-border transition-colors">
        <CardContent className="p-0">
          <div className="border-border border-b px-4 py-3">
            <Link
              href="/posts"
              className="text-primary inline-flex items-center gap-1 text-sm hover:underline"
            >
              ← Back to all posts
            </Link>
          </div>

          <div className="border-border flex items-start gap-3 border-b px-4 pt-3 pb-2">
            <Avatar className="size-12">
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
            <div className="min-w-0 flex-1">
              <div className="text-foreground text-sm font-semibold">
                {profileData.name}
              </div>
              <div className="text-muted-foreground text-xs">
                {profileData.headline}
              </div>
              <div className="text-muted-foreground mt-0.5 flex min-w-0 items-center gap-1 text-xs">
                {metadataText && (
                  <>
                    <span className="truncate">{metadataText}</span>
                    <span className="shrink-0">·</span>
                  </>
                )}
                <Globe size={12} className="shrink-0" />
              </div>
            </div>
          </div>

          <article className="px-4 py-4">
            {postImageUrl && (
              <div className="relative mb-6 aspect-video w-full">
                <Image
                  src={postImageUrl}
                  alt={post.title}
                  className="rounded-lg object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <h1 className="text-foreground mb-6 text-3xl leading-tight font-bold">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="mb-6 flex gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-muted text-foreground rounded-full px-3 py-1 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose-custom max-w-none">
              {Array.isArray(post.body) && (
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              )}
            </div>
          </article>
        </CardContent>
      </Card>
    </PostsLayout>
  );
}

import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { formatDistanceToNow } from 'date-fns';
import { Globe } from 'lucide-react';

import { client, projectId, dataset } from '@/lib/sanity';
import Link from 'next/link';
import PostsLayout from '@/components/layout/PostsLayout';
import PostsProfileSidebar from '@/components/posts/PostsProfileSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { profileData } from '@/lib/profile';
import { portableTextComponents } from '@/components/posts/PortableTextComponents';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  image,
  body,
  tags
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
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug: resolvedParams.slug },
    options
  );

  if (!post) {
    return (
      <PostsLayout leftSidebar={<PostsProfileSidebar />}>
        <Card className="bg-card border-border transition-colors">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
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
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: false })
    : null;

  return (
    <PostsLayout
      leftSidebar={<PostsProfileSidebar />}
      rightSidebar={
        <Card className="bg-card border-border transition-colors p-4">
          <p className="text-sm text-muted-foreground text-center">
            More content coming soon
          </p>
        </Card>
      }
    >
      <Card className="bg-card border-border transition-colors">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border">
            <Link
              href="/posts"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              ← Back to all posts
            </Link>
          </div>

          <div className="px-4 pt-3 pb-2 flex items-start gap-3 border-b border-border">
            <Avatar className="size-12">
              <AvatarImage
                src={profileData.profileUrl}
                alt={profileData.name}
              />
              <AvatarFallback>
                {profileData.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-foreground">
                {profileData.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {profileData.headline}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                {relative && (
                  <>
                    <span>{relative}</span>
                    <span>•</span>
                  </>
                )}
                <Globe size={12} />
              </div>
            </div>
          </div>

          <article className="px-4 py-4">
            {postImageUrl && (
              <img
                src={postImageUrl}
                alt={post.title}
                className="w-full aspect-video object-cover rounded-lg mb-6"
              />
            )}

            <h1 className="text-3xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-muted text-foreground rounded-full"
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

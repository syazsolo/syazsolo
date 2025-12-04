import HorizontalPostCard from '@/components/posts/HorizontalPostCard';
import { Post } from '@/types';
import PostsLayout from '@/components/layout/PostsLayout';
import PostsProfileSidebar from '@/components/posts/PostsProfileSidebar';
import Section from '@/components/Section';
import { client } from '@/lib/sanity';
import profileData from '@/data/profile.json';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  image,
  "imageUrl": image.asset->url,
  body,
  tags,
  readingTimeMinutes
}`;

const options = { next: { revalidate: 30 } };

export default async function PostsPage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);

  return (
    <PostsLayout leftSidebar={<PostsProfileSidebar />}>
      <Section title="All Posts">
        {posts.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            No posts found.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {posts.map(post => (
              <HorizontalPostCard
                key={post._id}
                post={post}
                profile={{
                  name: profileData.shortName,
                  headline: profileData.headline,
                  profileUrl: profileData.profileUrl,
                }}
              />
            ))}
          </div>
        )}
      </Section>
    </PostsLayout>
  );
}

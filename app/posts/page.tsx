import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';

import { client } from '@/lib/sanity';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, excerpt}`;

const options = { next: { revalidate: 30 } };

export default async function PostsPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        <ul className="flex flex-col gap-y-4">
          {posts.map(post => (
            <li className="hover:underline" key={post._id}>
              <Link href={`/posts/${post.slug.current}`}>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-muted-foreground mt-1">{post.excerpt}</p>
                )}
                {post.publishedAt && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

import { Post } from '@/types';
import PostCard from '@/components/posts/PostCard';
import Section from '@/components/Section';

interface PostsSectionProps {
  posts: Post[];
  profile: {
    name: string;
    headline: string;
    profileUrl: string;
  };
}

export default function PostsSection({ posts, profile }: PostsSectionProps) {
  return (
    <Section
      title="Posts"
      footer={{
        text: 'Show all posts',
        href: '/posts',
      }}
    >
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {posts.slice(0, 2).map(post => (
          <PostCard key={post._id} post={post} profile={profile} />
        ))}
      </div>
    </Section>
  );
}

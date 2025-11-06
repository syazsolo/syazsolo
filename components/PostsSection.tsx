import { Post } from '@/types';
import Section from '@/components/Section';
import VerticalPostCard from '@/components/posts/VerticalPostCard';

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
      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-primary/80">
        <div className="flex gap-3 pr-3 pb-3 snap-x snap-mandatory">
          {posts.map(post => (
            <div key={post._id} className="shrink-0 snap-start">
              <VerticalPostCard post={post} profile={profile} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

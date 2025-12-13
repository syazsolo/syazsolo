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
  id?: string;
}

export default function Posts({ posts, profile, id }: PostsSectionProps) {
  return (
    <Section
      id={id}
      title="Posts"
      footer={{
        text: 'Show all posts',
        href: '/posts',
      }}
    >
      <div className="[&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb:hover]:bg-primary/80 overflow-x-auto [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        <div className="flex snap-x snap-mandatory gap-3 pr-3 pb-3">
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

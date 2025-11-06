import BasePostCard from '@/components/posts/BasePostCard';
import { HorizontalCardStrategy } from '@/components/posts/strategies/CardRenderStrategy';
import { Post } from '@/types';

type HorizontalPostCardProps = {
  post: Post;
  profile: {
    name: string;
    headline: string;
    profileUrl: string;
  };
};

const HorizontalPostCard = ({ post, profile }: HorizontalPostCardProps) => {
  return (
    <BasePostCard
      post={post}
      profile={profile}
      strategy={new HorizontalCardStrategy()}
    />
  );
};

export default HorizontalPostCard;

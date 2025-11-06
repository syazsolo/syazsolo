import { Post } from '@/types';
import BasePostCard from '@/components/posts/BasePostCard';
import { VerticalCardStrategy } from '@/components/posts/strategies/CardRenderStrategy';

type VerticalPostCardProps = {
  post: Post;
  profile: {
    name: string;
    headline: string;
    profileUrl: string;
  };
};

const VerticalPostCard = ({ post, profile }: VerticalPostCardProps) => {
  return (
    <BasePostCard
      post={post}
      profile={profile}
      strategy={new VerticalCardStrategy()}
    />
  );
};

export default VerticalPostCard;


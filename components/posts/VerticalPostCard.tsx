import BasePostCard from '@/components/posts/BasePostCard';
import { Post } from '@/types';
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
    <div className="w-[320px]">
      <BasePostCard
        post={post}
        profile={profile}
        strategy={new VerticalCardStrategy()}
      />
    </div>
  );
};

export default VerticalPostCard;

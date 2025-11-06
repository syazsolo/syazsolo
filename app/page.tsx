import About from '@/components/About';
import ContactInfo from '@/components/ContactInfo';
import Header from '@/components/Header';
import { Post } from '@/types';
import PostsSection from '@/components/PostsSection';
import ProfileHeader from '@/components/ProfileHeader';
import ScrollActionBar from '@/components/ScrollActionBar';
import { client } from '@/lib/sanity';
import { profileData } from '@/lib/profile';

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...4]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  image,
  // project a direct URL to avoid client-side builder issues
  "imageUrl": image.asset->url,
  body,
  tags
}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);

  return (
    <div className="relative min-h-screen bg-background transition-colors pt-[52px]">
      <Header />
      <ScrollActionBar />
      <div className="container-width mx-auto md:px-6 py-3 md:py-6">
        <div className="grid grid-cols-1 min-[770px]:grid-cols-[60%_40%] min-[995px]:grid-cols-[65%_35%] min-[1200px]:grid-cols-[72%_28%] gap-4">
          <div className="flex flex-col gap-4 md:gap-2">
            <ProfileHeader />
            <About />
            <PostsSection
              posts={posts}
              profile={{
                name: profileData.shortName,
                headline: profileData.headline,
                profileUrl: profileData.profileUrl,
              }}
            />
          </div>
          <div className="hidden min-[770px]:flex min-[770px]:flex-col">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

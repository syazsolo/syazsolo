import About from '@/components/About';
import ContactInfo from '@/components/ContactInfo';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Header from '@/components/Header';
import { Post } from '@/types';
import PostsSection from '@/components/PostsSection';
import ProfileHeader from '@/components/ProfileHeader';
import ScrollActionBar from '@/components/ScrollActionBar';
import { profileData } from '@/data/profile';
import { client as sanityClient } from '@/lib/sanity';

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
  tags,
  readingTimeMinutes
}`;

export default async function Home() {
  const posts = await sanityClient.fetch<Post[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 30 } }
  );

  return (
    <div className="bg-background relative min-h-screen pt-[52px] transition-colors">
      <Header />
      <ScrollActionBar />
      <div className="container-width mx-auto py-3 md:px-6 md:py-6">
        <div className="grid grid-cols-1 gap-4 min-[770px]:grid-cols-[60%_40%] min-[995px]:grid-cols-[65%_35%] min-[1200px]:grid-cols-[72%_28%]">
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
            <Experience />
            <Education />
          </div>
          <div className="hidden min-[770px]:flex min-[770px]:flex-col">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

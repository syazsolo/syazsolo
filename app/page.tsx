import About from '@/components/About';
import ContactInfo from '@/components/ContactInfo';
import Header from '@/components/Header';
import { Post } from '@/types';
import PostsSection from '@/components/PostsSection';
import ProfileHeader from '@/components/ProfileHeader';
import { SanityDocument } from 'next-sanity';
import { client } from '@/lib/sanity';

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...4]{
  _id, title, slug, publishedAt, excerpt, image
}`;

const profile = {
  name: 'Syazani Zulkhairi',
  headline: 'Software Engineer',
  profileUrl: '/acak.jpg',
};

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);

  return (
    <div className="relative min-h-screen bg-background transition-colors">
      <Header />
      <div className="max-w-[960px] xl:max-w-[1180px] mx-auto md:px-6 py-3 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-[72fr_28fr] gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-2">
            <ProfileHeader />
            <About />
            <PostsSection posts={posts} profile={profile} />
          </div>
          <div className="hidden lg:flex lg:flex-col">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

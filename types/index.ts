export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  image?: any; // Or a more specific Sanity image type
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  image?: any;
  imageUrl?: string;
  body?: any[];
  tags?: string[];
  readingTimeMinutes: number;
}

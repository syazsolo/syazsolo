export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  image?: unknown;
  imageUrl?: string;
  body?: unknown[];
  tags?: string[];
  readingTimeMinutes: number;
}

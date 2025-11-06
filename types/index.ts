export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  image?: any;
  body?: any[];
  tags?: string[];
}

import type { TypedObject } from '@portabletext/types';

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  image?: unknown;
  imageUrl?: string;
  body?: TypedObject[];
  tags?: string[];
  readingTimeMinutes: number;
}

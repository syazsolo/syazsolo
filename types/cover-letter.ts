export type ContentItem =
  | string
  | ContentItem[]
  | {
      type: 'image';
      src: string;
      caption?: string;
    }
  | {
      type: 'ul' | 'ol';
      items: ContentItem[];
    }
  | {
      type: 'link';
      text: string;
      to: string;
    };

export interface CoverLetterEntry {
  id: string;
  company: string;
  role: string;
  date: string;
  content: ContentItem[];
  regards: ContentItem[];
}

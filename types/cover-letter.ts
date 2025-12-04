export type ContentItem =
  | string
  | {
      type?: string;
      items?: ContentItem[];
      text?: string;
      to?: string;
      [key: string]: unknown;
    };

export interface CoverLetterEntry {
  id: string;
  company: string;
  role: string;
  date: string;
  content: ContentItem[];
  regards: ContentItem[];
}

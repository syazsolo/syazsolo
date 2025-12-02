export type ContentItem = string | {
  type?: string;
  items?: ContentItem[];
  [key: string]: any;
};

export interface CoverLetterEntry {
  id: string;
  company: string;
  role: string;
  date: string;
  content: ContentItem[];
  regards: ContentItem[];
}

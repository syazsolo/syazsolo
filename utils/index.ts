import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseFormattedText(
  text: string
): Array<{ text: string; italic: boolean; bold: boolean }> {
  const parts: Array<{ text: string; italic: boolean; bold: boolean }> = [];
  let currentIndex = 0;

  // Match either __italic__ or *bold*
  const combinedRegex = /__([^_]+)__|\*([^*]+)\*/g;
  let match: RegExpExecArray | null;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push({
        text: text.slice(currentIndex, match.index),
        italic: false,
        bold: false,
      });
    }

    const italicGroup = match[1];
    const boldGroup = match[2];
    parts.push({
      text: italicGroup ?? boldGroup ?? '',
      italic: Boolean(italicGroup),
      bold: Boolean(boldGroup),
    });

    currentIndex = match.index + match[0].length;
  }

  if (currentIndex < text.length) {
    parts.push({
      text: text.slice(currentIndex),
      italic: false,
      bold: false,
    });
  }

  if (parts.length === 0) {
    parts.push({ text, italic: false, bold: false });
  }

  return parts;
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseItalicText(
  text: string
): Array<{ text: string; italic: boolean }> {
  const parts: Array<{ text: string; italic: boolean }> = [];
  let currentIndex = 0;

  // Match text wrapped in double underscores (WhatsApp style)
  const italicRegex = /__([^_]+)__/g;
  let match;

  while ((match = italicRegex.exec(text)) !== null) {
    // Add text before the italic part
    if (match.index > currentIndex) {
      parts.push({
        text: text.slice(currentIndex, match.index),
        italic: false,
      });
    }

    // Add the italic part
    parts.push({
      text: match[1],
      italic: true,
    });

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text after the last match
  if (currentIndex < text.length) {
    parts.push({
      text: text.slice(currentIndex),
      italic: false,
    });
  }

  // If no italic text found, return the original text
  if (parts.length === 0) {
    parts.push({ text, italic: false });
  }

  return parts;
}

export type ContentItem = string | { type: 'ul' | 'ol'; items: ContentItem[] };

export function extractFields(content: ContentItem[]): string[] {
  const fields = new Set<string>();
  const regex = /{{(.*?)}}/g;

  function traverse(items: ContentItem[]) {
    items.forEach((item) => {
      if (typeof item === 'string') {
        const matches = item.match(regex);
        if (matches) {
          matches.forEach((match) =>
            fields.add(match.replace(/{{|}}/g, '').trim())
          );
        }
      } else {
        traverse(item.items);
      }
    });
  }

  traverse(content);
  return Array.from(fields);
}

export function replaceFields(
  content: ContentItem[],
  values: Record<string, string>
): ContentItem[] {
  function traverse(items: ContentItem[]): ContentItem[] {
    return items.map((item) => {
      if (typeof item === 'string') {
        let result = item;
        Object.entries(values).forEach(([key, value]) => {
          const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
          result = result.replace(regex, value);
        });
        return result;
      } else {
        return {
          ...item,
          items: traverse(item.items),
        };
      }
    });
  }

  return traverse(content);
}

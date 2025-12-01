export function extractFields(template: string): string[] {
  const regex = /{{(.*?)}}/g;
  const matches = template.match(regex);
  if (!matches) return [];
  
  // Remove brackets and trim whitespace, then return unique values
  return Array.from(new Set(matches.map(match => match.replace(/{{|}}/g, '').trim())));
}

export function replaceFields(template: string, values: Record<string, string>): string {
  let result = template;
  Object.entries(values).forEach(([key, value]) => {
    // Create a regex that matches the key with surrounding brackets, handling potential whitespace
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
}

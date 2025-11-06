export function extractTextFromBody(body: any[]): string {
  if (!body || !Array.isArray(body)) return '';

  const textBlocks = body
    .filter(block => block._type === 'block')
    .map(block => {
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .filter((child: any) => child._type === 'span' && child.text)
          .map((child: any) => child.text)
          .join('');
      }
      return '';
    })
    .filter(text => text.length > 0);

  return textBlocks.join(' ');
}

export function getPostPreviewText(post: any, maxLength: number = 200): string {
  if (post.excerpt) {
    return post.excerpt;
  }

  const bodyText = extractTextFromBody(post.body);
  if (bodyText.length <= maxLength) {
    return bodyText;
  }

  return bodyText.substring(0, maxLength).trim() + '...';
}


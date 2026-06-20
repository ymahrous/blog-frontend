export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function excerpt(content: string, length = 160): string {
  if (content.length <= length) return content;
  return content.slice(0, length).replace(/\s+\S*$/, '') + '…';
}

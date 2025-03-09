
import { ArticleMetadata, ArticleContent } from './articleTypes';
import { processMarkdown } from './markdownProcessor';

/**
 * Extracts metadata from article path and content
 * @param filePath Path of the markdown file
 * @param content Raw markdown content
 */
export async function extractArticleData(filePath: string, content: string): Promise<ArticleContent> {
  return await processMarkdown(filePath, content);
}

/**
 * Formats a date string into a localized date format
 * @param dateString ISO date string
 * @param locale Locale for formatting (default: 'en-US')
 */
export function formatArticleDate(dateString: string, locale = 'en-US'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Formats a category string for display (converts slug to title case)
 * @param category Category slug
 */
export function formatCategoryName(category: string | undefined): string {
  if (!category) return '';
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Estimates reading time for content
 * @param content HTML content or plain text
 * @param wordsPerMinute Average reading speed (default: 200)
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): string {
  // Remove HTML tags for accurate word count
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.split(/\s+/).length;
  const readingTimeMin = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTimeMin} min read`;
}

/**
 * Generates citation text for an article
 * @param metadata Article metadata
 */
export function generateCitation(metadata: ArticleMetadata): string {
  const authors = 'ScholarHub'; // Default author if none specified
  const year = new Date(metadata.date).getFullYear();
  const title = metadata.title;

  return `${authors} (${year}). "${title}". ScholarHub Academic Journal Database. Retrieved on ${new Date().toLocaleDateString()}.`;
}

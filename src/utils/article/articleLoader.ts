
import { ArticleContent, ArticleMetadata, ArticleListResult } from './articleTypes';
import { extractArticleData } from './articleExtractor';
import { getArticleBySlug, fetchArticles } from './articleApi';

/**
 * Loads articles from the filesystem
 * In a production environment, this would use server-side functions
 * to read articles from the file system.
 */
export async function loadArticles(category?: string, page: number = 1, limit: number = 10): Promise<ArticleListResult> {
  // In client-side, use the mocked API
  const { articles, totalPages } = await fetchArticles(category, page, limit);
  
  return {
    articles,
    totalPages,
    currentPage: page,
    totalArticles: articles.length * totalPages // Approximate count for the mock version
  };
}

/**
 * Loads a single article by slug
 */
export async function loadArticle(category: string, slug: string): Promise<ArticleContent | null> {
  // In client-side, use the mocked API
  return await getArticleBySlug(category, slug);
}

/**
 * Instructions for adding real articles:
 * 
 * 1. Place article markdown files in `/public/content/articles/[category]/YYYY-MM-DD-slug.md`
 * 2. Update this function to load from the filesystem in a real production deployment
 * 3. In development, you can place articles in the public folder and fetch them with fetch()
 */
export async function loadRealArticle(category: string, slug: string): Promise<ArticleContent | null> {
  try {
    // In a real app, this would access the filesystem or a CMS
    // In this demo, we fetch from the public folder
    const response = await fetch(`/content/articles/${category}/${slug}.md`);
    
    if (!response.ok) {
      console.error(`Failed to load article: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const content = await response.text();
    const filePath = `/content/articles/${category}/${slug}.md`;
    
    // Process the markdown content
    return await extractArticleData(filePath, content);
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
}

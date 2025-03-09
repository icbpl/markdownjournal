
import { ArticleMetadata } from '../article/articleTypes';

/**
 * Function to search articles
 */
export async function searchArticles(query: string): Promise<ArticleMetadata[]> {
  // In a real implementation, this would use a search index or database
  // For demo purposes, we'll return mock results
  
  if (!query || query.trim() === '') {
    return [];
  }
  
  // Create mock search results
  const categories = ['engineering', 'medicine', 'computer-science', 'biology', 'physics'];
  const results: ArticleMetadata[] = [];
  
  // Generate 8 mock results for better demonstration
  for (let i = 0; i < 8; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    results.push({
      title: `Research on ${query} in ${category}`,
      date: new Date().toISOString(),
      category,
      slug: `research-on-${query.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      tags: [query.toLowerCase(), category, 'research'],
      pdfUrl: `/pdfs/${category}/research-${i + 1}.pdf`,
      excerpt: `This article discusses ${query} in the context of ${category} research. It provides insights into how ${query} affects various aspects of ${category}.`
    });
  }
  
  return results;
}

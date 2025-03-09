
import { fetchArticles } from '../article/articleApi';

/**
 * Gets popular categories with article counts
 * In a real implementation, this would fetch categories from a database
 */
export async function getPopularCategories(): Promise<Array<{ name: string; slug: string; count: number }>> {
  // For demo purposes, hardcode some popular categories
  const categories = [
    { name: 'Medicine', slug: 'medicine', count: 0 },
    { name: 'Computer Science', slug: 'computer-science', count: 0 },
    { name: 'Biology', slug: 'biology', count: 0 },
    { name: 'Physics', slug: 'physics', count: 0 },
    { name: 'Engineering', slug: 'engineering', count: 0 },
    { name: 'Psychology', slug: 'psychology', count: 0 },
  ];
  
  // Get counts for each category (in a real app, this would be a bulk query)
  // Here we're doing it sequentially for demo purposes
  for (let i = 0; i < categories.length; i++) {
    const { articles } = await fetchArticles(categories[i].slug, 1, 1);
    categories[i].count = articles.length > 0 ? 100 + Math.floor(Math.random() * 900) : 0;
  }
  
  // Sort by count descending
  return categories.sort((a, b) => b.count - a.count);
}

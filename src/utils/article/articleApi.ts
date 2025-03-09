
import { ArticleMetadata, ArticleContent } from './articleTypes';

/**
 * Mock function to get an article by slug
 */
export async function getArticleBySlug(category: string, slug: string): Promise<ArticleContent | null> {
  // In a real implementation, this would fetch the actual article file
  // For demo purposes, we'll create a mock article
  
  if (!category || !slug) {
    return null;
  }
  
  const metadata: ArticleMetadata = {
    title: `Sample Article about ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    date: new Date().toISOString(),
    category,
    slug,
    tags: ['sample', 'research', category],
    pdfUrl: `/pdfs/${category}/${slug}.pdf`,
    excerpt: `This is a sample excerpt for a ${category} article. It provides a brief overview of what the article contains.`
  };
  
  const content = `
  <h1>${metadata.title}</h1>
  
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eget nisl. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eget nisl.</p>
  
  <h2>Abstract</h2>
  
  <p>This paper explores the latest advances in ${category} research. We present a comprehensive review of the current state of the art and discuss future directions for the field.</p>
  
  <h2>Introduction</h2>
  
  <p>The field of ${category} has seen significant advancements in recent years. Researchers have made breakthrough discoveries that have revolutionized our understanding of ${category}.</p>
  
  <p>In this paper, we provide a detailed analysis of these developments and their implications for future research.</p>
  
  <h2>Methodology</h2>
  
  <p>Our research methodology involved a systematic review of the literature, combined with experimental validation of key findings. We collected data from multiple sources and analyzed it using state-of-the-art techniques.</p>
  
  <h2>Results</h2>
  
  <p>Our analysis revealed several interesting patterns in the data. First, we found that...</p>
  
  <p>Second, our experiments demonstrated that...</p>
  
  <p>Finally, we observed that...</p>
  
  <h2>Discussion</h2>
  
  <p>These findings have important implications for the field of ${category}. They suggest that...</p>
  
  <p>Furthermore, our results indicate that...</p>
  
  <h2>Conclusion</h2>
  
  <p>In conclusion, our study provides valuable insights into the current state of ${category} research. We believe that our findings will contribute to the advancement of the field and inspire future research in this area.</p>
  
  <h2>References</h2>
  
  <ol>
    <li>Smith, J. (2022). Advances in ${category} research. Journal of ${category}, 45(2), 112-128.</li>
    <li>Johnson, A., & Lee, B. (2021). A comprehensive review of ${category} theories. Annual Review of ${category}, 12, 34-56.</li>
    <li>Brown, C., et al. (2023). Experimental validation of ${category} principles. Nature ${category}, 8, 789-802.</li>
  </ol>
  `;
  
  return { metadata, content };
}

/**
 * Mock function to fetch articles
 * This would be replaced with actual API calls or file system access
 */
export async function fetchArticles(category?: string, page: number = 1, limit: number = 10): Promise<{
  articles: ArticleMetadata[];
  totalPages: number;
}> {
  // This is a mock function - in a real implementation, you would fetch from your API or file system
  const mockArticles: ArticleMetadata[] = [];
  
  // Generate mock data
  const categories = ['engineering', 'medicine', 'computer-science', 'biology', 'physics'];
  const totalArticles = 200;
  
  for (let i = 0; i < totalArticles; i++) {
    const articleCategory = categories[i % categories.length];
    
    // Skip if category is specified and doesn't match
    if (category && articleCategory !== category) {
      continue;
    }
    
    const date = new Date();
    date.setDate(date.getDate() - i); // Each article is one day older
    
    mockArticles.push({
      title: `Sample Article ${i + 1} about ${articleCategory}`,
      date: date.toISOString(),
      category: articleCategory,
      slug: `sample-article-${i + 1}`,
      tags: [`tag-${i % 5 + 1}`, `tag-${i % 7 + 1}`],
      pdfUrl: `/pdfs/${articleCategory}/sample-article-${i + 1}.pdf`,
      excerpt: `This is a sample excerpt for article ${i + 1} in the ${articleCategory} category. It provides a brief overview of what the article contains.`
    });
  }
  
  // Sort by date (newest first)
  mockArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Calculate pagination
  const totalResults = mockArticles.length;
  const totalPages = Math.ceil(totalResults / limit);
  const startIndex = (page - 1) * limit;
  const paginatedArticles = mockArticles.slice(startIndex, startIndex + limit);
  
  return {
    articles: paginatedArticles,
    totalPages,
  };
}

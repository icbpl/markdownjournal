
// This file now just re-exports from the refactored modules
import { processMarkdown, generateArticleSchema, generateCitations } from './article/markdownProcessor';
import { fetchArticles, getArticleBySlug } from './article/articleApi';
import { getPopularCategories } from './category/categoryApi';
import { searchArticles } from './search/searchApi';
import { 
  formatArticleDate, 
  formatCategoryName, 
  calculateReadingTime,
  generateCitation 
} from './article/articleExtractor';

// Re-export types with the proper "export type" syntax for isolatedModules
import type { ArticleMetadata, ArticleContent, SearchResult, ArticleListResult } from './article/articleTypes';
export type { ArticleMetadata, ArticleContent, SearchResult, ArticleListResult };

// Re-export functions
export {
  // Markdown processing
  processMarkdown,
  generateArticleSchema,
  generateCitations,
  
  // Article APIs
  fetchArticles,
  getArticleBySlug,
  
  // Category APIs
  getPopularCategories,
  
  // Search APIs
  searchArticles,
  
  // Formatting utilities
  formatArticleDate,
  formatCategoryName,
  calculateReadingTime,
  generateCitation
};

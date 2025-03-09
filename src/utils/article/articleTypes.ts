
// Define common types for articles
export interface ArticleMetadata {
  title: string;
  date: string;
  category: string;
  slug: string;
  tags: string[];
  pdfUrl?: string | null;
  excerpt: string;
  authors?: string[];
  doi?: string | null;
  journal?: string | null;
  volume?: string | null;
  issue?: string | null;
  pages?: string | null;
  publisher?: string | null;
}

export interface ArticleContent {
  metadata: ArticleMetadata;
  content: string;
}

// Define search result interface
export interface SearchResult {
  article: ArticleMetadata;
  score: number;
  matches?: Array<{
    key: string;
    value: string;
    indices: number[][];
  }>;
}

// Article listing result with pagination
export interface ArticleListResult {
  articles: ArticleMetadata[];
  totalPages: number;
  currentPage: number;
  totalArticles: number;
}

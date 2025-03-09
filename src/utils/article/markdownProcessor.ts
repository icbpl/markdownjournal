
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import localForage from 'localforage';
import { ArticleMetadata, ArticleContent } from './articleTypes';

// Cache for parsed markdown
const markdownCache = localForage.createInstance({
  name: 'markdownCache',
});

/**
 * Process markdown content with front matter
 * @param filePath Path to the markdown file
 * @param content Raw markdown content
 */
export async function processMarkdown(filePath: string, content: string): Promise<ArticleContent> {
  // Check cache first
  const cacheKey = `md_${filePath}`;
  const cached = await markdownCache.getItem<ArticleContent>(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  // Parse front matter
  const { data, content: markdownContent } = matter(content);
  
  // Extract category from filepath - assuming format: /content/articles/[category]/[filename].md
  const pathParts = filePath.split('/');
  const category = pathParts[pathParts.length - 2] || 'uncategorized';
  
  // Extract date from filename - assuming format: YYYY-MM-DD-{slug}.md
  const filename = pathParts[pathParts.length - 1];
  let date = new Date().toISOString();
  
  if (data.date) {
    // Use date from front matter if available
    date = new Date(data.date).toISOString();
  } else {
    // Try to extract date from filename
    const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      date = new Date(dateMatch[1]).toISOString();
    }
  }
  
  // Extract slug from filename
  const slugMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/) || filename.match(/^(.+)\.md$/);
  const slug = slugMatch ? slugMatch[1] : filename.replace('.md', '');
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(html, { sanitize: false }) // Allow HTML in markdown
    .process(markdownContent);
  
  const contentHtml = processedContent.toString();
  
  // Generate excerpt - first 160 chars of content without HTML tags
  const excerpt = markdownContent
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Replace links with just text
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/(\r\n|\n|\r)/gm, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .substring(0, 160)
    .trim() + '...';
  
  // Prepare metadata
  const metadata: ArticleMetadata = {
    title: data.title || 'Untitled Article',
    date,
    category,
    slug,
    tags: data.tags || [],
    pdfUrl: data.pdfUrl || null,
    excerpt,
    authors: data.authors || [],
    doi: data.doi || null,
    journal: data.journal || 'ScholarHub',
    volume: data.volume || null,
    issue: data.issue || null,
    pages: data.pages || null,
    publisher: data.publisher || 'ScholarHub Academy',
  };
  
  const result = { metadata, content: contentHtml };
  
  // Store in cache
  await markdownCache.setItem(cacheKey, result);
  
  return result;
}

/**
 * Generate JSON-LD schema for an article
 * @param metadata Article metadata
 * @param url Full URL of the article
 */
export function generateArticleSchema(metadata: ArticleMetadata, url: string): string {
  // Create authors array
  const authors = metadata.authors && metadata.authors.length 
    ? metadata.authors.map(author => ({
        "@type": "Person",
        "name": author
      }))
    : [{
        "@type": "Organization",
        "name": "ScholarHub"
      }];
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": metadata.title,
    "datePublished": metadata.date,
    "author": authors,
    "publisher": {
      "@type": "Organization",
      "name": metadata.publisher || "ScholarHub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://scholarhub.example.com/logo.png" // Replace with actual logo URL
      }
    },
    "url": url,
    "isAccessibleForFree": true,
    "keywords": metadata.tags.join(", ")
  };
  
  // Add optional fields if they exist
  if (metadata.doi) {
    schema["sameAs"] = `https://doi.org/${metadata.doi}`;
  }
  
  if (metadata.journal) {
    schema["isPartOf"] = {
      "@type": "Periodical",
      "name": metadata.journal
    };
  }
  
  if (metadata.volume) {
    schema["volumeNumber"] = metadata.volume;
  }
  
  if (metadata.issue) {
    schema["issueNumber"] = metadata.issue;
  }
  
  if (metadata.pages) {
    schema["pagination"] = metadata.pages;
  }
  
  return JSON.stringify(schema);
}

/**
 * Generate citation metadata in various formats
 * @param metadata Article metadata
 */
export function generateCitations(metadata: ArticleMetadata): { apa: string; mla: string; chicago: string; } {
  // Extract components needed for citations
  const title = metadata.title;
  const authors = metadata.authors && metadata.authors.length 
    ? metadata.authors.join(", ")
    : "ScholarHub";
  const year = new Date(metadata.date).getFullYear();
  const journal = metadata.journal || "ScholarHub Academic Journal";
  const volume = metadata.volume || "";
  const issue = metadata.issue || "";
  const pages = metadata.pages || "";
  const doi = metadata.doi ? `https://doi.org/${metadata.doi}` : "";
  
  // APA format
  const apa = `${authors} (${year}). ${title}. ${journal}${volume ? `, ${volume}` : ""}${issue ? `(${issue})` : ""}${pages ? `, ${pages}` : ""}. ${doi}`;
  
  // MLA format
  const mla = `${authors}. "${title}." ${journal}${volume ? ` ${volume}` : ""}${issue ? `.${issue}` : ""} (${year})${pages ? `: ${pages}` : ""}. ${doi ? `Web. ` : ""}`;
  
  // Chicago format
  const chicago = `${authors}. "${title}." ${journal}${volume ? ` ${volume}` : ""}${issue ? `, no. ${issue}` : ""} (${year})${pages ? `: ${pages}` : ""}. ${doi}`;
  
  return { apa, mla, chicago };
}

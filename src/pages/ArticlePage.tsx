
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Share2, Download, Bookmark, Printer, Clock, Calendar, Tag, ChevronLeft, Book, FileText, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdBanner from '../components/AdBanner';
import ReadingProgressBar from '../components/ReadingProgressBar';
import { 
  getArticleBySlug, 
  generateArticleSchema, 
  generateCitations,
  ArticleMetadata 
} from '../utils/markdownUtils';
import { 
  formatArticleDate,
  formatCategoryName,
  calculateReadingTime
} from '../utils/article/articleExtractor';

const ArticlePage: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [article, setArticle] = useState<{ metadata: ArticleMetadata; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState('5 min');
  const [citations, setCitations] = useState<{ apa: string; mla: string; chicago: string } | null>(null);
  
  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      
      try {
        if (!category || !slug) return;
        
        const articleData = await getArticleBySlug(category, slug);
        setArticle(articleData);
        
        // Calculate reading time
        if (articleData) {
          setReadingTime(calculateReadingTime(articleData.content));
          
          // Generate citations
          const citationData = generateCitations(articleData.metadata);
          setCitations(citationData);
        }
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticle();
    
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [category, slug]);
  
  const categoryName = formatCategoryName(category);
  
  // Share article functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.metadata.title || 'Academic Article',
        text: article?.metadata.excerpt || 'Check out this academic article',
        url: window.location.href
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard'))
        .catch(err => console.error('Error copying link:', err));
    }
  };
  
  // Handle citation copy
  const handleCopyCitation = (citationText: string) => {
    navigator.clipboard.writeText(citationText)
      .then(() => alert('Citation copied to clipboard'))
      .catch(err => console.error('Error copying citation:', err));
  };
  
  // Handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        {article && (
          <>
            <title>{article.metadata.title} | ScholarHub</title>
            <meta name="description" content={article.metadata.excerpt} />
            <meta property="og:title" content={article.metadata.title} />
            <meta property="og:description" content={article.metadata.excerpt} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={window.location.href} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={article.metadata.title} />
            <meta name="twitter:description" content={article.metadata.excerpt} />
            {article.metadata.doi && (
              <meta name="citation_doi" content={article.metadata.doi} />
            )}
            {article.metadata.journal && (
              <meta name="citation_journal_title" content={article.metadata.journal} />
            )}
            {article.metadata.authors && article.metadata.authors.map((author, index) => (
              <meta key={index} name="citation_author" content={author} />
            ))}
            <meta name="citation_publication_date" content={new Date(article.metadata.date).toISOString().split('T')[0]} />
            <meta name="citation_title" content={article.metadata.title} />
            {article.metadata.pdfUrl && (
              <meta name="citation_pdf_url" content={article.metadata.pdfUrl} />
            )}
            <script type="application/ld+json">
              {generateArticleSchema(article.metadata, window.location.href)}
            </script>
          </>
        )}
      </Helmet>
      
      {/* Reading Progress Bar */}
      <ReadingProgressBar 
        targetElement="article"
        height={5}
        color="#002856"
      />
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              to={`/journals/${category}`}
              className="inline-flex items-center text-academic-600 hover:text-academic-800"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to {categoryName} Journals</span>
            </Link>
          </div>
          
          {loading ? (
            // Loading skeleton
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            </div>
          ) : article ? (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Article Header */}
                <header className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Link
                      to={`/journals/${article.metadata.category}`}
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-academic-50 text-academic-700 hover:bg-academic-100 transition-colors"
                    >
                      {formatCategoryName(article.metadata.category)}
                    </Link>
                    
                    {article.metadata.journal && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {article.metadata.journal}
                      </span>
                    )}
                    
                    {article.metadata.tags.slice(0, 3).map(tag => (
                      <Link
                        key={tag}
                        to={`/search?q=${encodeURIComponent(tag)}`}
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-academic-900 mb-4">
                    {article.metadata.title}
                  </h1>
                  
                  {/* Authors */}
                  {article.metadata.authors && article.metadata.authors.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-lg text-gray-700">
                        By {article.metadata.authors.join(", ")}
                      </h2>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center text-gray-600 gap-4 md:gap-6 mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-academic-400" />
                      <time dateTime={new Date(article.metadata.date).toISOString()}>
                        {formatArticleDate(article.metadata.date)}
                      </time>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-academic-400" />
                      <span>{readingTime}</span>
                    </div>
                    
                    {article.metadata.doi && (
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-academic-400" />
                        <a 
                          href={`https://doi.org/${article.metadata.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          DOI: {article.metadata.doi}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {/* Journal info if available */}
                  {(article.metadata.journal || article.metadata.volume || article.metadata.issue) && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-academic-400" />
                        <span>
                          {article.metadata.journal || "ScholarHub Journal"}
                          {article.metadata.volume && `, Volume ${article.metadata.volume}`}
                          {article.metadata.issue && `, Issue ${article.metadata.issue}`}
                          {article.metadata.pages && `, Pages ${article.metadata.pages}`}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <Button 
                      onClick={handleShare}
                      variant="outline" 
                      size="sm"
                      className="flex items-center text-gray-700"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    
                    {article.metadata.pdfUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center text-gray-700"
                        asChild
                      >
                        <a href={article.metadata.pdfUrl} download>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center text-gray-700"
                      onClick={() => alert('Article saved to your bookmarks')}
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center text-gray-700"
                      onClick={handlePrint}
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    
                    {citations && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center text-gray-700"
                          >
                            <Quote className="h-4 w-4 mr-2" />
                            Cite
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64">
                          <DropdownMenuLabel>Citation Formats</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem onClick={() => handleCopyCitation(citations.apa)}>
                            <div className="flex flex-col">
                              <span className="font-medium">APA</span>
                              <span className="text-xs text-gray-500 truncate">{citations.apa.substring(0, 50)}...</span>
                            </div>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => handleCopyCitation(citations.mla)}>
                            <div className="flex flex-col">
                              <span className="font-medium">MLA</span>
                              <span className="text-xs text-gray-500 truncate">{citations.mla.substring(0, 50)}...</span>
                            </div>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem onClick={() => handleCopyCitation(citations.chicago)}>
                            <div className="flex flex-col">
                              <span className="font-medium">Chicago</span>
                              <span className="text-xs text-gray-500 truncate">{citations.chicago.substring(0, 50)}...</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </header>
                
                {/* Ad Banner */}
                <AdBanner size="category-top" className="mb-8" />
                
                {/* Article Content */}
                <article 
                  className="prose prose-academic max-w-none lg:prose-lg"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="font-medium text-gray-900">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.metadata.tags.map(tag => (
                        <Link
                          key={tag}
                          to={`/search?q=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Citation section */}
                  {citations && (
                    <div className="mt-8">
                      <h3 className="font-medium text-gray-900 mb-4">How to Cite</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">APA Format</h4>
                          <p className="text-sm text-gray-700">{citations.apa}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleCopyCitation(citations.apa)}
                          >
                            Copy
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">MLA Format</h4>
                          <p className="text-sm text-gray-700">{citations.mla}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleCopyCitation(citations.mla)}
                          >
                            Copy
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Chicago Format</h4>
                          <p className="text-sm text-gray-700">{citations.chicago}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleCopyCitation(citations.chicago)}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </footer>
                
                {/* In-article Ad */}
                <div className="mt-12">
                  <AdBanner size="inarticle" className="mx-auto" />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Article Not Found</h2>
              <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-academic-500 text-white rounded hover:bg-academic-600 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticlePage;

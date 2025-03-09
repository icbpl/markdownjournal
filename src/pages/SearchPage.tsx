
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import JournalCard from '../components/JournalCard';
import Pagination from '../components/Pagination';
import AdBanner from '../components/AdBanner';
import { useToast } from '../hooks/use-toast';
import { searchArticles } from '../utils/markdownUtils';
import { ArticleMetadata } from '../utils/article/articleTypes';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<ArticleMetadata[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const resultsPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    // Reset to first page when query changes
    setPage(1);
    
    if (!query) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      try {
        // Use the real search API
        const searchResults = await searchArticles(query);
        
        // Apply category filter if specified
        const filteredResults = categoryFilter
          ? searchResults.filter(article => 
              article.category.toLowerCase() === categoryFilter.toLowerCase()
            )
          : searchResults;
        
        setTotalResults(filteredResults.length);
        
        // Paginate results
        const startIndex = (page - 1) * resultsPerPage;
        const paginatedResults = filteredResults.slice(startIndex, startIndex + resultsPerPage);
        
        setResults(paginatedResults);
        
        // Show toast notification
        if (filteredResults.length === 0 && query) {
          toast({
            title: "No results found",
            description: "Try adjusting your search terms or filters",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Search error:', error);
        toast({
          title: "Search failed",
          description: "There was an error processing your search",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [query, categoryFilter, page, toast]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}${categoryFilter ? `&category=${categoryFilter}` : ''}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create base URL for pagination
  const getPaginationBaseUrl = () => {
    return `/search?q=${query}${categoryFilter ? `&category=${categoryFilter}` : ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-8"
      aria-labelledby="search-heading"
    >
      <h1 id="search-heading" className="text-3xl font-serif font-bold text-academic-700 mb-6">
        {query ? `Search Results for "${query}"` : 'Search'}
      </h1>
      
      {/* Search form */}
      <form onSubmit={handleSearchSubmit} className="mb-8">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for research papers, journals, and scholarly articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border border-gray-300 focus:border-academic-500 focus:ring-2 focus:ring-academic-200 transition-colors"
            aria-label="Search journals"
          />
          <Search className="absolute left-4 text-academic-400 h-6 w-6" />
          <button 
            type="submit" 
            className="absolute right-3 bg-academic-500 text-white rounded-full p-2 hover:bg-academic-600 transition-colors"
            aria-label="Submit search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>
      
      {/* Ad banner at the top of search results */}
      <div className="mb-8" role="complementary" aria-label="Advertisement">
        <AdBanner size="category-top" className="h-24 mb-8" />
      </div>
      
      {query && (
        <p className="text-gray-600 mb-8" aria-live="polite">
          {loading ? 'Searching...' : `Found ${totalResults} ${totalResults === 1 ? 'result' : 'results'}`}
          {categoryFilter && ` in category "${categoryFilter}"`}
        </p>
      )}
      
      {/* Search results */}
      <div 
        className="grid grid-cols-1 gap-6 mb-8"
        role="region" 
        aria-label="Search results"
      >
        {loading ? (
          // Loading skeleton
          [...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden p-5 h-48">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : (
          results.map((article) => (
            <JournalCard 
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              category={article.category}
              slug={article.slug}
              tags={article.tags}
            />
          ))
        )}
      </div>
      
      {/* No results message */}
      {query && !loading && results.length === 0 && (
        <div className="text-center py-16" aria-live="polite">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No results found</h3>
          <p className="text-gray-500">
            Try adjusting your search terms or removing filters
          </p>
        </div>
      )}
      
      {/* Pagination */}
      {totalResults > resultsPerPage && (
        <div className="mt-8" role="navigation" aria-label="Pagination">
          <Pagination 
            currentPage={page}
            totalPages={Math.ceil(totalResults / resultsPerPage)}
            baseUrl={getPaginationBaseUrl()}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SearchPage;

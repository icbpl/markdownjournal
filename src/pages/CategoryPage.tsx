
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import JournalCard from '../components/JournalCard';
import Pagination from '../components/Pagination';
import AdBanner from '../components/AdBanner';
import ReadingProgressBar from '../components/ReadingProgressBar';
import { fetchArticles, ArticleMetadata } from '../utils/markdownUtils';

const CategoryPage: React.FC = () => {
  const { category, page } = useParams<{ category: string; page: string }>();
  const location = useLocation();
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Extract page number from URL or query params
  useEffect(() => {
    const pageParam = page ? parseInt(page, 10) : 1;
    const pageMatch = location.pathname.match(/\/page\/(\d+)/);
    const detectedPage = pageMatch ? parseInt(pageMatch[1], 10) : pageParam;
    setCurrentPage(detectedPage);
  }, [location.pathname, page]);
  
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      
      try {
        if (!category) return;
        
        const { articles: fetchedArticles, totalPages: pages } = await fetchArticles(
          category,
          currentPage,
          50 // Show 50 articles per page
        );
        
        setArticles(fetchedArticles);
        setTotalPages(pages);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, [category, currentPage]);
  
  // Format category name for display
  const formatCategoryName = (cat: string | undefined) => {
    if (!cat) return '';
    return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const categoryTitle = formatCategoryName(category);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{categoryTitle} Journals | ScholarHub</title>
        <meta 
          name="description" 
          content={`Browse the latest ${categoryTitle.toLowerCase()} research papers, academic journals, and scholarly articles.`} 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "${categoryTitle} Journals",
              "description": "Collection of academic journals and research papers in ${categoryTitle}",
              "url": "https://scholarhub.example.com/journals/${category}"
            }
          `}
        </script>
      </Helmet>
      
      {/* Reading Progress Bar - only visible when scrolling */}
      <ReadingProgressBar 
        targetElement="main" 
        color="#002856"
      />
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-academic-50 text-academic-700 mb-2">
              Journal Collection
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-academic-900 mb-4">
              {categoryTitle} Journals
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Browse the latest research papers, academic journals, and scholarly articles in the field of {categoryTitle.toLowerCase()}.
            </p>
          </motion.div>
          
          {/* Category Top Ad */}
          <AdBanner size="category-top" />
          
          {/* Articles Grid */}
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden p-5 h-64">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mt-auto"></div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No articles found in this category.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {articles.map(article => (
                <motion.div key={article.slug} variants={itemVariants}>
                  <JournalCard
                    title={article.title}
                    date={article.date}
                    category={article.category}
                    slug={article.slug}
                    excerpt={article.excerpt}
                    tags={article.tags}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              baseUrl={`/journals/${category}`} 
            />
          )}
          
          {/* Another Ad Banner */}
          <div className="mt-12">
            <AdBanner size="category-top" className="max-w-3xl mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

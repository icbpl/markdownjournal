
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Library, Book, Award, Clock } from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { fetchArticles, getPopularCategories } from '../../utils/markdownUtils';
import { ArticleMetadata } from '../../utils/article/articleTypes';

// Import refactored components
import HeroSection from './components/HeroSection';
import LatestResearch from './components/LatestResearch';
import CategoriesSidebar from './components/CategoriesSidebar';

const HomePage: React.FC = () => {
  const [recentArticles, setRecentArticles] = useState<ArticleMetadata[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch recent articles and popular categories in parallel
        const [articlesData, categoriesData] = await Promise.all([
          fetchArticles(undefined, 1, 10),
          getPopularCategories()
        ]);
        
        setRecentArticles(articlesData.articles);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory === 'engineering') return <Library className="h-5 w-5" />;
    if (lowerCategory === 'medicine') return <Book className="h-5 w-5" />;
    if (lowerCategory === 'computer science') return <Award className="h-5 w-5" />;
    return <Clock className="h-5 w-5" />;
  };

  return (
    <>
      <Helmet>
        <title>ScholarHub - Academic Journal Aggregator</title>
        <meta name="description" content="A comprehensive platform for academic journals, research papers, and scholarly articles across multiple disciplines." />
        <meta name="keywords" content="academic journals, research papers, scholarly articles, engineering, medicine, computer science" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://scholarhub.example.com/",
              "name": "ScholarHub",
              "description": "Academic Journal Aggregator",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://scholarhub.example.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Search */}
        <HeroSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
        
        {/* Header Ad Banner */}
        <AdBanner size="header" />
        
        {/* Main content grid with sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
          {/* Main content - Recent Articles */}
          <LatestResearch loading={loading} recentArticles={recentArticles} />
          
          {/* Sidebar with categories */}
          <CategoriesSidebar 
            loading={loading} 
            categories={categories} 
            getCategoryIcon={getCategoryIcon}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;

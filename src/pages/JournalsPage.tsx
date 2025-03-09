
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, MoveRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';
import CategoryCard from '../components/CategoryCard';
import Pagination from '../components/Pagination';
import { getPopularCategories } from '../utils/markdownUtils';

const JournalsPage: React.FC = () => {
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 9;
  
  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        // For demo purposes, we're using the mock function
        // In production, this would fetch from an actual API
        const allCategories = await getPopularCategories();
        
        // Sort alphabetically by name
        allCategories.sort((a, b) => a.name.localeCompare(b.name));
        
        setCategories(allCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  // Pagination logic
  const totalPages = Math.ceil(categories.length / categoriesPerPage);
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  
  // Container and item animation variants
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
  
  // Handle category icon selection
  const getCategoryIcon = (categoryName: string) => {
    // This is a simplified example
    return <BookOpen className="h-6 w-6" />;
  };
  
  return (
    <>
      <Helmet>
        <title>Academic Journals by Discipline | ScholarHub</title>
        <meta 
          name="description" 
          content="Browse academic journals, research papers, and scholarly articles by discipline. Find the latest research in your field of interest." 
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Academic Journals by Discipline",
              "description": "Browse the complete list of academic disciplines and their associated journals.",
              "url": "https://scholarhub.example.com/journals"
            }
          `}
        </script>
      </Helmet>
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-academic-50 text-academic-700 mb-2">
              Journal Disciplines
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-academic-900 mb-4">
              Academic Journals by Discipline
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Browse our comprehensive collection of academic journals organized by discipline. 
              Find the latest research in your field of interest.
            </p>
          </motion.div>
          
          {/* Ad Banner */}
          <AdBanner size="category-top" />
          
          {/* Categories Grid */}
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden p-5 h-24">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="ml-3">
                      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No disciplines found.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentCategories.map((category) => (
                <motion.div key={category.name} variants={itemVariants}>
                  <CategoryCard
                    name={category.name}
                    count={category.count}
                    iconName={getCategoryIcon(category.name)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                baseUrl={`/journals/page`} 
              />
            </div>
          )}
          
          {/* Additional info section */}
          <div className="mt-16 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-medium text-academic-700 mb-4">About Academic Disciplines</h2>
            <p className="text-gray-600 mb-4">
              Academic disciplines are branches of knowledge that are taught and researched at the college or university level. 
              Disciplines are defined by the academic journals in which research is published, and the learned societies to 
              which their practitioners belong.
            </p>
            <Link 
              to="/search" 
              className="inline-flex items-center text-academic-600 hover:text-academic-800"
            >
              <span>Search all journals</span>
              <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalsPage;

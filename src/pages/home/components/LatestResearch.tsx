
import React from 'react';
import { motion } from 'framer-motion';
import JournalCard from '../../../components/JournalCard';
import { ArticleMetadata } from '../../../utils/article/articleTypes';

interface LatestResearchProps {
  loading: boolean;
  recentArticles: ArticleMetadata[];
}

const LatestResearch: React.FC<LatestResearchProps> = ({ loading, recentArticles }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <motion.div 
      className="lg:col-span-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 id="latest-research" className="text-2xl md:text-3xl font-serif font-medium text-academic-900">Latest Research</h2>
        <a href="/journals" className="text-academic-500 hover:text-academic-600 font-medium transition-colors">
          View All
        </a>
      </div>
      
      {loading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentArticles.map((article) => (
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
        </div>
      )}
    </motion.div>
  );
};

export default LatestResearch;

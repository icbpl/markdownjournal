
import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '../../../components/CategoryCard';
import AdBanner from '../../../components/AdBanner';

interface CategoriesSidebarProps {
  loading: boolean;
  categories: { name: string; count: number }[];
  getCategoryIcon: (category: string) => React.ReactNode;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ 
  loading, 
  categories,
  getCategoryIcon 
}) => {
  return (
    <div className="space-y-8">
      {/* Categories section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-serif font-medium text-academic-900 mb-6">Popular Categories</h2>
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton for categories
            [...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden p-5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                count={category.count}
                iconName={getCategoryIcon(category.name)}
              />
            ))
          )}
        </div>
      </motion.div>
      
      {/* Sidebar Ad */}
      <div className="pt-6">
        <AdBanner size="sidebar" />
      </div>
    </div>
  );
};

export default CategoriesSidebar;


import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  count: number;
  iconName?: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, count, iconName }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="category-card"
    >
      <Link 
        to={`/journals/${name.toLowerCase()}`}
        className="block p-5 h-full"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-academic-100 flex items-center justify-center text-academic-500">
              {iconName}
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-academic-700">{name}</h3>
              <p className="text-sm text-gray-500">{count} articles</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-academic-300" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;

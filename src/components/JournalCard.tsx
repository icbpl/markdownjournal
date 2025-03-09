
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface JournalCardProps {
  title: string;
  date: string;
  category: string;
  slug: string;
  excerpt: string;
  tags?: string[];
}

const JournalCard: React.FC<JournalCardProps> = ({
  title,
  date,
  category,
  slug,
  excerpt,
  tags = [],
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="journal-card"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <span className="journal-card-category">
            <Bookmark className="h-3 w-3 inline mr-1" />
            {category}
          </span>
          <span className="journal-card-date ml-3">
            <Calendar className="h-3 w-3 inline mr-1" />
            {formattedDate}
          </span>
        </div>
        
        <Link to={`/journals/${category.toLowerCase()}/${slug}`} className="block">
          <h3 className="journal-card-title">{title}</h3>
        </Link>
        
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{excerpt}</p>
        
        {tags.length > 0 && (
          <div className="journal-card-tags mt-auto pt-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="journal-card-tag">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="journal-card-tag">+{tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JournalCard;

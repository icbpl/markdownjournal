
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-academic-50 text-academic-700 mb-4">Access to Knowledge</span>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-academic-900 mb-6">
        Unlock the World of <span className="text-academic-500">Academic Research</span>
      </h1>
      <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
        Access thousands of peer-reviewed journals, research papers, and scholarly articles across multiple disciplines.
      </p>
      
      {/* Prominent Search Form */}
      <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto mb-8">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for research papers, journals, and scholarly articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-2 border-academic-300 focus:border-academic-500 focus:ring-2 focus:ring-academic-200 transition-colors shadow-sm"
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

      <div className="flex flex-wrap justify-center gap-4">
        <a href="/journals" className="px-6 py-3 bg-academic-500 text-white rounded-lg font-medium hover:bg-academic-600 transition-colors duration-300 shadow-sm">
          Browse Journals
        </a>
        <a href="#latest-research" className="px-6 py-3 bg-white text-academic-500 border border-academic-500 rounded-lg font-medium hover:bg-academic-50 transition-colors duration-300 shadow-sm">
          Latest Research
        </a>
      </div>
    </motion.section>
  );
};

export default HeroSection;

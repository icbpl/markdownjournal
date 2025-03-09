
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import ReadingProgressBar from './ReadingProgressBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <h1 className="text-2xl md:text-3xl font-serif font-semibold text-academic-500 flex items-center">
                <span className="mr-2 text-academic-400">J</span>
                <span>ScholarHub</span>
              </h1>
              <span className="absolute top-full left-0 text-xs text-academic-400 font-sans mt-[-2px]">Academic Journal Aggregator</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-academic-600 hover:text-academic-500 transition-colors">Home</Link>
            <Link to="/journals" className="font-medium text-academic-600 hover:text-academic-500 transition-colors">Journals</Link>
            <Link to="/journals/engineering" className="font-medium text-academic-600 hover:text-academic-500 transition-colors">Engineering</Link>
            <Link to="/journals/medicine" className="font-medium text-academic-600 hover:text-academic-500 transition-colors">Medicine</Link>
            <Link to="/journals/computer-science" className="font-medium text-academic-600 hover:text-academic-500 transition-colors">Computer Science</Link>
            
            {/* Search Icon for Desktop */}
            <Link to="/search" className="text-academic-600 hover:text-academic-500 transition-colors">
              <Search className="h-5 w-5" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/search" className="mr-4">
              <Search className="h-5 w-5 text-academic-600" />
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-academic-600 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="py-3 px-4 space-y-3">
              <Link to="/" className="block py-2 px-3 font-medium text-academic-600 hover:bg-academic-50 rounded-md">Home</Link>
              <Link to="/journals" className="block py-2 px-3 font-medium text-academic-600 hover:bg-academic-50 rounded-md">Journals</Link>
              <Link to="/journals/engineering" className="block py-2 px-3 font-medium text-academic-600 hover:bg-academic-50 rounded-md">Engineering</Link>
              <Link to="/journals/medicine" className="block py-2 px-3 font-medium text-academic-600 hover:bg-academic-50 rounded-md">Medicine</Link>
              <Link to="/journals/computer-science" className="block py-2 px-3 font-medium text-academic-600 hover:bg-academic-50 rounded-md">Computer Science</Link>
              
              <form onSubmit={handleSearchSubmit} className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search journals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:border-academic-300 focus:ring-1 focus:ring-academic-300"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Reading Progress Bar at bottom of header */}
      <ReadingProgressBar 
        position="bottom" 
        height={3} 
        color="#002856" 
        className="reading-progress-glow"
      />
    </header>
  );
};

export default Header;

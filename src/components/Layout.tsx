
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import useKeyboardAccessibility from '@/hooks/use-keyboard-accessibility';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Use our accessibility hook
  useKeyboardAccessibility();
  
  // Set focus to main content when route changes
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <a 
        href="#main-content" 
        className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:text-academic-700 focus:p-4 focus:border focus:border-academic-300"
      >
        Skip to content
      </a>
      
      <Header />
      
      <motion.main 
        id="main-content"
        tabIndex={-1}
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 w-full mx-auto px-4 md:px-6 pb-12"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Layout;

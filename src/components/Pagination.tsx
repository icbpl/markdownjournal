
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, baseUrl, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If there are less pages than max to show, display all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = Math.min(maxPagesToShow - 1, totalPages - 1);
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - (maxPagesToShow - 2));
      }
      
      // Add ellipsis if needed at the beginning
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed at the end
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  // Handle page click
  const handlePageClick = (page: number) => {
    if (onPageChange && typeof page === 'number') {
      onPageChange(page);
    }
  };

  // Determine if we're using baseUrl navigation or callback
  const isUsingUrl = !!baseUrl;

  // Render page link or button
  const renderPageLink = (pageNumber: number | string, isActive: boolean) => {
    const className = `inline-flex items-center justify-center w-10 h-10 rounded-md ${
      isActive
        ? 'bg-academic-500 text-white font-medium'
        : 'text-academic-600 hover:bg-academic-50 hover:text-academic-700'
    } transition-colors`;
    
    if (pageNumber === '...') {
      return (
        <span className="inline-flex items-center justify-center w-10 h-10 text-gray-500">
          ...
        </span>
      );
    }
    
    if (isUsingUrl && typeof pageNumber === 'number') {
      return (
        <Link
          to={`${baseUrl}/${pageNumber === 1 ? '' : `page/${pageNumber}`}`}
          className={className}
          aria-current={isActive ? 'page' : undefined}
        >
          {pageNumber}
        </Link>
      );
    } else if (typeof pageNumber === 'number') {
      return (
        <button
          onClick={() => handlePageClick(pageNumber)}
          className={className}
          aria-current={isActive ? 'page' : undefined}
        >
          {pageNumber}
        </button>
      );
    }
    
    return null;
  };

  return (
    <nav className="flex justify-center mt-8 mb-12" aria-label="Pagination">
      <ul className="flex items-center space-x-1">
        {/* Previous Page Link */}
        <li>
          {currentPage > 1 ? (
            isUsingUrl ? (
              <Link
                to={`${baseUrl}/${currentPage - 1 === 1 ? '' : `page/${currentPage - 1}`}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-academic-600 hover:bg-academic-50 hover:text-academic-700 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            ) : (
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-academic-600 hover:bg-academic-50 hover:text-academic-700 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )
          ) : (
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-300 cursor-not-allowed">
              <ChevronLeft className="h-5 w-5" />
            </span>
          )}
        </li>
        
        {/* Page Numbers */}
        {pageNumbers.map((pageNumber, index) => (
          <li key={index}>
            {renderPageLink(
              pageNumber, 
              typeof pageNumber === 'number' && currentPage === pageNumber
            )}
          </li>
        ))}
        
        {/* Next Page Link */}
        <li>
          {currentPage < totalPages ? (
            isUsingUrl ? (
              <Link
                to={`${baseUrl}/page/${currentPage + 1}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-academic-600 hover:bg-academic-50 hover:text-academic-700 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-academic-600 hover:bg-academic-50 hover:text-academic-700 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )
          ) : (
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-300 cursor-not-allowed">
              <ChevronRight className="h-5 w-5" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;


import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  targetElement?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  className?: string;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  targetElement = 'body',
  color = '#002856',
  height = 4,
  position = 'top',
  className = '',
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const calculateReadingProgress = () => {
      const target = document.querySelector(targetElement);
      
      if (!target) {
        return;
      }
      
      const scrollTop = window.scrollY;
      const docHeight = target.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      
      setReadingProgress(scrollPercentRounded > 100 ? 100 : scrollPercentRounded);
    };
    
    // Initial calculation
    calculateReadingProgress();
    
    // Add scroll event listener
    window.addEventListener('scroll', calculateReadingProgress);
    
    // Cleanup event listener
    return () => window.removeEventListener('scroll', calculateReadingProgress);
  }, [targetElement]);
  
  // Dynamic style based on position
  const barStyle: React.CSSProperties = {
    height: `${height}px`,
    width: `${readingProgress}%`,
    transition: 'width 0.3s ease-out',
    zIndex: 50,
    position: 'absolute',
    left: 0,
    [position]: 0,
    background: `linear-gradient(90deg, ${color} 0%, #5E9CFF 100%)`,
    boxShadow: readingProgress > 0 ? '0 0 8px rgba(94, 156, 255, 0.5)' : 'none',
    borderRadius: '0 4px 4px 0',
  };

  // Only render the bar when scrolling has started
  if (readingProgress === 0) {
    return null;
  }
  
  return (
    <div 
      className={`reading-progress-bar ${className}`} 
      style={barStyle}
      role="progressbar"
      aria-valuenow={readingProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
};

export default ReadingProgressBar;

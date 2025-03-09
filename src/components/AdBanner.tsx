
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type AdSize = 'header' | 'sidebar' | 'inarticle' | 'category-top';

interface AdBannerProps {
  size: AdSize;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ size, className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const isMobile = useIsMobile();
  
  // Maps size to appropriate class and dimensions - now with mobile-friendly sizes
  const adSizeMap = {
    'header': {
      className: 'header-ad',
      width: isMobile ? 320 : 970,
      height: isMobile ? 100 : 250,
      id: 'header-ad',
    },
    'sidebar': {
      className: 'sidebar-ad',
      width: 300,
      height: isMobile ? 250 : 600,
      id: 'sidebar-ad',
    },
    'inarticle': {
      className: 'inarticle-ad',
      width: isMobile ? 300 : 300,
      height: 250,
      id: 'inarticle-ad',
    },
    'category-top': {
      className: 'category-top-ad',
      width: isMobile ? 320 : 728,
      height: isMobile ? 100 : 90,
      id: 'category-top-ad',
    },
  };

  const { className: sizeClassName, width, height, id } = adSizeMap[size];

  // Mock ad content with responsive design
  const getRandomAdContent = () => {
    const topics = ['Research Methods', 'Academic Publishing', 'Literature Review', 'Data Analysis'];
    const icons = ['📚', '🔬', '📊', '🧪', '📝', '🎓'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    // Generate content based on ad size and responsive design
    if (size === 'header' || size === 'sidebar') {
      return `
        <div class="ad-content h-full flex flex-col justify-between p-3 sm:p-5">
          <div>
            <div class="text-xs text-academic-400 uppercase mb-1">Sponsored Resource</div>
            <h3 class="text-base sm:text-lg font-medium mb-2">${randomIcon} ${randomTopic} Guide</h3>
            <p class="text-xs sm:text-sm text-gray-600">Access our comprehensive guide on ${randomTopic.toLowerCase()} techniques to enhance your research capabilities.</p>
          </div>
          <div class="mt-2 sm:mt-4">
            <button class="bg-academic-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm hover:bg-academic-600 transition-colors">Learn More</button>
          </div>
        </div>
      `;
    } else {
      // For smaller ads
      return `
        <div class="ad-content h-full flex items-center p-2 sm:p-3">
          <div class="text-2xl sm:text-3xl mr-2 sm:mr-3">${randomIcon}</div>
          <div>
            <div class="text-xs text-academic-400 uppercase">Sponsored</div>
            <h3 class="text-xs sm:text-sm font-medium">${randomTopic} Resources</h3>
          </div>
          <button class="ml-auto bg-academic-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs hover:bg-academic-600 transition-colors">View</button>
        </div>
      `;
    }
  };

  // Load or refresh ad when component mounts or size changes
  useEffect(() => {
    if (dismissed) return;
    
    // This would be replaced with actual AdSense code
    if (adRef.current) {
      const simulateAdLoad = () => {
        if (adRef.current) {
          const wrapper = document.createElement('div');
          wrapper.className = 'ad-wrapper h-full w-full';
          wrapper.style.maxWidth = '100%';
          wrapper.style.backgroundColor = '#f9fafb';
          wrapper.style.border = '1px solid #e5e7eb';
          wrapper.style.borderRadius = '0.375rem';
          wrapper.style.overflow = 'hidden';
          
          // Add content to wrapper
          wrapper.innerHTML = getRandomAdContent();
          
          // Replace content in adRef
          adRef.current.innerHTML = '';
          adRef.current.appendChild(wrapper);
        }
      };

      // Simulate ad loading delay
      const timeout = setTimeout(simulateAdLoad, 200);
      return () => clearTimeout(timeout);
    }
  }, [size, width, height, dismissed, isMobile]);

  // Don't render if dismissed
  if (dismissed) return null;

  return (
    <div
      ref={adRef}
      id={id}
      className={`ad-container ${sizeClassName} ${className} relative overflow-hidden`}
      aria-label="Advertisement"
      role="complementary"
    >
      <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs sm:text-sm font-medium">
        <span className="animate-pulse">Loading Sponsored Content...</span>
      </div>
      <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-xs px-2 py-0.5">Ad</div>
      <button 
        onClick={() => setDismissed(true)}
        className="absolute top-0 right-0 mt-5 mr-1 p-1 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 transition-colors z-10"
        aria-label="Close advertisement"
      >
        <X className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    </div>
  );
};

export default AdBanner;


import { useEffect } from 'react';

export function useKeyboardAccessibility() {
  useEffect(() => {
    // Add visual indicator for focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    };

    // Remove visual indicator when mouse is used
    const handleMouseDown = () => {
      document.body.classList.remove('user-is-tabbing');
    };

    // Add skip to content functionality
    const addSkipToContent = () => {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-to-content';
      skipLink.textContent = 'Skip to content';
      document.body.prepend(skipLink);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    addSkipToContent();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
}

export default useKeyboardAccessibility;

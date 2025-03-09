
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
    toast({
      title: "Cookies accepted",
      description: "Your preferences have been saved",
    });
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
    toast({
      title: "Cookies declined",
      description: "We'll only use essential cookies",
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50"
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1">We value your privacy</h3>
          <p className="text-sm text-gray-600 mb-2">
            This website uses cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
          <a href="/privacy-policy" className="text-academic-500 hover:underline text-sm">
            Read our Privacy Policy
          </a>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={declineCookies}>
            Decline
          </Button>
          <Button onClick={acceptCookies} className="bg-academic-500 hover:bg-academic-600">
            Accept All
          </Button>
          <button 
            onClick={() => setIsVisible(false)} 
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cookie notice"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { createOptimizedScrollHandler } from '../utils/layoutOptimizer';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const optimizedScrollHandler = createOptimizedScrollHandler(toggleVisibility);
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="
            bg-brand-primary hover:bg-brand-primary/90
            text-white
            p-3 rounded-full
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out
            transform hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
            animate-fade-in
          "
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default BackToTop;
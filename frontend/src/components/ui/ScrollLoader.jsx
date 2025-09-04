import React, { useState, useRef, useEffect } from 'react';

const ScrollLoader = ({ 
  children, 
  threshold = 0.1, 
  rootMargin = '100px',
  fallback = null,
  className = '',
  once = true
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldLoad) {
          setShouldLoad(true);
          
          // Add a delay to show the loading state more clearly
          setTimeout(() => {
            setIsLoaded(true);
          }, 800);
          
          // If once is true, disconnect after first load
          if (once) {
            observer.disconnect();
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, once, shouldLoad]);

  return (
    <div ref={elementRef} className={className}>
      {shouldLoad ? (
        <div className={`transform ${
          isLoaded ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-8 scale-95 blur-sm'
        }`}>
          {isLoaded ? children : (fallback || (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="space-y-6 w-full max-w-4xl mx-auto px-4">
                <div className="text-center mb-6">
                  <div className="text-blue-600 font-semibold text-lg">Loading content...</div>
                  <div className="mt-2 flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg w-1/3 mx-auto animate-shimmer"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer" style={{animationDelay: '100ms'}}></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-5/6 animate-shimmer" style={{animationDelay: '200ms'}}></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-4/6 animate-shimmer" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        fallback || (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="space-y-6 w-full max-w-4xl mx-auto px-4">
                <div className="text-center mb-6">
                  <div className="text-blue-600 font-semibold text-lg">Loading content...</div>
                  <div className="mt-2 flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg w-1/3 mx-auto animate-shimmer"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer" style={{animationDelay: '100ms'}}></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-5/6 animate-shimmer" style={{animationDelay: '200ms'}}></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-4/6 animate-shimmer" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default ScrollLoader;
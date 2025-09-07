import React, { useState, useRef, useEffect, Suspense } from 'react';
import { createOptimizedIntersectionObserver } from '../utils/layoutOptimizer';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';

const LazySection = ({ 
  children, 
  fallback = null, 
  rootMargin = '100px', 
  threshold = 0.1,
  className = '',
  minHeight = '200px',
  priority = 'normal',
  ...props 
}) => {
  const [isInView, setIsInView] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef();
  const { scheduleIdleTask } = usePerformanceOptimization();

  useEffect(() => {
    const observer = createOptimizedIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          
          // Schedule rendering during idle time for better performance
          scheduleIdleTask(() => {
            setShouldRender(true);
          }, priority);
          
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, scheduleIdleTask, priority]);

  // Default fallback component
  const defaultFallback = (
    <div 
      className={`animate-pulse bg-[hsl(var(--muted)_/_0.3)] rounded-lg ${className}`}
      style={{ minHeight }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-[hsl(var(--muted-foreground)_/_0.3)] border-t-[hsl(var(--muted-foreground))] rounded-full animate-spin"></div>
      </div>
    </div>
  );

  return (
    <div 
      ref={sectionRef}
      className={className}
      {...props}
    >
      {shouldRender ? (
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
};

export default LazySection;
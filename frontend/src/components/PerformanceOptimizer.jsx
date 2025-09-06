import React, { useEffect, useCallback } from 'react';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';

// Performance Optimizer Component - Implements time slicing and main thread optimization
const PerformanceOptimizer = ({ children }) => {
  const { scheduleIdleTask, measurePerformance, cleanupMemory } = usePerformanceOptimization();

  // Time slicing for heavy operations
  const timeSlice = useCallback((tasks, chunkSize = 5) => {
    let index = 0;
    
    const processChunk = () => {
      const endIndex = Math.min(index + chunkSize, tasks.length);
      
      // Process chunk of tasks
      for (let i = index; i < endIndex; i++) {
        try {
          tasks[i]();
        } catch (error) {
          console.error('Time slice task error:', error);
        }
      }
      
      index = endIndex;
      
      // Schedule next chunk if more tasks remain
      if (index < tasks.length) {
        scheduleIdleTask(processChunk);
      }
    };
    
    // Start processing
    scheduleIdleTask(processChunk);
  }, [scheduleIdleTask]);

  // Optimize long-running tasks
  const optimizeLongTask = useCallback(async (task, taskName = 'Long Task') => {
    return measurePerformance(taskName, async () => {
      // Break task into smaller chunks if it's a function that can be chunked
      if (typeof task === 'function') {
        return new Promise((resolve) => {
          scheduleIdleTask(() => {
            try {
              const result = task();
              resolve(result);
            } catch (error) {
              console.error(`${taskName} error:`, error);
              resolve(null);
            }
          });
        });
      }
      
      return task;
    });
  }, [measurePerformance, scheduleIdleTask]);

  // Defer non-critical operations
  const deferNonCriticalOps = useCallback(() => {
    const nonCriticalTasks = [
      // Preload next page resources
      () => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/cottages';
        document.head.appendChild(link);
      },
      
      // Preload contact page resources
      () => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/contact';
        document.head.appendChild(link);
      },
      
      // Initialize analytics (if any)
      () => {
        if (window.gtag) {
          window.gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
          });
        }
      },
      
      // Cleanup old cached data
      () => {
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              if (name.includes('old-') || name.includes('v1-')) {
                caches.delete(name);
              }
            });
          });
        }
      },
      
      // Preload critical images
      () => {
        const criticalImages = [
          '/images/Views/IMG_1701_optimized.webp',
          '/images/Cottages/IMG_20250208_122711.webp'
        ];
        
        criticalImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      }
    ];
    
    // Use time slicing to process non-critical tasks
    timeSlice(nonCriticalTasks, 2);
  }, [timeSlice]);

  // Initialize performance optimizations
  useEffect(() => {
    // Defer non-critical operations until after initial render
    const timer = setTimeout(() => {
      deferNonCriticalOps();
    }, 1000);
    
    // Cleanup memory periodically
    const cleanupInterval = setInterval(() => {
      scheduleIdleTask(() => {
        cleanupMemory();
      });
    }, 30000); // Every 30 seconds
    
    // Performance monitoring
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'measure') {
          console.log(`Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
        }
        
        // Log long tasks
        if (entry.entryType === 'longtask') {
          console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    // Observe performance entries
    try {
      observer.observe({ entryTypes: ['measure', 'longtask'] });
    } catch (error) {
      console.log('Performance observer not supported');
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(cleanupInterval);
      observer.disconnect();
    };
  }, [deferNonCriticalOps, scheduleIdleTask, cleanupMemory]);

  // Provide optimization utilities to children
  const optimizationContext = {
    timeSlice,
    optimizeLongTask,
    deferNonCriticalOps
  };

  // Handle cases where children might be undefined or invalid
  if (!children) {
    console.warn('PerformanceOptimizer: No children provided');
    return null;
  }

  // Check if children is a valid React element
  if (!React.isValidElement(children)) {
    console.warn('PerformanceOptimizer: Children must be a valid React element');
    return <>{children}</>;
  }

  return (
    <>
      {React.cloneElement(children, { optimizationContext })}
    </>
  );
};

export default PerformanceOptimizer;
// Performance Optimization Hook - Optimize main thread tasks and improve responsiveness

import { useEffect, useCallback, useRef } from 'react';
import { useWorkerManager } from '../utils/workerManager';

// Custom hook for performance optimization
export const usePerformanceOptimization = () => {
  const workerManager = useWorkerManager();
  const frameId = useRef(null);
  const taskQueue = useRef([]);
  const isProcessing = useRef(false);
  
  // Schedule tasks to run during idle time
  const scheduleIdleTask = useCallback((task, priority = 'normal') => {
    taskQueue.current.push({ task, priority, timestamp: Date.now() });
    
    if (!isProcessing.current) {
      processTaskQueue();
    }
  }, []);
  
  // Process task queue during idle periods
  const processTaskQueue = useCallback(() => {
    if (taskQueue.current.length === 0) {
      isProcessing.current = false;
      return;
    }
    
    isProcessing.current = true;
    
    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback((deadline) => {
        while (deadline.timeRemaining() > 0 && taskQueue.current.length > 0) {
          const { task } = taskQueue.current.shift();
          try {
            task();
          } catch (error) {
            console.error('Idle task error:', error);
          }
        }
        
        if (taskQueue.current.length > 0) {
          processTaskQueue();
        } else {
          isProcessing.current = false;
        }
      }, { timeout: 1000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        const startTime = Date.now();
        
        while (Date.now() - startTime < 5 && taskQueue.current.length > 0) {
          const { task } = taskQueue.current.shift();
          try {
            task();
          } catch (error) {
            console.error('Idle task error:', error);
          }
        }
        
        if (taskQueue.current.length > 0) {
          processTaskQueue();
        } else {
          isProcessing.current = false;
        }
      }, 0);
    }
  }, []);
  
  // Debounce function for expensive operations
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);
  
  // Throttle function for frequent operations
  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);
  
  // Batch DOM updates
  const batchDOMUpdates = useCallback((updates) => {
    if (frameId.current) {
      cancelAnimationFrame(frameId.current);
    }
    
    frameId.current = requestAnimationFrame(() => {
      updates.forEach(update => {
        try {
          update();
        } catch (error) {
          console.error('DOM update error:', error);
        }
      });
      frameId.current = null;
    });
  }, []);
  
  // Optimize heavy computations
  const optimizeComputation = useCallback(async (data, computationType) => {
    try {
      switch (computationType) {
        case 'filter':
          return await workerManager.filterData(data.items, data.filters, data.searchTerm);
        case 'search':
          return await workerManager.optimizeSearch(data.query, data.suggestions, data.history);
        case 'images':
          return await workerManager.processImages(data.images);
        case 'analytics':
          return await workerManager.processAnalytics(data.events, data.timeRange);
        default:
          return data;
      }
    } catch (error) {
      console.error('Computation optimization error:', error);
      return data;
    }
  }, [workerManager]);
  
  // Memory management
  const cleanupMemory = useCallback(() => {
    // Clear task queue
    taskQueue.current = [];
    
    // Cancel pending animation frames
    if (frameId.current) {
      cancelAnimationFrame(frameId.current);
      frameId.current = null;
    }
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }, []);
  
  // Performance monitoring
  const measurePerformance = useCallback((name, fn) => {
    return async (...args) => {
      const startTime = performance.now();
      
      try {
        const result = await fn(...args);
        const endTime = performance.now();
        
        console.log(`${name} took ${endTime - startTime} milliseconds`);
        
        // Log to performance API if available
        if ('performance' in window && 'measure' in performance) {
          performance.mark(`${name}-start`);
          performance.mark(`${name}-end`);
          performance.measure(name, `${name}-start`, `${name}-end`);
        }
        
        return result;
      } catch (error) {
        const endTime = performance.now();
        console.error(`${name} failed after ${endTime - startTime} milliseconds:`, error);
        throw error;
      }
    };
  }, []);
  
  // Lazy loading with intersection observer
  const createLazyLoader = useCallback((callback, options = {}) => {
    const defaultOptions = {
      rootMargin: '50px 0px',
      threshold: 0.1,
      ...options
    };
    
    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scheduleIdleTask(() => callback(entry.target));
        }
      });
    }, defaultOptions);
  }, [scheduleIdleTask]);
  
  // Virtual scrolling helper
  const createVirtualScroller = useCallback((items, itemHeight, containerHeight) => {
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2; // Buffer
    
    return {
      getVisibleItems: (scrollTop) => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(startIndex + visibleCount, items.length);
        
        return {
          items: items.slice(startIndex, endIndex),
          startIndex,
          endIndex,
          totalHeight: items.length * itemHeight,
          offsetY: startIndex * itemHeight
        };
      }
    };
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupMemory();
    };
  }, [cleanupMemory]);
  
  return {
    scheduleIdleTask,
    debounce,
    throttle,
    batchDOMUpdates,
    optimizeComputation,
    cleanupMemory,
    measurePerformance,
    createLazyLoader,
    createVirtualScroller,
    workerStats: workerManager.getStats
  };
};

// Higher-order component for performance optimization
export const withPerformanceOptimization = (WrappedComponent) => {
  return function OptimizedComponent(props) {
    const performanceUtils = usePerformanceOptimization();
    
    return (
      <WrappedComponent 
        {...props} 
        performanceUtils={performanceUtils}
      />
    );
  };
};

// Performance context for global access
import { createContext, useContext } from 'react';

const PerformanceContext = createContext(null);

export const PerformanceProvider = ({ children }) => {
  const performanceUtils = usePerformanceOptimization();
  
  return (
    <PerformanceContext.Provider value={performanceUtils}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformanceContext = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider');
  }
  return context;
};

export default usePerformanceOptimization;
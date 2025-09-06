// Layout Optimizer - Prevent forced reflows and layout thrashing

// Mobile detection utility
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform)) ||
         window.innerWidth <= 768;
};

// Batch DOM reads and writes to prevent layout thrashing
class LayoutOptimizer {
  constructor() {
    this.readTasks = [];
    this.writeTasks = [];
    this.isScheduled = false;
    this.isMobile = isMobile();
    this.batchSize = this.isMobile ? 5 : 10; // Smaller batches on mobile
    this.frameTimeout = this.isMobile ? 32 : 16; // Longer timeout on mobile (30fps vs 60fps)
  }

  // Schedule DOM reads (measurements)
  scheduleRead(callback) {
    this.readTasks.push(callback);
    this.scheduleFlush();
  }

  // Schedule DOM writes (style changes)
  scheduleWrite(callback) {
    this.writeTasks.push(callback);
    this.scheduleFlush();
  }

  // Flush all pending tasks in the correct order with mobile optimization
  scheduleFlush() {
    if (this.isScheduled) return;
    
    this.isScheduled = true;
    
    // Mobile optimization: Use longer delays and smaller batches
    const scheduleCallback = this.isMobile ? 
      (callback) => {
        // On mobile, prioritize battery life and use requestIdleCallback when available
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback, { timeout: this.frameTimeout * 2 });
        } else {
          setTimeout(callback, this.frameTimeout);
        }
      } :
      (callback) => requestAnimationFrame(callback);
    
    scheduleCallback(() => {
      // Mobile: Process tasks in smaller batches to prevent frame drops
      const processBatch = (tasks, processor, startIndex = 0) => {
        const endIndex = Math.min(startIndex + this.batchSize, tasks.length);
        const batch = tasks.slice(startIndex, endIndex);
        
        const results = batch.map((task, index) => {
          try {
            return processor(task, startIndex + index);
          } catch (error) {
            console.error('Layout task error:', error);
            return null;
          }
        });
        
        // Continue processing remaining tasks in next frame if needed
        if (endIndex < tasks.length) {
          requestAnimationFrame(() => {
            processBatch(tasks, processor, endIndex);
          });
        }
        
        return results;
      };
      
      // Execute all reads first
      const readResults = this.isMobile && this.readTasks.length > this.batchSize ?
        processBatch(this.readTasks, (task) => task()) :
        this.readTasks.map(task => {
          try {
            return task();
          } catch (error) {
            console.error('Layout read error:', error);
            return null;
          }
        });
      
      // Then execute all writes
      if (this.isMobile && this.writeTasks.length > this.batchSize) {
        processBatch(this.writeTasks, (task, index) => task(readResults[index]));
      } else {
        this.writeTasks.forEach((task, index) => {
          try {
            task(readResults[index]);
          } catch (error) {
            console.error('Layout write error:', error);
          }
        });
      }
      
      // Clear tasks
      this.readTasks = [];
      this.writeTasks = [];
      this.isScheduled = false;
    });
  }

  // Optimize element measurements
  measureElement(element, properties = ['width', 'height', 'top', 'left']) {
    return new Promise((resolve) => {
      this.scheduleRead(() => {
        const measurements = {};
        const rect = element.getBoundingClientRect();
        
        properties.forEach(prop => {
          switch (prop) {
            case 'width':
              measurements.width = rect.width;
              break;
            case 'height':
              measurements.height = rect.height;
              break;
            case 'top':
              measurements.top = rect.top;
              break;
            case 'left':
              measurements.left = rect.left;
              break;
            case 'scrollTop':
              measurements.scrollTop = element.scrollTop;
              break;
            case 'scrollLeft':
              measurements.scrollLeft = element.scrollLeft;
              break;
            case 'offsetWidth':
              measurements.offsetWidth = element.offsetWidth;
              break;
            case 'offsetHeight':
              measurements.offsetHeight = element.offsetHeight;
              break;
            default:
              measurements[prop] = getComputedStyle(element)[prop];
          }
        });
        
        resolve(measurements);
      });
    });
  }

  // Optimize style updates
  updateStyles(element, styles) {
    this.scheduleWrite(() => {
      Object.entries(styles).forEach(([property, value]) => {
        element.style[property] = value;
      });
    });
  }

  // Optimize class name changes
  updateClasses(element, { add = [], remove = [], toggle = [] }) {
    this.scheduleWrite(() => {
      if (remove.length) element.classList.remove(...remove);
      if (add.length) element.classList.add(...add);
      toggle.forEach(className => element.classList.toggle(className));
    });
  }

  // Prevent layout shift for images
  preventImageLayoutShift(img, aspectRatio) {
    const container = img.parentElement;
    if (!container) return;

    this.scheduleWrite(() => {
      // Set aspect ratio to prevent layout shift
      container.style.aspectRatio = aspectRatio || 'auto';
      container.style.overflow = 'hidden';
      
      // Ensure image fills container properly
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
    });
  }

  // Optimize scroll event handling
  createOptimizedScrollHandler(callback, options = {}) {
    const { throttle = 16, passive = true } = options;
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.pageYOffset;
          const direction = currentScrollY > lastScrollY ? 'down' : 'up';
          
          callback({
            scrollY: currentScrollY,
            direction,
            delta: currentScrollY - lastScrollY
          });
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    return { handler: handleScroll, options: { passive } };
  }

  // Optimize resize event handling
  createOptimizedResizeHandler(callback, debounceMs = 250) {
    let timeoutId;
    let measurements = {};

    const handleResize = () => {
      // Immediate measurement for responsive updates
      this.scheduleRead(() => {
        measurements = {
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio || 1
        };
      });

      // Debounced callback for expensive operations
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(measurements);
      }, debounceMs);
    };

    return handleResize;
  }

  // Create intersection observer with optimized callbacks
  createOptimizedIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
      rootMargin: '50px',
      threshold: [0, 0.1, 0.5, 1],
      ...options
    };

    return new IntersectionObserver((entries) => {
      // Batch intersection updates
      const updates = entries.map(entry => ({
        target: entry.target,
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        boundingClientRect: entry.boundingClientRect
      }));

      // Schedule updates during idle time
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => callback(updates));
      } else {
        setTimeout(() => callback(updates), 0);
      }
    }, defaultOptions);
  }

  // Optimize animation performance
  createOptimizedAnimation(element, keyframes, options = {}) {
    const defaultOptions = {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards',
      ...options
    };

    // Use CSS transforms for better performance
    const optimizedKeyframes = keyframes.map(frame => {
      const optimized = { ...frame };
      
      // Convert layout-triggering properties to transforms
      if ('left' in frame || 'top' in frame) {
        const x = frame.left || 0;
        const y = frame.top || 0;
        optimized.transform = `translate(${x}px, ${y}px)`;
        delete optimized.left;
        delete optimized.top;
      }
      
      return optimized;
    });

    return element.animate(optimizedKeyframes, defaultOptions);
  }

  // Clean up resources
  destroy() {
    this.readTasks = [];
    this.writeTasks = [];
    this.isScheduled = false;
  }
}

// Export the LayoutOptimizer class for direct instantiation
export { LayoutOptimizer };

// Create singleton instance
const layoutOptimizer = new LayoutOptimizer();

// Export utility functions
export const scheduleRead = (callback) => layoutOptimizer.scheduleRead(callback);
export const scheduleWrite = (callback) => layoutOptimizer.scheduleWrite(callback);
export const measureElement = (element, properties) => layoutOptimizer.measureElement(element, properties);
export const updateStyles = (element, styles) => layoutOptimizer.updateStyles(element, styles);
export const updateClasses = (element, classes) => layoutOptimizer.updateClasses(element, classes);
export const preventImageLayoutShift = (img, aspectRatio) => layoutOptimizer.preventImageLayoutShift(img, aspectRatio);
export const createOptimizedScrollHandler = (callback, options) => layoutOptimizer.createOptimizedScrollHandler(callback, options);
export const createOptimizedResizeHandler = (callback, debounceMs) => layoutOptimizer.createOptimizedResizeHandler(callback, debounceMs);
export const createOptimizedIntersectionObserver = (callback, options) => layoutOptimizer.createOptimizedIntersectionObserver(callback, options);
export const createOptimizedAnimation = (element, keyframes, options) => layoutOptimizer.createOptimizedAnimation(element, keyframes, options);

export default layoutOptimizer;
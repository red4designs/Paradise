// Layout Optimizer - Prevent forced reflows and layout thrashing

// Batch DOM reads and writes to prevent layout thrashing
class LayoutOptimizer {
  constructor() {
    this.readTasks = [];
    this.writeTasks = [];
    this.isScheduled = false;
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

  // Flush all pending tasks in the correct order
  scheduleFlush() {
    if (this.isScheduled) return;
    
    this.isScheduled = true;
    requestAnimationFrame(() => {
      // Execute all reads first
      const readResults = this.readTasks.map(task => {
        try {
          return task();
        } catch (error) {
          console.error('Layout read error:', error);
          return null;
        }
      });
      
      // Then execute all writes
      this.writeTasks.forEach((task, index) => {
        try {
          task(readResults[index]);
        } catch (error) {
          console.error('Layout write error:', error);
        }
      });
      
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
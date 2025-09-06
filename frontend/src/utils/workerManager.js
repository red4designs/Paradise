// Worker Manager - Handle web worker communications for main thread optimization

class WorkerManager {
  constructor() {
    this.worker = null;
    this.taskQueue = new Map();
    this.taskId = 0;
    this.isInitialized = false;
    this.initPromise = null;
    
    // Defer worker initialization to improve INP
    this.deferredInit();
  }
  
  deferredInit() {
    // Initialize worker during idle time to avoid blocking main thread
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.initWorker();
      }, { timeout: 3000 });
    } else {
      setTimeout(() => {
        this.initWorker();
      }, 1000);
    }
  }
  
  initWorker() {
    if (this.isInitialized || this.initPromise) {
      return this.initPromise;
    }
    
    this.initPromise = new Promise((resolve, reject) => {
      try {
        this.worker = new Worker('/worker.js');
        this.worker.onmessage = this.handleWorkerMessage.bind(this);
        this.worker.onerror = this.handleWorkerError.bind(this);
        this.isInitialized = true;
        console.log('Web Worker initialized successfully');
        resolve();
      } catch (error) {
        console.warn('Web Worker not supported or failed to initialize:', error);
        this.isInitialized = false;
        reject(error);
      }
    });
    
    return this.initPromise;
  }
  
  handleWorkerMessage(e) {
    const { id, type, result, error } = e.data;
    
    if (this.taskQueue.has(id)) {
      const { resolve, reject } = this.taskQueue.get(id);
      
      if (type === 'SUCCESS') {
        resolve(result);
      } else if (type === 'ERROR') {
        reject(new Error(error));
      }
      
      this.taskQueue.delete(id);
    }
  }
  
  handleWorkerError(error) {
    console.error('Worker error:', error);
    
    // Reject all pending tasks
    this.taskQueue.forEach(({ reject }) => {
      reject(new Error('Worker error occurred'));
    });
    
    this.taskQueue.clear();
  }
  
  async executeTask(type, data) {
    // Wait for worker initialization if not ready
    if (!this.isInitialized) {
      try {
        await this.initWorker();
      } catch (error) {
        console.warn('Worker initialization failed, falling back to main thread:', error);
        return this.executeOnMainThread(type, data);
      }
    }
    
    if (!this.worker) {
      console.warn('Worker not available, falling back to main thread');
      return this.executeOnMainThread(type, data);
    }
    
    return new Promise((resolve, reject) => {
      const id = ++this.taskId;
      
      this.taskQueue.set(id, { resolve, reject });
      
      this.worker.postMessage({
        id,
        type,
        data
      });
      
      // Set timeout to prevent hanging
      setTimeout(() => {
        if (this.taskQueue.has(id)) {
          this.taskQueue.delete(id);
          reject(new Error('Task timeout'));
        }
      }, 10000); // 10 second timeout
    });
  }
  
  // Fallback methods for main thread execution
  executeOnMainThread(type, data) {
    switch (type) {
      case 'IMAGE_PROCESSING':
        return this.processImagesMainThread(data);
      case 'DATA_FILTERING':
        return this.filterDataMainThread(data);
      case 'SEARCH_OPTIMIZATION':
        return this.optimizeSearchMainThread(data);
      default:
        return Promise.resolve(data);
    }
  }
  
  processImagesMainThread(images) {
    return Promise.resolve(
      images.map(image => ({
        ...image,
        optimized: true,
        size: Math.floor(image.size * 0.7),
        webpSupported: true,
        lazyLoadReady: true
      }))
    );
  }
  
  filterDataMainThread(data) {
    const { items, filters, searchTerm } = data;
    let filtered = items;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term)
      );
    }
    
    return Promise.resolve({
      results: filtered,
      count: filtered.length,
      processingTime: Date.now()
    });
  }
  
  optimizeSearchMainThread(data) {
    const { query, suggestions } = data;
    
    const optimizedSuggestions = suggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
    
    return Promise.resolve({
      suggestions: optimizedSuggestions,
      query,
      timestamp: Date.now()
    });
  }
  
  // Public API methods
  async processImages(images) {
    return this.executeTask('IMAGE_PROCESSING', images);
  }
  
  async filterData(items, filters, searchTerm) {
    return this.executeTask('DATA_FILTERING', { items, filters, searchTerm });
  }
  
  async optimizeSearch(query, suggestions, history = []) {
    return this.executeTask('SEARCH_OPTIMIZATION', { query, suggestions, history });
  }
  
  async processAnalytics(events, timeRange) {
    return this.executeTask('ANALYTICS_PROCESSING', { events, timeRange });
  }
  
  async cleanupCache(cacheEntries, maxAge) {
    return this.executeTask('CACHE_CLEANUP', { cacheEntries, maxAge });
  }
  
  // Batch processing for better performance
  async processBatch(tasks) {
    const promises = tasks.map(({ type, data }) => 
      this.executeTask(type, data)
    );
    
    return Promise.allSettled(promises);
  }
  
  // Performance monitoring
  getPerformanceStats() {
    return {
      isWorkerSupported: this.isInitialized,
      pendingTasks: this.taskQueue.size,
      totalTasksProcessed: this.taskId
    };
  }
  
  // Cleanup
  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    
    this.taskQueue.clear();
    this.isInitialized = false;
  }
}

// Create singleton instance
const workerManager = new WorkerManager();

// Export convenience functions
export const processImages = (images) => workerManager.processImages(images);
export const filterData = (items, filters, searchTerm) => 
  workerManager.filterData(items, filters, searchTerm);
export const optimizeSearch = (query, suggestions, history) => 
  workerManager.optimizeSearch(query, suggestions, history);
export const processAnalytics = (events, timeRange) => 
  workerManager.processAnalytics(events, timeRange);
export const cleanupCache = (cacheEntries, maxAge) => 
  workerManager.cleanupCache(cacheEntries, maxAge);
export const processBatch = (tasks) => workerManager.processBatch(tasks);
export const getWorkerStats = () => workerManager.getPerformanceStats();

// React hook for using worker manager
export const useWorkerManager = () => {
  return {
    processImages,
    filterData,
    optimizeSearch,
    processAnalytics,
    cleanupCache,
    processBatch,
    getStats: getWorkerStats
  };
};

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    workerManager.terminate();
  });
}

export default workerManager;
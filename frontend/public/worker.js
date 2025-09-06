// Web Worker for Paradise Resort - Offload heavy computations from main thread

// Handle different types of tasks
self.onmessage = function(e) {
  const { type, data, id } = e.data;
  
  try {
    let result;
    
    switch (type) {
      case 'IMAGE_PROCESSING':
        result = processImages(data);
        break;
        
      case 'DATA_FILTERING':
        result = filterData(data);
        break;
        
      case 'SEARCH_OPTIMIZATION':
        result = optimizeSearch(data);
        break;
        
      case 'ANALYTICS_PROCESSING':
        result = processAnalytics(data);
        break;
        
      case 'CACHE_CLEANUP':
        result = cleanupCache(data);
        break;
        
      default:
        throw new Error(`Unknown task type: ${type}`);
    }
    
    // Send result back to main thread
    self.postMessage({
      id,
      type: 'SUCCESS',
      result
    });
    
  } catch (error) {
    // Send error back to main thread
    self.postMessage({
      id,
      type: 'ERROR',
      error: error.message
    });
  }
};

// Image processing functions
function processImages(images) {
  return images.map(image => {
    // Simulate image optimization
    const optimized = {
      ...image,
      optimized: true,
      size: Math.floor(image.size * 0.7), // Simulate 30% size reduction
      webpSupported: checkWebPSupport(),
      lazyLoadReady: true
    };
    
    return optimized;
  });
}

// Data filtering for search results
function filterData(data) {
  const { items, filters, searchTerm } = data;
  
  let filtered = items;
  
  // Apply search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(item => 
      item.name?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term) ||
      item.tags?.some(tag => tag.toLowerCase().includes(term))
    );
  }
  
  // Apply filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        filtered = filtered.filter(item => {
          if (Array.isArray(value)) {
            return value.includes(item[key]);
          }
          return item[key] === value;
        });
      }
    });
  }
  
  // Sort results by relevance
  if (searchTerm) {
    filtered.sort((a, b) => {
      const aScore = calculateRelevanceScore(a, searchTerm);
      const bScore = calculateRelevanceScore(b, searchTerm);
      return bScore - aScore;
    });
  }
  
  return {
    results: filtered,
    count: filtered.length,
    processingTime: Date.now()
  };
}

// Search optimization
function optimizeSearch(data) {
  const { query, suggestions, history } = data;
  
  // Generate search suggestions
  const optimizedSuggestions = suggestions
    .filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5)
    .map(suggestion => ({
      text: suggestion,
      score: calculateSearchScore(suggestion, query, history)
    }))
    .sort((a, b) => b.score - a.score);
  
  return {
    suggestions: optimizedSuggestions,
    query,
    timestamp: Date.now()
  };
}

// Analytics processing
function processAnalytics(data) {
  const { events, timeRange } = data;
  
  // Process analytics data
  const processed = {
    totalEvents: events.length,
    uniqueUsers: new Set(events.map(e => e.userId)).size,
    pageViews: events.filter(e => e.type === 'pageview').length,
    interactions: events.filter(e => e.type === 'interaction').length,
    averageSessionTime: calculateAverageSessionTime(events),
    topPages: getTopPages(events),
    performanceMetrics: calculatePerformanceMetrics(events)
  };
  
  return processed;
}

// Cache cleanup
function cleanupCache(data) {
  const { cacheEntries, maxAge } = data;
  const now = Date.now();
  
  const cleaned = cacheEntries.filter(entry => {
    const age = now - entry.timestamp;
    return age < maxAge;
  });
  
  return {
    originalCount: cacheEntries.length,
    cleanedCount: cleaned.length,
    removedCount: cacheEntries.length - cleaned.length,
    entries: cleaned
  };
}

// Helper functions
function checkWebPSupport() {
  // Simple WebP support check
  return true; // Assume modern browsers
}

function calculateRelevanceScore(item, searchTerm) {
  let score = 0;
  const term = searchTerm.toLowerCase();
  
  // Name match gets highest score
  if (item.name?.toLowerCase().includes(term)) {
    score += 10;
  }
  
  // Description match gets medium score
  if (item.description?.toLowerCase().includes(term)) {
    score += 5;
  }
  
  // Tag match gets lower score
  if (item.tags?.some(tag => tag.toLowerCase().includes(term))) {
    score += 2;
  }
  
  return score;
}

function calculateSearchScore(suggestion, query, history) {
  let score = 0;
  
  // Exact match gets highest score
  if (suggestion.toLowerCase() === query.toLowerCase()) {
    score += 100;
  }
  
  // Starts with query gets high score
  if (suggestion.toLowerCase().startsWith(query.toLowerCase())) {
    score += 50;
  }
  
  // Contains query gets medium score
  if (suggestion.toLowerCase().includes(query.toLowerCase())) {
    score += 25;
  }
  
  // Historical usage boosts score
  const historyCount = history.filter(h => h === suggestion).length;
  score += historyCount * 5;
  
  return score;
}

function calculateAverageSessionTime(events) {
  const sessions = {};
  
  events.forEach(event => {
    if (!sessions[event.sessionId]) {
      sessions[event.sessionId] = {
        start: event.timestamp,
        end: event.timestamp
      };
    } else {
      sessions[event.sessionId].end = Math.max(
        sessions[event.sessionId].end,
        event.timestamp
      );
    }
  });
  
  const sessionTimes = Object.values(sessions).map(
    session => session.end - session.start
  );
  
  return sessionTimes.reduce((sum, time) => sum + time, 0) / sessionTimes.length;
}

function getTopPages(events) {
  const pageViews = {};
  
  events
    .filter(e => e.type === 'pageview')
    .forEach(event => {
      pageViews[event.page] = (pageViews[event.page] || 0) + 1;
    });
  
  return Object.entries(pageViews)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([page, views]) => ({ page, views }));
}

function calculatePerformanceMetrics(events) {
  const performanceEvents = events.filter(e => e.type === 'performance');
  
  if (performanceEvents.length === 0) {
    return null;
  }
  
  const metrics = {
    averageLoadTime: 0,
    averageFCP: 0,
    averageLCP: 0,
    count: performanceEvents.length
  };
  
  performanceEvents.forEach(event => {
    metrics.averageLoadTime += event.loadTime || 0;
    metrics.averageFCP += event.fcp || 0;
    metrics.averageLCP += event.lcp || 0;
  });
  
  metrics.averageLoadTime /= performanceEvents.length;
  metrics.averageFCP /= performanceEvents.length;
  metrics.averageLCP /= performanceEvents.length;
  
  return metrics;
}

// Handle errors
self.onerror = function(error) {
  self.postMessage({
    type: 'ERROR',
    error: error.message
  });
};
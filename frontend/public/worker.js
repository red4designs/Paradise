// Web Worker for Paradise Resort - Offload heavy computations from main thread

// Performance tracking
let taskCount = 0;
let totalProcessingTime = 0;

// Handle different types of tasks
self.onmessage = function(e) {
  const { type, data, id } = e.data;
  const startTime = performance.now();
  
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
        
      case 'HEAVY_COMPUTATION':
        result = performHeavyComputation(data);
        break;
        
      case 'BATCH_PROCESSING':
        result = processBatch(data);
        break;
        
      default:
        throw new Error(`Unknown task type: ${type}`);
    }
    
    // Track performance
    const processingTime = performance.now() - startTime;
    updatePerformanceMetrics(processingTime);
    
    // Send result back to main thread
    self.postMessage({
      id,
      type: 'SUCCESS',
      result: {
        ...result,
        processingTime,
        workerStats: {
          taskCount,
          averageTime: totalProcessingTime / taskCount
        }
      }
    });
    
  } catch (error) {
    // Send error back to main thread
    self.postMessage({
      id,
      type: 'ERROR',
      error: error.message,
      processingTime: performance.now() - startTime
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
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.description && item.description.toLowerCase().includes(term)) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(term)))
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
  if (item.name && item.name.toLowerCase().includes(term)) {
    score += 10;
  }
  
  // Description match gets medium score
  if (item.description && item.description.toLowerCase().includes(term)) {
    score += 5;
  }
  
  // Tag match gets lower score
  if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(term))) {
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

// Heavy computation functions
function performHeavyComputation(data) {
  const { type, payload } = data;
  
  switch (type) {
    case 'MATRIX_OPERATIONS':
      return performMatrixOperations(payload);
    case 'COMPLEX_SORTING':
      return performComplexSorting(payload);
    case 'DATA_TRANSFORMATION':
      return performDataTransformation(payload);
    case 'STATISTICAL_ANALYSIS':
      return performStatisticalAnalysis(payload);
    default:
      throw new Error(`Unknown computation type: ${type}`);
  }
}

// Batch processing for multiple operations
function processBatch(data) {
  const { operations, chunkSize = 10 } = data;
  const results = [];
  
  // Process in chunks to avoid blocking
  for (let i = 0; i < operations.length; i += chunkSize) {
    const chunk = operations.slice(i, i + chunkSize);
    const chunkResults = chunk.map(operation => {
      try {
        return processOperation(operation);
      } catch (error) {
        return { error: error.message, operation };
      }
    });
    results.push(...chunkResults);
  }
  
  return {
    results,
    totalOperations: operations.length,
    successCount: results.filter(r => !r.error).length,
    errorCount: results.filter(r => r.error).length
  };
}

function processOperation(operation) {
  const { type, data } = operation;
  
  switch (type) {
    case 'FILTER':
      return filterData(data);
    case 'SORT':
      return performComplexSorting(data);
    case 'TRANSFORM':
      return performDataTransformation(data);
    case 'ANALYZE':
      return performStatisticalAnalysis(data);
    default:
      return data;
  }
}

// Matrix operations for complex calculations
function performMatrixOperations(data) {
  const { operation, matrices } = data;
  
  switch (operation) {
    case 'MULTIPLY':
      return multiplyMatrices(matrices.a, matrices.b);
    case 'TRANSPOSE':
      return transposeMatrix(matrices.a);
    case 'DETERMINANT':
      return calculateDeterminant(matrices.a);
    case 'INVERSE':
      return calculateInverse(matrices.a);
    default:
      throw new Error(`Unknown matrix operation: ${operation}`);
  }
}

function multiplyMatrices(a, b) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < b.length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

function calculateDeterminant(matrix) {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  
  let det = 0;
  for (let i = 0; i < n; i++) {
    const subMatrix = matrix.slice(1).map(row => 
      row.filter((_, colIndex) => colIndex !== i)
    );
    det += Math.pow(-1, i) * matrix[0][i] * calculateDeterminant(subMatrix);
  }
  return det;
}

function calculateInverse(matrix) {
  const det = calculateDeterminant(matrix);
  if (det === 0) throw new Error('Matrix is not invertible');
  
  const n = matrix.length;
  const adjugate = [];
  
  for (let i = 0; i < n; i++) {
    adjugate[i] = [];
    for (let j = 0; j < n; j++) {
      const subMatrix = matrix
        .filter((_, rowIndex) => rowIndex !== i)
        .map(row => row.filter((_, colIndex) => colIndex !== j));
      
      const cofactor = Math.pow(-1, i + j) * calculateDeterminant(subMatrix);
      adjugate[j][i] = cofactor / det; // Transpose while calculating
    }
  }
  
  return adjugate;
}

// Complex sorting algorithms
function performComplexSorting(data) {
  const { array, algorithm = 'quicksort', compareFn } = data;
  const arr = [...array];
  
  switch (algorithm) {
    case 'quicksort':
      return quickSort(arr, compareFn);
    case 'mergesort':
      return mergeSort(arr, compareFn);
    case 'heapsort':
      return heapSort(arr, compareFn);
    case 'radixsort':
      return radixSort(arr);
    default:
      return arr.sort(compareFn);
  }
}

function quickSort(arr, compareFn = (a, b) => a - b) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => compareFn(x, pivot) < 0);
  const middle = arr.filter(x => compareFn(x, pivot) === 0);
  const right = arr.filter(x => compareFn(x, pivot) > 0);
  
  return [...quickSort(left, compareFn), ...middle, ...quickSort(right, compareFn)];
}

function mergeSort(arr, compareFn = (a, b) => a - b) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compareFn);
  const right = mergeSort(arr.slice(mid), compareFn);
  
  return merge(left, right, compareFn);
}

function merge(left, right, compareFn) {
  const result = [];
  let leftIndex = 0, rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex++]);
    } else {
      result.push(right[rightIndex++]);
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function heapSort(arr, compareFn = (a, b) => a - b) {
  const n = arr.length;
  
  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, compareFn);
  }
  
  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, compareFn);
  }
  
  return arr;
}

function heapify(arr, n, i, compareFn) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && compareFn(arr[left], arr[largest]) > 0) {
    largest = left;
  }
  
  if (right < n && compareFn(arr[right], arr[largest]) > 0) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, compareFn);
  }
}

function radixSort(arr) {
  if (arr.length === 0) return arr;
  
  const max = Math.max(...arr);
  const maxDigits = Math.floor(Math.log10(max)) + 1;
  
  for (let digit = 0; digit < maxDigits; digit++) {
    const buckets = Array.from({ length: 10 }, () => []);
    
    for (const num of arr) {
      const digitValue = Math.floor(num / Math.pow(10, digit)) % 10;
      buckets[digitValue].push(num);
    }
    
    arr.splice(0, arr.length, ...buckets.flat());
  }
  
  return arr;
}

// Data transformation functions
function performDataTransformation(data) {
  const { operation, dataset, config = {} } = data;
  
  switch (operation) {
    case 'NORMALIZE':
      return normalizeData(dataset, config);
    case 'AGGREGATE':
      return aggregateData(dataset, config);
    case 'PIVOT':
      return pivotData(dataset, config);
    case 'GROUP':
      return groupData(dataset, config);
    case 'FLATTEN':
      return flattenData(dataset, config);
    default:
      throw new Error(`Unknown transformation: ${operation}`);
  }
}

function normalizeData(dataset, config) {
  const { fields, method = 'minmax' } = config;
  const result = [...dataset];
  
  fields.forEach(field => {
    const values = dataset.map(item => parseFloat(item[field])).filter(v => !isNaN(v));
    
    if (method === 'minmax') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;
      
      result.forEach(item => {
        if (!isNaN(parseFloat(item[field]))) {
          item[field] = range === 0 ? 0 : (parseFloat(item[field]) - min) / range;
        }
      });
    } else if (method === 'zscore') {
      const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
      const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);
      
      result.forEach(item => {
        if (!isNaN(parseFloat(item[field]))) {
          item[field] = stdDev === 0 ? 0 : (parseFloat(item[field]) - mean) / stdDev;
        }
      });
    }
  });
  
  return result;
}

function aggregateData(dataset, config) {
  const { groupBy, aggregations } = config;
  const groups = {};
  
  // Group data
  dataset.forEach(item => {
    const key = groupBy.map(field => item[field]).join('|');
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  
  // Apply aggregations
  return Object.entries(groups).map(([key, items]) => {
    const result = {};
    
    // Add grouping fields
    groupBy.forEach((field, index) => {
      result[field] = key.split('|')[index];
    });
    
    // Apply aggregation functions
    Object.entries(aggregations).forEach(([field, func]) => {
      const values = items.map(item => parseFloat(item[field])).filter(v => !isNaN(v));
      
      switch (func) {
        case 'sum':
          result[`${field}_sum`] = values.reduce((sum, v) => sum + v, 0);
          break;
        case 'avg':
          result[`${field}_avg`] = values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
          break;
        case 'min':
          result[`${field}_min`] = values.length > 0 ? Math.min(...values) : null;
          break;
        case 'max':
          result[`${field}_max`] = values.length > 0 ? Math.max(...values) : null;
          break;
        case 'count':
          result[`${field}_count`] = values.length;
          break;
      }
    });
    
    return result;
  });
}

function pivotData(dataset, config) {
  const { rowField, colField, valueField, aggFunc = 'sum' } = config;
  const pivot = {};
  
  dataset.forEach(item => {
    const row = item[rowField];
    const col = item[colField];
    const value = parseFloat(item[valueField]);
    
    if (!pivot[row]) pivot[row] = {};
    if (!pivot[row][col]) pivot[row][col] = [];
    
    if (!isNaN(value)) {
      pivot[row][col].push(value);
    }
  });
  
  // Apply aggregation
  Object.keys(pivot).forEach(row => {
    Object.keys(pivot[row]).forEach(col => {
      const values = pivot[row][col];
      
      switch (aggFunc) {
        case 'sum':
          pivot[row][col] = values.reduce((sum, v) => sum + v, 0);
          break;
        case 'avg':
          pivot[row][col] = values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
          break;
        case 'count':
          pivot[row][col] = values.length;
          break;
      }
    });
  });
  
  return pivot;
}

function groupData(dataset, config) {
  const { groupBy } = config;
  const groups = {};
  
  dataset.forEach(item => {
    const key = groupBy.map(field => item[field]).join('|');
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  
  return groups;
}

function flattenData(dataset, config) {
  const { nestedField, keyField = 'key', valueField = 'value' } = config;
  const flattened = [];
  
  dataset.forEach(item => {
    const nested = item[nestedField];
    
    if (Array.isArray(nested)) {
      nested.forEach((nestedItem, index) => {
        flattened.push({
          ...item,
          [keyField]: index,
          [valueField]: nestedItem,
          [nestedField]: undefined
        });
      });
    } else if (typeof nested === 'object' && nested !== null) {
      Object.entries(nested).forEach(([key, value]) => {
        flattened.push({
          ...item,
          [keyField]: key,
          [valueField]: value,
          [nestedField]: undefined
        });
      });
    } else {
      flattened.push(item);
    }
  });
  
  return flattened;
}

// Statistical analysis functions
function performStatisticalAnalysis(data) {
  const { operation, dataset, field } = data;
  
  switch (operation) {
    case 'DESCRIPTIVE':
      return calculateDescriptiveStats(dataset, field);
    case 'CORRELATION':
      return calculateCorrelation(dataset, data.fields);
    case 'REGRESSION':
      return calculateLinearRegression(dataset, data.xField, data.yField);
    case 'DISTRIBUTION':
      return analyzeDistribution(dataset, field);
    default:
      throw new Error(`Unknown statistical operation: ${operation}`);
  }
}

function calculateDescriptiveStats(dataset, field) {
  const values = dataset.map(item => parseFloat(item[field])).filter(v => !isNaN(v));
  
  if (values.length === 0) {
    return { error: 'No valid numeric values found' };
  }
  
  values.sort((a, b) => a - b);
  
  const n = values.length;
  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / n;
  
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  
  const median = n % 2 === 0 
    ? (values[n / 2 - 1] + values[n / 2]) / 2 
    : values[Math.floor(n / 2)];
  
  const q1 = values[Math.floor(n * 0.25)];
  const q3 = values[Math.floor(n * 0.75)];
  
  return {
    count: n,
    sum,
    mean,
    median,
    mode: calculateMode(values),
    min: values[0],
    max: values[n - 1],
    range: values[n - 1] - values[0],
    variance,
    standardDeviation: stdDev,
    q1,
    q3,
    iqr: q3 - q1,
    skewness: calculateSkewness(values, mean, stdDev),
    kurtosis: calculateKurtosis(values, mean, stdDev)
  };
}

function calculateMode(values) {
  const frequency = {};
  let maxFreq = 0;
  let modes = [];
  
  values.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
      modes = [value];
    } else if (frequency[value] === maxFreq && !modes.includes(value)) {
      modes.push(value);
    }
  });
  
  return modes.length === values.length ? null : modes;
}

function calculateSkewness(values, mean, stdDev) {
  if (stdDev === 0) return 0;
  
  const n = values.length;
  const skewness = values.reduce((acc, val) => {
    return acc + Math.pow((val - mean) / stdDev, 3);
  }, 0) / n;
  
  return skewness;
}

function calculateKurtosis(values, mean, stdDev) {
  if (stdDev === 0) return 0;
  
  const n = values.length;
  const kurtosis = values.reduce((acc, val) => {
    return acc + Math.pow((val - mean) / stdDev, 4);
  }, 0) / n;
  
  return kurtosis - 3; // Excess kurtosis
}

function calculateCorrelation(dataset, fields) {
  const correlations = {};
  
  for (let i = 0; i < fields.length; i++) {
    for (let j = i + 1; j < fields.length; j++) {
      const field1 = fields[i];
      const field2 = fields[j];
      
      const pairs = dataset
        .map(item => [parseFloat(item[field1]), parseFloat(item[field2])])
        .filter(([x, y]) => !isNaN(x) && !isNaN(y));
      
      if (pairs.length > 1) {
        const correlation = calculatePearsonCorrelation(pairs);
        correlations[`${field1}_${field2}`] = correlation;
      }
    }
  }
  
  return correlations;
}

function calculatePearsonCorrelation(pairs) {
  const n = pairs.length;
  const sumX = pairs.reduce((sum, [x]) => sum + x, 0);
  const sumY = pairs.reduce((sum, [, y]) => sum + y, 0);
  const sumXY = pairs.reduce((sum, [x, y]) => sum + x * y, 0);
  const sumX2 = pairs.reduce((sum, [x]) => sum + x * x, 0);
  const sumY2 = pairs.reduce((sum, [, y]) => sum + y * y, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
}

function calculateLinearRegression(dataset, xField, yField) {
  const pairs = dataset
    .map(item => [parseFloat(item[xField]), parseFloat(item[yField])])
    .filter(([x, y]) => !isNaN(x) && !isNaN(y));
  
  if (pairs.length < 2) {
    return { error: 'Insufficient data for regression analysis' };
  }
  
  const n = pairs.length;
  const sumX = pairs.reduce((sum, [x]) => sum + x, 0);
  const sumY = pairs.reduce((sum, [, y]) => sum + y, 0);
  const sumXY = pairs.reduce((sum, [x, y]) => sum + x * y, 0);
  const sumX2 = pairs.reduce((sum, [x]) => sum + x * x, 0);
  const sumY2 = pairs.reduce((sum, [, y]) => sum + y * y, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Calculate R-squared
  const meanY = sumY / n;
  const totalSumSquares = pairs.reduce((sum, [, y]) => sum + Math.pow(y - meanY, 2), 0);
  const residualSumSquares = pairs.reduce((sum, [x, y]) => {
    const predicted = slope * x + intercept;
    return sum + Math.pow(y - predicted, 2);
  }, 0);
  
  const rSquared = 1 - (residualSumSquares / totalSumSquares);
  
  return {
    slope,
    intercept,
    rSquared,
    equation: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`,
    correlation: calculatePearsonCorrelation(pairs)
  };
}

function analyzeDistribution(dataset, field) {
  const values = dataset.map(item => parseFloat(item[field])).filter(v => !isNaN(v));
  
  if (values.length === 0) {
    return { error: 'No valid numeric values found' };
  }
  
  values.sort((a, b) => a - b);
  
  // Create histogram
  const bins = Math.min(20, Math.ceil(Math.sqrt(values.length)));
  const min = values[0];
  const max = values[values.length - 1];
  const binWidth = (max - min) / bins;
  
  const histogram = Array(bins).fill(0);
  
  values.forEach(value => {
    const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
    histogram[binIndex]++;
  });
  
  return {
    histogram,
    binWidth,
    bins,
    min,
    max,
    ...calculateDescriptiveStats(dataset, field)
  };
}

// Performance tracking
function updatePerformanceMetrics(processingTime) {
  taskCount++;
  totalProcessingTime += processingTime;
  
  // Log performance every 50 tasks
  if (taskCount % 50 === 0) {
    const averageTime = totalProcessingTime / taskCount;
    console.log(`Worker Performance: ${taskCount} tasks completed, average ${averageTime.toFixed(2)}ms per task`);
  }
}

// Handle errors
self.onerror = function(error) {
  console.error('Worker error:', error);
  self.postMessage({
    type: 'ERROR',
    error: error.message
  });
};

// Initialize worker
console.log('Enhanced Web Worker initialized - ready for heavy computations');
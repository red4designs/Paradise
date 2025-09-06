// Core Web Vitals monitoring and optimization utilities
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

// Performance thresholds for 2025 standards
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  INP: { good: 200, needsImprovement: 500 }, // INP replaces FID
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 }
};

// Analytics endpoint for performance data
const ANALYTICS_ENDPOINT = '/api/analytics/performance';

// Performance data storage
let performanceData = {
  metrics: {},
  diagnostics: {},
  timestamp: Date.now()
};

// Send performance data to analytics (deferred to avoid blocking main thread)
const sendToAnalytics = (metric) => {
  // Defer analytics to avoid blocking interactions
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      sendAnalyticsData(metric);
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      sendAnalyticsData(metric);
    }, 100);
  }
};

// Actual analytics sending function
const sendAnalyticsData = (metric) => {
  // Only send in production and if analytics is available
  if (process.env.NODE_ENV === 'production' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: getMetricRating(metric.name, metric.value)
      }
    });
  }

  // Store locally for debugging
  performanceData.metrics[metric.name] = {
    value: metric.value,
    rating: getMetricRating(metric.name, metric.value),
    timestamp: Date.now()
  };

  // Log performance issues in development (deferred)
  if (process.env.NODE_ENV === 'development') {
    const rating = getMetricRating(metric.name, metric.value);
    if (rating !== 'good') {
      console.warn(`⚠️ ${metric.name} needs improvement:`, {
        value: metric.value,
        rating,
        threshold: THRESHOLDS[metric.name],
        suggestions: getOptimizationSuggestions(metric.name, rating)
      });
    }
  }
};

// Get metric rating based on thresholds
const getMetricRating = (metricName, value) => {
  const threshold = THRESHOLDS[metricName];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
};

// Get optimization suggestions based on metric performance
const getOptimizationSuggestions = (metricName, rating) => {
  const suggestions = {
    LCP: {
      'needs-improvement': ['Optimize images', 'Reduce server response time', 'Eliminate render-blocking resources'],
      'poor': ['Implement critical CSS inlining', 'Use CDN for static assets', 'Optimize largest contentful element']
    },
    INP: {
      'needs-improvement': ['Reduce JavaScript execution time', 'Code splitting', 'Remove unused JavaScript'],
      'poor': ['Defer non-critical JavaScript', 'Use web workers', 'Optimize third-party scripts']
    },
    CLS: {
      'needs-improvement': ['Set dimensions for images/videos', 'Reserve space for ads', 'Avoid inserting content above existing content'],
      'poor': ['Use transform animations instead of layout changes', 'Preload fonts', 'Ensure proper aspect ratios']
    },
    FCP: {
      'needs-improvement': ['Eliminate render-blocking resources', 'Minify CSS', 'Remove unused CSS'],
      'poor': ['Inline critical CSS', 'Optimize fonts loading', 'Reduce server response time']
    },
    TTFB: {
      'needs-improvement': ['Optimize server performance', 'Use CDN', 'Enable compression'],
      'poor': ['Upgrade hosting', 'Implement caching', 'Optimize database queries']
    }
  };
  
  return suggestions[metricName]?.[rating] || [];
};

// Initialize Core Web Vitals monitoring
export const initWebVitals = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Measure Core Web Vitals using the new API
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics); // INP replaces FID in newer versions
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);

  // Additional performance monitoring
  measureResourceTiming();
  measureNavigationTiming();
  
  // Set up performance observer for layout shifts
  if ('PerformanceObserver' in window) {
    observeLayoutShifts();
    observeLongTasks();
  }

  console.log('🚀 Core Web Vitals monitoring initialized');
};

// Measure resource loading performance
const measureResourceTiming = () => {
  if (!window.performance || !window.performance.getEntriesByType) return;

  const resources = window.performance.getEntriesByType('resource');
  const criticalResources = resources.filter(resource => 
    resource.name.includes('.css') || 
    resource.name.includes('.js') || 
    resource.name.includes('font')
  );

  performanceData.diagnostics.resources = {
    total: resources.length,
    critical: criticalResources.length,
    slowest: criticalResources
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5)
      .map(r => ({ name: r.name, duration: r.duration }))
  };
};

// Measure navigation timing
const measureNavigationTiming = () => {
  if (!window.performance || !window.performance.getEntriesByType) return;

  const navigation = window.performance.getEntriesByType('navigation')[0];
  if (navigation) {
    performanceData.diagnostics.navigation = {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      domInteractive: navigation.domInteractive - navigation.fetchStart,
      redirectTime: navigation.redirectEnd - navigation.redirectStart
    };
  }
};

// Observe layout shifts for CLS debugging
const observeLayoutShifts = () => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) continue;
      
      if (entry.value > 0.1) {
        console.warn('🔄 Significant layout shift detected:', {
          value: entry.value,
          sources: entry.sources?.map(s => s.node) || [],
          timestamp: entry.startTime
        });
      }
    }
  });
  
  observer.observe({ entryTypes: ['layout-shift'] });
};

// Observe long tasks for FID debugging
const observeLongTasks = () => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) {
        console.warn('⏱️ Long task detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
          attribution: entry.attribution
        });
      }
    }
  });
  
  observer.observe({ entryTypes: ['longtask'] });
};

// Get current performance data
export const getPerformanceData = () => performanceData;

// Performance optimization utilities
export const optimizeImages = () => {
  // Lazy load images that are not in viewport
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/static/css/main.css', as: 'style' },
    { href: '/paradise-logo.svg', as: 'image' },
    { href: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', as: 'font', crossorigin: 'anonymous' }
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    Object.assign(link, resource);
    document.head.appendChild(link);
  });
};

export default {
  initWebVitals,
  getPerformanceData,
  optimizeImages,
  preloadCriticalResources
};
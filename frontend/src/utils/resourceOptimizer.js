// Resource Optimizer - Defer non-critical resources to reduce critical path latency

// Mobile-specific performance optimizations
const isMobile = () => {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Defer non-critical CSS loading with mobile optimizations
export const deferNonCriticalCSS = () => {
  // Check if CSS is already loaded to avoid duplicate loading
  if (document.querySelector('[data-deferred-css="loaded"]')) {
    return;
  }

  const deferredStyles = [
    // External CSS that can be deferred
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap'
  ];

  // Mobile-specific: Defer additional non-critical styles
  const mobileNonCriticalStyles = [
    // Defer animations and transitions on mobile for faster initial render
    '/static/css/mobile-non-critical.css'
  ];

  // Load non-critical CSS after page load with mobile optimizations
  const loadDeferredCSS = () => {
    const stylesToLoad = isMobile() ? [...deferredStyles, ...mobileNonCriticalStyles] : deferredStyles;
    
    stylesToLoad.forEach((href) => {
      // Check if already loaded
      if (document.querySelector(`link[href="${href}"]`)) {
        return;
      }
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      
      // Mobile-specific: Add loading priority
      if (isMobile()) {
        link.setAttribute('importance', 'low');
      }
      
      link.onload = function() {
        this.media = 'all';
        this.onload = null;
      };
      // Fallback for browsers that don't support onload
      link.onerror = function() {
        this.media = 'all';
      };
      document.head.appendChild(link);
    });
    
    // Mark as loaded
    const marker = document.createElement('meta');
    marker.setAttribute('data-deferred-css', 'loaded');
    document.head.appendChild(marker);
  };

  // Mobile-specific: More aggressive deferring for better mobile performance
  const delay = isMobile() ? 500 : 100; // Longer delay on mobile to prioritize critical rendering
  const timeout = isMobile() ? 3000 : 2000; // Longer timeout on mobile
  
  // Use requestIdleCallback for better performance
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadDeferredCSS, { timeout });
  } else {
    setTimeout(loadDeferredCSS, delay);
  }
};

// Inline critical CSS extraction (for build process)
export const inlineCriticalCSS = () => {
  // Check if critical CSS is already inlined
  if (document.querySelector('[data-critical="runtime"]')) {
    return;
  }
  
  // Mobile-optimized critical styles for faster initial render
  const criticalStyles = `
    /* Runtime critical styles - Mobile optimized */
    .hero-section { 
      min-height: 100vh; 
      display: flex; 
      align-items: center; 
      position: relative;
      overflow: hidden;
    }
    
    /* Critical navigation styles */
    .nav-menu { 
      display: flex; 
      gap: 2rem; 
      align-items: center;
    }
    
    /* Critical card styles - Simplified for mobile */
    .card { 
      background: hsl(var(--card)); 
      color: hsl(var(--card-foreground));
      border-radius: var(--radius); 
      border: 1px solid hsl(var(--border));
    }
    
    /* Mobile-first critical responsive utilities */
    @media (max-width: 768px) {
      .hero-section { 
        min-height: 80vh; 
        padding: 1rem;
      }
      .nav-menu { 
        flex-direction: column; 
        gap: 1rem; 
      }
      /* Remove expensive box-shadows on mobile */
      .card { 
        box-shadow: none;
        border: 1px solid hsl(var(--border));
      }
      /* Disable animations on mobile for better performance */
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    /* Critical animation for smooth loading - Desktop only */
    @media (min-width: 769px) {
      .fade-in {
        animation: fadeIn 0.3s ease-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalStyles;
  style.setAttribute('data-critical', 'runtime');
  document.head.appendChild(style);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const mobile = isMobile();
  
  // Mobile-first: Prioritize only the most critical resources
  const criticalResources = [
    // Always preload logo (small SVG)
    { href: '/paradise-logo.svg', as: 'image', type: 'image/svg+xml', importance: 'high' },
    
    // Mobile: Skip hero image preload to save bandwidth, Desktop: Preload for LCP
    ...(mobile ? [] : [
      { href: '/images/Views/IMG_20241109_174229_optimized.webp', as: 'image', type: 'image/webp', importance: 'high' }
    ]),
    
    // Critical font - but with mobile-specific importance
    { 
      href: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', 
      as: 'font', 
      type: 'font/woff2', 
      crossorigin: 'anonymous',
      importance: mobile ? 'low' : 'high'
    },
  ];

  criticalResources.forEach(resource => {
    // Check if already preloaded
    const existing = document.querySelector(`link[rel="preload"][href="${resource.href}"]`);
    if (existing) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) {
      link.type = resource.type;
    }
    if (resource.crossorigin) {
      link.crossOrigin = resource.crossorigin;
    }
    
    // Mobile-specific: Set importance attribute for better prioritization
    if (resource.importance && 'importance' in HTMLLinkElement.prototype) {
      link.importance = resource.importance;
    }
    
    document.head.appendChild(link);
  });
  
  // Mobile-specific: Add resource hints for better performance
  if (mobile) {
    addMobileResourceHints();
  }
};

// Mobile-specific: Add resource hints for better performance
const addMobileResourceHints = () => {
  const mobileHints = [
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//images.unsplash.com' },
    { rel: 'dns-prefetch', href: '//api.example.com' }
  ];
  
  mobileHints.forEach(hint => {
    const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
    if (existing) return;
    
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    
    if (hint.crossorigin) {
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  });
};

// Mobile-optimized network dependency reduction
export const optimizeMobileNetworkDependencies = () => {
  if (!isMobile()) return;
  
  // 1. Reduce critical request chains by bundling critical resources
  const criticalResourceBundle = [
    // Preload critical CSS inline to reduce network requests
    { type: 'style', content: getCriticalInlineStyles() },
    // Preload critical fonts as data URIs for first paint
    { type: 'font', content: getCriticalFontDataURI() }
  ];
  
  // 2. Implement aggressive resource prioritization for mobile
  const mobileResourceHints = [
    // High priority: Critical font preconnect
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true, priority: 'high' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', priority: 'high' },
    
    // Low priority: Defer non-critical domains
    { rel: 'dns-prefetch', href: '//images.unsplash.com', priority: 'low' },
    { rel: 'dns-prefetch', href: '//api.example.com', priority: 'low' }
  ];
  
  // 3. Apply mobile-specific resource loading strategy
  mobileResourceHints.forEach(hint => {
    const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
    if (existing) return;
    
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    
    // Set importance attribute for mobile optimization
    if (hint.priority) {
      link.setAttribute('importance', hint.priority);
    }
    
    if (hint.crossorigin) {
      link.crossOrigin = 'anonymous';
    }
    
    // Defer low priority resources
    if (hint.priority === 'low') {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => document.head.appendChild(link), { timeout: 2000 });
      } else {
        setTimeout(() => document.head.appendChild(link), 1000);
      }
    } else {
      document.head.appendChild(link);
    }
  });
  
  // 4. Implement mobile-specific request coalescing
  coalesceMobileRequests();
};

// Helper function to get critical inline styles for mobile
const getCriticalInlineStyles = () => {
  return `
    /* Mobile-critical styles to reduce network requests */
    body { font-family: system-ui, -apple-system, sans-serif; }
    .hero-section { min-height: 80vh; display: flex; align-items: center; }
    .nav-menu { display: flex; gap: 1rem; }
    @media (max-width: 768px) {
      * { animation: none !important; transition: none !important; }
      .hero-section { padding: 1rem; }
    }
  `;
};

// Helper function to get critical font as data URI (subset)
const getCriticalFontDataURI = () => {
  // Return a minimal font subset for critical text rendering
  return 'data:font/woff2;base64,'; // Would contain actual font data in production
};

// Coalesce multiple requests into fewer network calls on mobile
const coalesceMobileRequests = () => {
  // Batch multiple small requests together
  const requestQueue = [];
  const batchTimeout = 100; // 100ms batching window
  
  // Override fetch for request batching (simplified example)
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    // Only batch GET requests for static resources
    if (!options.method || options.method === 'GET') {
      if (url.match(/\.(css|js|json|woff2?)$/)) {
        return new Promise((resolve, reject) => {
          requestQueue.push({ url, options, resolve, reject });
          
          // Process queue after timeout
          setTimeout(() => {
            if (requestQueue.length > 0) {
              processBatchedRequests();
            }
          }, batchTimeout);
        });
      }
    }
    
    // Fallback to original fetch
    return originalFetch.call(this, url, options);
  };
  
  const processBatchedRequests = () => {
    const batch = requestQueue.splice(0);
    
    // Process requests with priority ordering
    batch.sort((a, b) => {
      const priorityA = a.url.match(/\.(css|woff2?)$/) ? 1 : 2;
      const priorityB = b.url.match(/\.(css|woff2?)$/) ? 1 : 2;
      return priorityA - priorityB;
    });
    
    // Execute requests with slight delays to prevent network congestion
    batch.forEach((request, index) => {
      setTimeout(() => {
        originalFetch(request.url, request.options)
          .then(request.resolve)
          .catch(request.reject);
      }, index * 10); // 10ms stagger
    });
  };
};

// Lazy load images with Intersection Observer
export const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

// Defer third-party scripts
export const deferThirdPartyScripts = () => {
  const scripts = [
    // Add third-party scripts here
    // { src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID', async: true },
  ];

  // Mobile-specific: More aggressive script deferring
  const deferDelay = isMobile() ? 2000 : 1000;

  // Load scripts after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      scripts.forEach(({ src, async = true }) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        
        // Mobile-specific: Lower priority loading
        if (isMobile()) {
          script.setAttribute('importance', 'low');
        }
        
        document.head.appendChild(script);
      });
    }, deferDelay);
  });
};

// Mobile-specific: Defer non-critical JavaScript modules
export const deferNonCriticalJS = () => {
  if (!isMobile()) return; // Only apply on mobile
  
  // Defer non-critical JavaScript features on mobile
  const nonCriticalModules = [
    'animations',
    'parallax',
    'advanced-interactions',
    'analytics'
  ];
  
  // Use requestIdleCallback to load non-critical JS
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      nonCriticalModules.forEach(module => {
        // Dynamically import non-critical modules
        import(`../components/${module}.js`).catch(() => {
          // Silently fail if module doesn't exist
        });
      });
    }, { timeout: 5000 });
  }
};

// Optimize font loading with mobile-first approach
export const optimizeFontLoading = () => {
  const mobile = isMobile();
  
  // Mobile-first: Load only essential fonts, defer decorative fonts
  const style = document.createElement('style');
  
  // Always load Inter 400 (critical for UI)
  let fontStyles = `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: ${mobile ? 'swap' : 'swap'};
      src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
    }
  `;
  
  // Desktop or high-end mobile: Load additional font weights
  if (!mobile || (mobile && navigator.connection && navigator.connection.effectiveType === '4g')) {
    fontStyles += `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2') format('woff2');
      }
    `;
  }
  
  // Defer decorative fonts on mobile, load immediately on desktop
  const loadDecorativeFonts = () => {
    const decorativeStyle = document.createElement('style');
    decorativeStyle.textContent = `
      @font-face {
        font-family: 'Playfair Display';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/playfairdisplay/v39/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Playfair Display';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/playfairdisplay/v39/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `;
    document.head.appendChild(decorativeStyle);
  };
  
  // Load critical fonts immediately
  style.textContent = fontStyles;
  document.head.appendChild(style);
  
  // Mobile: Defer decorative fonts, Desktop: Load immediately
  if (mobile) {
    // Defer decorative fonts on mobile using requestIdleCallback
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadDecorativeFonts, { timeout: 3000 });
    } else {
      setTimeout(loadDecorativeFonts, 2000);
    }
  } else {
    // Load decorative fonts immediately on desktop
    loadDecorativeFonts();
  }
};

// Resource hints for better performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
  ];

  hints.forEach(({ rel, href, crossorigin }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Main optimization function
export const optimizeResources = () => {
  // Immediate optimizations
  addResourceHints();
  inlineCriticalCSS();
  
  // Run optimizations based on page load state
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      optimizeFontLoading();
    });
  } else {
    preloadCriticalResources();
    optimizeFontLoading();
  }

  // Defer non-critical resources after load
  window.addEventListener('load', () => {
    // Use requestIdleCallback for better performance
    const deferredTasks = () => {
      deferNonCriticalCSS();
      deferThirdPartyScripts();
      lazyLoadImages();
    };
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(deferredTasks, { timeout: 2000 });
    } else {
      setTimeout(deferredTasks, 100);
    }
  });
};

// Performance monitoring
export const monitorPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const metrics = {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
          firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime,
        };
        
        console.log('Performance Metrics:', metrics);
        
        // Send to analytics if needed
        // analytics.track('performance', metrics);
      }, 0);
    });
  }
};

// Main mobile optimization initialization function
export const initializeMobileOptimizations = () => {
  if (!isMobile()) return;
  
  // Apply all mobile optimizations in priority order
  optimizeMobileNetworkDependencies(); // Reduce critical request chains first
  deferNonCriticalCSS();
  optimizeFontLoading();
  addMobileResourceHints();
  
  // Set up performance monitoring with mobile-specific metrics
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('Mobile LCP:', entry.startTime);
          // Log if LCP is over mobile threshold (2.5s)
          if (entry.startTime > 2500) {
            console.warn('Mobile LCP exceeds recommended threshold');
          }
        }
        if (entry.entryType === 'first-input-delay') {
          console.log('Mobile FID:', entry.processingStart - entry.startTime);
        }
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
  }
  
  // Monitor network requests for mobile optimization feedback
  monitorMobileNetworkPerformance();
};

// Monitor network performance specifically for mobile
const monitorMobileNetworkPerformance = () => {
  if ('PerformanceObserver' in window) {
    const networkObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const criticalResources = entries.filter(entry => 
        entry.name.match(/\.(css|js|woff2?)$/) && entry.duration > 100
      );
      
      if (criticalResources.length > 0) {
        console.log('Mobile slow resources detected:', criticalResources.map(r => ({
          url: r.name,
          duration: r.duration,
          size: r.transferSize
        })));
      }
    });
    
    networkObserver.observe({ entryTypes: ['resource'] });
  }
};

// Initialize all optimizations with mobile-first approach
export default function initResourceOptimizer() {
  // Mobile-specific: Prioritize critical rendering path more aggressively
  const mobile = isMobile();
  const criticalDelay = mobile ? 0 : 100;
  const nonCriticalDelay = mobile ? 1000 : 200;
  const nonCriticalTimeout = mobile ? 5000 : 3000;
  
  // Run optimizations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Prioritize critical path optimizations
      setTimeout(() => {
        inlineCriticalCSS();
        preloadCriticalResources();
        optimizeFontLoading();
      }, criticalDelay);
      
      // Defer non-critical optimizations with mobile-specific timing
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          deferNonCriticalCSS();
          lazyLoadImages();
          deferThirdPartyScripts();
          
          // Mobile-specific: Defer non-critical JS modules
          if (mobile) {
            deferNonCriticalJS();
          }
        }, { timeout: nonCriticalTimeout });
      } else {
        setTimeout(() => {
          deferNonCriticalCSS();
          lazyLoadImages();
          deferThirdPartyScripts();
          
          // Mobile-specific: Defer non-critical JS modules
          if (mobile) {
            deferNonCriticalJS();
          }
        }, nonCriticalDelay);
      }
    });
  } else {
    // DOM already loaded
    setTimeout(() => {
      inlineCriticalCSS();
      preloadCriticalResources();
      optimizeFontLoading();
    }, criticalDelay);
    
    // Defer non-critical optimizations with mobile-specific timing
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        deferNonCriticalCSS();
        lazyLoadImages();
        deferThirdPartyScripts();
        
        // Mobile-specific: Defer non-critical JS modules
        if (mobile) {
          deferNonCriticalJS();
        }
      }, { timeout: nonCriticalTimeout });
    } else {
      setTimeout(() => {
        deferNonCriticalCSS();
        lazyLoadImages();
        deferThirdPartyScripts();
        
        // Mobile-specific: Defer non-critical JS modules
        if (mobile) {
          deferNonCriticalJS();
        }
      }, nonCriticalDelay);
    }
  }
  
  // Always monitor performance
  monitorPerformance();
}
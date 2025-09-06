// Resource Optimizer - Defer non-critical resources to reduce critical path latency

// Defer non-critical CSS loading
export const deferNonCriticalCSS = () => {
  const deferredStyles = [
    // Tailwind CSS will be loaded by webpack, no external CSS to defer
  ];

  // Load non-critical CSS after page load
  const loadDeferredCSS = () => {
    deferredStyles.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
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
  };

  // Use requestIdleCallback for better performance
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadDeferredCSS);
  } else {
    setTimeout(loadDeferredCSS, 100);
  }
};

// Inline critical CSS extraction (for build process)
export const inlineCriticalCSS = () => {
  // This would be handled by build tools in production
  // For now, we ensure critical styles are in the HTML head
  const criticalStyles = `
    .hero-section { min-height: 100vh; display: flex; align-items: center; }
    .nav-menu { display: flex; gap: 2rem; }
    .card { background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalStyles;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/static/css/main.css', as: 'style' },
    { href: '/static/js/bundle.js', as: 'script' },
  ];

  criticalResources.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (as === 'style') {
      link.onload = function() {
        this.rel = 'stylesheet';
      };
    }
    document.head.appendChild(link);
  });
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

  // Load scripts after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      scripts.forEach(({ src, async = true }) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        document.head.appendChild(script);
      });
    }, 1000); // Delay by 1 second
  });
};

// Optimize font loading
export const optimizeFontLoading = () => {
  // Use font-display: swap for better performance
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2') format('woff2');
    }
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
  document.head.appendChild(style);
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

// Initialize all optimizations
export default function initResourceOptimizer() {
  optimizeResources();
  monitorPerformance();
}
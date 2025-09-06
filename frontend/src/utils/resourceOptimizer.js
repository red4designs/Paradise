// Resource Optimizer - Defer non-critical resources to reduce critical path latency

// Defer non-critical CSS loading
export const deferNonCriticalCSS = () => {
  // Check if CSS is already loaded to avoid duplicate loading
  if (document.querySelector('[data-deferred-css="loaded"]')) {
    return;
  }

  const deferredStyles = [
    // External CSS that can be deferred
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap'
  ];

  // Load non-critical CSS after page load
  const loadDeferredCSS = () => {
    deferredStyles.forEach((href) => {
      // Check if already loaded
      if (document.querySelector(`link[href="${href}"]`)) {
        return;
      }
      
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
    
    // Mark as loaded
    const marker = document.createElement('meta');
    marker.setAttribute('data-deferred-css', 'loaded');
    document.head.appendChild(marker);
  };

  // Use requestIdleCallback for better performance
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadDeferredCSS, { timeout: 2000 });
  } else {
    setTimeout(loadDeferredCSS, 100);
  }
};

// Inline critical CSS extraction (for build process)
export const inlineCriticalCSS = () => {
  // Check if critical CSS is already inlined
  if (document.querySelector('[data-critical="runtime"]')) {
    return;
  }
  
  // Additional critical styles that might be needed at runtime
  const criticalStyles = `
    /* Runtime critical styles */
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
    
    /* Critical card styles */
    .card { 
      background: hsl(var(--card)); 
      color: hsl(var(--card-foreground));
      border-radius: var(--radius); 
      box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
      border: 1px solid hsl(var(--border));
    }
    
    /* Critical responsive utilities */
    @media (max-width: 768px) {
      .hero-section { min-height: 80vh; }
      .nav-menu { flex-direction: column; gap: 1rem; }
    }
    
    /* Critical animation for smooth loading */
    .fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalStyles;
  style.setAttribute('data-critical', 'runtime');
  document.head.appendChild(style);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/images/Views/IMG_20241109_174229_optimized.webp', as: 'image', type: 'image/webp' },
    { href: '/paradise-logo.svg', as: 'image', type: 'image/svg+xml' },
    // Preload critical fonts that are already inlined
    { href: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
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
  // Run optimizations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Prioritize critical path optimizations
      inlineCriticalCSS();
      preloadCriticalResources();
      
      // Defer non-critical optimizations
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          deferNonCriticalCSS();
          lazyLoadImages();
          deferThirdPartyScripts();
        }, { timeout: 3000 });
      } else {
        setTimeout(() => {
          deferNonCriticalCSS();
          lazyLoadImages();
          deferThirdPartyScripts();
        }, 200);
      }
    });
  } else {
    // DOM already loaded
    inlineCriticalCSS();
    preloadCriticalResources();
    
    // Defer non-critical optimizations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        deferNonCriticalCSS();
        lazyLoadImages();
        deferThirdPartyScripts();
      }, { timeout: 3000 });
    } else {
      setTimeout(() => {
        deferNonCriticalCSS();
        lazyLoadImages();
        deferThirdPartyScripts();
      }, 200);
    }
  }
  
  // Always monitor performance
  monitorPerformance();
}
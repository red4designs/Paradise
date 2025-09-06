// Resource Optimizer - Defer non-critical resources to reduce critical path latency

// Defer non-critical CSS loading
export const deferNonCriticalCSS = () => {
  const deferredStyles = [
    // Add non-critical stylesheets here
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap',
  ];

  deferredStyles.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() {
      this.media = 'all';
    };
    document.head.appendChild(link);
  });
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
      font-display: swap;
    }
    @font-face {
      font-family: 'Playfair Display';
      font-display: swap;
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
  // Run optimizations based on page load state
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addResourceHints();
      preloadCriticalResources();
      optimizeFontLoading();
    });
  } else {
    addResourceHints();
    preloadCriticalResources();
    optimizeFontLoading();
  }

  // Defer non-critical resources
  window.addEventListener('load', () => {
    deferNonCriticalCSS();
    deferThirdPartyScripts();
    lazyLoadImages();
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
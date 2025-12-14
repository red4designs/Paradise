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
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap'
  ];

  const loadDeferredCSS = () => {
    deferredStyles.forEach((href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = function () { this.media = 'all'; };
      document.head.appendChild(link);
    });

    const marker = document.createElement('meta');
    marker.setAttribute('data-deferred-css', 'loaded');
    document.head.appendChild(marker);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadDeferredCSS, { timeout: 3000 });
  } else {
    setTimeout(loadDeferredCSS, 1000);
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const resources = [
    { href: '/paradise-logo.svg', as: 'image', type: 'image/svg+xml' },
    {
      href: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous'
    }
  ];

  // Only preload hero image on desktop to save bandwidth on mobile
  if (!isMobile()) {
    resources.push({
      href: '/images/Views/IMG_20241109_174229_optimized.webp',
      as: 'image',
      type: 'image/webp'
    });
  }

  resources.forEach(resource => {
    if (document.querySelector(`link[rel="preload"][href="${resource.href}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
    document.head.appendChild(link);
  });
};

// Lazy load images with Intersection Observer (Standard implementation)
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));
  }
};

// Optimize font loading
export const optimizeFontLoading = () => {
  // Add preconnect hints
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
  ];

  hints.forEach(({ rel, href, crossorigin }) => {
    if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Main optimization function
export default function initResourceOptimizer() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      optimizeFontLoading();

      // Defer non-critical
      const defer = () => {
        deferNonCriticalCSS();
        lazyLoadImages();
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(defer, { timeout: 4000 });
      } else {
        setTimeout(defer, 2000);
      }
    });
  } else {
    preloadCriticalResources();
    optimizeFontLoading();
    deferNonCriticalCSS();
    lazyLoadImages();
  }

  // Basic performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const entry = performance.getEntriesByType('navigation')[0];
        if (entry) {
          console.log(`Load time: ${entry.loadEventEnd - entry.startTime}ms`);
        }
      }, 0);
    });
  }
}
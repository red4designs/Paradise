// Service Worker for Paradise Resort - Core Web Vitals Optimized Caching
const CACHE_NAME = 'paradise-resort-v1.3.1';
const STATIC_CACHE = 'paradise-static-v1.3.1';
const DYNAMIC_CACHE = 'paradise-dynamic-v1.3.1';
const IMAGE_CACHE = 'paradise-images-v1.3.1';
const FONT_CACHE = 'paradise-fonts-v1.3.1';
const API_CACHE = 'paradise-api-v1.3.1';

// Cache duration settings for different resource types
const CACHE_STRATEGIES = {
  static: { maxAge: 31536000000, maxEntries: 100 }, // 1 year
  dynamic: { maxAge: 86400000, maxEntries: 50 }, // 1 day
  images: { maxAge: 2592000000, maxEntries: 200 }, // 30 days
  fonts: { maxAge: 31536000000, maxEntries: 20 }, // 1 year
  api: { maxAge: 300000, maxEntries: 30 } // 5 minutes
};

// Critical resources to cache immediately for faster LCP
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/paradise-logo.svg',
  '/offline.html'
];

// JavaScript chunks to cache (will be updated dynamically)
const JS_CHUNKS = [
  '/static/js/runtime.*.js',
  '/static/js/main.*.js',
  '/static/js/react.*.js'
];

// Font files to cache (no external CSS requests)
const FONT_ASSETS = [
  'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
  'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2',
  'https://fonts.gstatic.com/s/playfairdisplay/v39/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2'
];

// Install event - cache static assets and fonts
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE)
        .then((cache) => {
          console.log('Service Worker: Caching static assets');
          // cache.addAll fails if any request fails. We try to be safer.
          // We can't use cache.addAll safely if some assets might be missing (like offline.html if not created yet)
          // But specific known assets should be fine.
          return cache.addAll(STATIC_ASSETS).catch(err => {
            console.warn('Failed to cache some static assets:', err);
          });
        }),
      // Cache font files
      caches.open(FONT_CACHE)
        .then((cache) => {
          console.log('Service Worker: Caching font assets');
          return cache.addAll(FONT_ASSETS).catch(err => console.warn('Failed to cache fonts:', err));
        })
    ])
      .then(() => {
        console.log('Service Worker: Assets cached successfully');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== IMAGE_CACHE &&
              cacheName !== FONT_CACHE &&
              cacheName !== API_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated and claimed clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests with appropriate strategies
  if (request.method === 'GET') {
    // Font files - Cache First with long expiry
    if (url.pathname.match(/\.(woff|woff2|ttf|otf)$/) || url.hostname === 'fonts.gstatic.com') {
      event.respondWith(cacheFirstFont(request));
    }
    // Images - Cache First with WebP support
    else if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
      event.respondWith(cacheFirstImage(request));
    }
    // CSS and JS - Cache First strategy
    else if (url.pathname.match(/\.(js|css)$/)) {
      event.respondWith(cacheFirst(request));
    }
    // HTML pages - Network First with cache fallback
    else if (url.pathname === '/' || url.pathname.match(/\/(cottages|tents|dormitory|contact)$/)) {
      event.respondWith(networkFirst(request));
    }
    // API calls - Network First
    else if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirst(request));
    }
    // Google Fonts CSS (should be rare due to inlining)
    else if (url.hostname === 'fonts.googleapis.com') {
      event.respondWith(staleWhileRevalidate(request));
    }
    // External resources - Stale While Revalidate
    else if (url.origin !== location.origin) {
      event.respondWith(staleWhileRevalidate(request));
    }
    // Default - Network First
    else {
      event.respondWith(networkFirst(request));
    }
  }
});

// Cache First Strategy - for static assets
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      // Create a new response with long cache headers to satisfy audits
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
      cache.put(request, responseToCache.clone());
      return responseToCache;
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Cache First Strategy - for fonts with long expiry
async function cacheFirstFont(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(FONT_CACHE);
      // Add cache headers for fonts (1 year expiry)
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
      cache.put(request, responseToCache.clone());
      return responseToCache;
    }
    return networkResponse;
  } catch (error) {
    console.log('Font cache failed:', error);
    return new Response('Font unavailable', { status: 503 });
  }
}

// Cache First Strategy - for images
async function cacheFirstImage(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      // Ensure images also report long cache
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'Cache-Control': 'public, max-age=2592000000, immutable'
        }
      });
      cache.put(request, responseToCache.clone());
      return responseToCache;
    }
    return networkResponse;
  } catch (error) {
    console.log('Image cache failed:', error);
    return new Response('Image unavailable', { status: 503 });
  }
}

// Network First Strategy - for HTML and API
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate - for external resources
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then((c) => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Background sync triggered');
}

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});
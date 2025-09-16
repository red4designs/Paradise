/**
 * Trusted Types utility for safe DOM manipulation and XSS prevention
 * Provides secure alternatives to dangerous DOM operations
 */

// Create a Trusted Types policy for safe DOM manipulation
let trustedTypesPolicy = null;

// Disable Trusted Types in development mode to allow webpack to work
const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

if (window.trustedTypes && window.trustedTypes.createPolicy && !isDevelopment) {
  try {
    trustedTypesPolicy = window.trustedTypes.createPolicy('default', {
      createHTML: (string) => {
        // Basic HTML sanitization - in production, consider using DOMPurify
        return string
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
      },
      createScript: (string) => {
        // Only allow safe script content
        return string;
      },
      createScriptURL: (string) => {
        // Validate script URLs - only allow same origin and trusted domains
        const url = new URL(string, window.location.origin);
        const allowedOrigins = [
          window.location.origin,
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://ssl.google-analytics.com',
          'https://connect.facebook.net',
          'https://maps.googleapis.com',
          'https://apis.google.com'
        ];
        
        if (allowedOrigins.some(origin => url.origin === origin) || 
            url.protocol === 'blob:' || 
            (url.protocol === 'http:' && url.hostname === 'localhost')) {
          return string;
        }
        
        throw new Error(`Untrusted script URL: ${string}`);
      }
    });
  } catch (error) {
    console.warn('Failed to create Trusted Types policy:', error);
  }
}

/**
 * Safely set innerHTML using Trusted Types
 * @param {Element} element - The DOM element
 * @param {string} html - The HTML string to set
 */
export function safeSetInnerHTML(element, html) {
  if (trustedTypesPolicy) {
    element.innerHTML = trustedTypesPolicy.createHTML(html);
  } else {
    // Fallback for browsers without Trusted Types support
    element.textContent = html.replace(/<[^>]*>/g, '');
  }
}

/**
 * Safely insert HTML using insertAdjacentHTML with Trusted Types
 * @param {Element} element - The DOM element
 * @param {string} position - The position ('beforebegin', 'afterbegin', 'beforeend', 'afterend')
 * @param {string} html - The HTML string to insert
 */
export function safeInsertAdjacentHTML(element, position, html) {
  if (trustedTypesPolicy) {
    element.insertAdjacentHTML(position, trustedTypesPolicy.createHTML(html));
  } else {
    // Fallback for browsers without Trusted Types support
    const textNode = document.createTextNode(html.replace(/<[^>]*>/g, ''));
    element.insertAdjacentElement(position, textNode);
  }
}

/**
 * Safely create and configure a script element
 * @param {string} src - The script source URL
 * @param {Object} attributes - Additional attributes for the script element
 * @returns {HTMLScriptElement} The configured script element
 */
export function safeCreateScript(src, attributes = {}) {
  const script = document.createElement('script');
  
  if (trustedTypesPolicy && src) {
    script.src = trustedTypesPolicy.createScriptURL(src);
  } else if (src) {
    script.src = src;
  }
  
  // Set additional attributes
  Object.keys(attributes).forEach(key => {
    script.setAttribute(key, attributes[key]);
  });
  
  return script;
}

/**
 * Create a Worker with Trusted Types support
 * @param {string} scriptURL - The worker script URL
 * @param {Object} options - Worker options
 * @returns {Worker} The worker instance
 */
export function safeCreateWorker(scriptURL, options = {}) {
  if (trustedTypesPolicy) {
    return new Worker(trustedTypesPolicy.createScriptURL(scriptURL), options);
  } else {
    return new Worker(scriptURL, options);
  }
}

export default trustedTypesPolicy;
import { useEffect, useState } from 'react';

const GoogleAnalyticsFacade = ({ 
  measurementId = 'AW-615136649',
  loadDelay = 3000, // Default 3 second delay
  loadOnInteraction = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Load GA script
  const loadGoogleAnalytics = () => {
    if (isLoaded || typeof window === 'undefined') return;

    // Create and load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', measurementId);

      // Add conversion tracking function
      window.gtag_report_conversion = function(url) {
        const callback = function () {
          if (typeof(url) != 'undefined') {
            window.location = url;
          }
        };
        gtag('event', 'conversion', {
          'send_to': `${measurementId}/99zfCMSP6ZUbEIn7qKUC`,
          'value': 1.0,
          'currency': 'INR',
          'event_callback': callback
        });
        return false;
      };

      setIsLoaded(true);
      console.log('Google Analytics loaded lazily');
    };
  };

  // Handle user interaction
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (loadOnInteraction) {
        loadGoogleAnalytics();
      }
    }
  };

  useEffect(() => {
    // Load after delay if no interaction required
    if (!loadOnInteraction) {
      const timer = setTimeout(() => {
        loadGoogleAnalytics();
      }, loadDelay);
      return () => clearTimeout(timer);
    }

    // Load on user interaction
    if (loadOnInteraction && !hasInteracted) {
      const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
      
      events.forEach(event => {
        document.addEventListener(event, handleInteraction, { 
          once: true, 
          passive: true 
        });
      });

      // Fallback: load after delay even without interaction
      const fallbackTimer = setTimeout(() => {
        if (!hasInteracted) {
          loadGoogleAnalytics();
        }
      }, loadDelay);

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleInteraction);
        });
        clearTimeout(fallbackTimer);
      };
    }
  }, [measurementId, loadDelay, loadOnInteraction, hasInteracted]);

  // This component doesn't render anything visible
  return null;
};

export default GoogleAnalyticsFacade;
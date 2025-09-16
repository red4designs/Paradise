import React, { useState, useCallback } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const GoogleMapsFacade = ({ 
  embedUrl,
  directionsUrl,
  title = 'Location Map',
  address = '',
  className = '',
  aspectRatio = 'aspect-video'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMap = useCallback(() => {
    setIsLoading(true);
    // Small delay to show loading state
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleDirections = useCallback((e) => {
    e.stopPropagation();
    if (directionsUrl) {
      window.open(directionsUrl, '_blank', 'noopener,noreferrer');
    }
  }, [directionsUrl]);

  if (isLoaded) {
    return (
      <div className={`${aspectRatio} ${className}`}>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className={`${aspectRatio} ${className} relative group cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20`}>
      {/* Map Placeholder Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-800/30 dark:to-green-800/30" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {/* Map Icon */}
        <div className="mb-4">
          {isLoading ? (
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-blue-700 transition-colors duration-300">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        
        {/* Title and Address */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-1">
            {title}
          </h3>
          {address && (
            <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2">
              {address}
            </p>
          )}
        </div>
        
        {/* Load Map Button */}
        <button
          onClick={handleLoadMap}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
        >
          {isLoading ? 'Loading Map...' : 'Load Interactive Map'}
        </button>
        
        {/* Directions Link */}
        {directionsUrl && (
          <button
            onClick={handleDirections}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-300"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-300 dark:border-blue-600 opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-300 dark:border-blue-600 opacity-50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-300 dark:border-blue-600 opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-300 dark:border-blue-600 opacity-50" />
    </div>
  );
};

export default GoogleMapsFacade;
import React, { useState, useCallback } from 'react';
import { Play, Youtube } from 'lucide-react';

const YouTubeFacade = ({ 
  videoId, 
  title, 
  className = '',
  aspectRatio = 'aspect-video',
  startTime = 0,
  thumbnailQuality = 'hqdefault'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadVideo = useCallback(() => {
    setIsLoading(true);
    // Small delay to show loading state
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }, 300);
  }, []);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}${startTime ? `?start=${startTime}` : ''}${startTime ? '&' : '?'}autoplay=1`;

  if (isLoaded) {
    return (
      <div className={`${aspectRatio} ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0 rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`${aspectRatio} ${className} relative group cursor-pointer overflow-hidden rounded-lg`}>
      {/* Thumbnail Background */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          // Fallback to lower quality thumbnail if maxres fails
          if (thumbnailQuality === 'maxresdefault') {
            e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
      
      {/* Play Button */}
      <button
        onClick={handleLoadVideo}
        disabled={isLoading}
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        aria-label={`Play video: ${title}`}
      >
        {isLoading ? (
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors duration-300">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </div>
        )}
      </button>
      
      {/* YouTube Logo */}
      <div className="absolute top-4 right-4 opacity-80">
        <Youtube className="w-8 h-8 text-red-600" />
      </div>
      
      {/* Video Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white font-medium text-sm line-clamp-2">{title}</h3>
      </div>
    </div>
  );
};

export default YouTubeFacade;
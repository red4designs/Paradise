import React, { useState, useRef, useEffect } from 'react';
import { useWorkerManager } from '../../utils/workerManager';
import { createOptimizedIntersectionObserver, preventImageLayoutShift } from '../../utils/layoutOptimizer';
import ImageShare from './ImageShare';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = '/images/placeholder.jpg',
  loading = 'lazy',
  responsive = false,
  enableSharing = true,
  shareTitle,
  shareDescription,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(loading === 'eager');
  const [isInView, setIsInView] = useState(loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const [processedSrc, setProcessedSrc] = useState(src);
  const imgRef = useRef();
  const workerManager = useWorkerManager();

  // Bypass Observer if loading is eager
  useEffect(() => {
    if (loading === 'eager') {
      return;
    }

    const observer = createOptimizedIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Process image with web worker when it comes into view
  useEffect(() => {
    if (isInView && src && workerManager) {
      workerManager.processImages([{ src, alt }])
        .then(results => {
          if (results && results.length > 0) {
            setProcessedSrc(results[0].optimizedSrc || src);
          }
        })
        .catch(error => {
          console.warn('Image processing failed, using original:', error);
          setProcessedSrc(src);
        });
    }
  }, [isInView, src, alt, workerManager]);

  const handleLoad = (event) => {
    preventImageLayoutShift(event.target);
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Generate WebP source if original is JPEG/JPG
  const getWebPSource = (originalSrc) => {
    // Automatic WebP generation disabled as not all images have WebP versions
    // preventing 404 errors for tent photos
    return null;
  };

  // Generate mobile version for responsive images
  const getMobileSource = (originalSrc) => {
    if (responsive && originalSrc.includes('_optimized.webp')) {
      return originalSrc.replace('_optimized.webp', '_mobile.webp');
    }
    return null;
  };

  const webpSrc = getWebPSource(src);
  const mobileSrc = getMobileSource(src);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[hsl(var(--muted))] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[hsl(var(--muted-foreground)_/_0.3)] border-t-[hsl(var(--muted-foreground))] rounded-full animate-spin"></div>
        </div>
      )}

      {/* Actual image with WebP support and responsive sources */}
      {isInView && (
        <picture>
          {mobileSrc && (
            <source srcSet={mobileSrc} media="(max-width: 768px)" type="image/webp" />
          )}
          {webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <img
            src={hasError ? placeholder : processedSrc}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`
              w-full h-full object-cover
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            decoding="async"
          />
        </picture>
      )}

      {/* Share Button - Only show on hover and when loaded */}
      {enableSharing && isLoaded && !hasError && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ImageShare
            imageUrl={processedSrc}
            imageTitle={shareTitle || alt}
            imageDescription={shareDescription || `Beautiful view at Paradise Resort Vattavada - ${alt}`}
            size="sm"
            variant="ghost"
            className="bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
          />
        </div>
      )}
    </div>
  );
};

export default LazyImage;
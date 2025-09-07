import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '../data/mock';
import LazyImage from './ui/LazyImage';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';
import PerformanceOptimizer from './PerformanceOptimizer';

const ITEM_HEIGHT = 280; // Height of each gallery item
const ITEMS_PER_ROW = 4; // Items per row on desktop
const BUFFER_SIZE = 2; // Number of rows to render outside viewport
const TESTIMONIAL_HEIGHT = 320; // Height of each testimonial card

const VirtualScrollGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);
  
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);
  const { debounce, scheduleIdleTask } = usePerformanceOptimization();

  const categories = useMemo(() => 
    ['All', 'Deluxe Room', 'Double Room', 'Dormitory', 'Cottages', 'Tents', 'Views', 'Activities'],
    []
  );
  
  // Memoize filtered images
  const allFilteredImages = useMemo(() => {
    if (selectedCategory === 'All') {
      return mockData.gallery;
    }
    return mockData.gallery.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);
  
  // For 'All' category, show only 12 images initially unless expanded
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All' && !isExpanded) {
      return allFilteredImages.slice(0, 12);
    }
    return allFilteredImages;
  }, [selectedCategory, isExpanded, allFilteredImages]);

  // Calculate virtual scrolling parameters for gallery
  const galleryVirtualData = useMemo(() => {
    const totalItems = filteredImages.length;
    const totalRows = Math.ceil(totalItems / ITEMS_PER_ROW);
    const totalHeight = totalRows * ITEM_HEIGHT;
    
    const startRow = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE);
    const endRow = Math.min(totalRows, Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER_SIZE);
    
    const visibleItems = [];
    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < ITEMS_PER_ROW; col++) {
        const index = row * ITEMS_PER_ROW + col;
        if (index < totalItems) {
          visibleItems.push({
            ...filteredImages[index],
            index,
            top: row * ITEM_HEIGHT,
            left: (col * 100) / ITEMS_PER_ROW + '%',
            width: (100 / ITEMS_PER_ROW) + '%'
          });
        }
      }
    }
    
    return {
      totalHeight,
      visibleItems,
      startRow,
      endRow
    };
  }, [filteredImages, scrollTop, containerHeight]);

  // Calculate virtual scrolling for testimonials
  const testimonialsVirtualData = useMemo(() => {
    const testimonials = mockData.testimonials;
    const itemsPerRow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const totalRows = Math.ceil(testimonials.length / itemsPerRow);
    const totalHeight = totalRows * TESTIMONIAL_HEIGHT;
    
    // For testimonials, we'll render all for now but could virtualize if needed
    return {
      totalHeight,
      visibleItems: testimonials.map((testimonial, index) => ({
        ...testimonial,
        index
      }))
    };
  }, []);

  // Handle scroll events
  const handleScroll = useCallback(
    debounce((e) => {
      setScrollTop(e.target.scrollTop);
    }, 16), // ~60fps
    [debounce]
  );

  // Update container height on resize
  useEffect(() => {
    const updateHeight = () => {
      if (galleryRef.current) {
        setContainerHeight(galleryRef.current.clientHeight);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setIsExpanded(false);
    setScrollTop(0);
    if (galleryRef.current) {
      galleryRef.current.scrollTop = 0;
    }
  }, []);

  const openLightbox = useCallback((image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const nextImage = useCallback(() => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
    setLightboxIndex(nextIndex);
  }, [lightboxIndex, filteredImages]);

  const prevImage = useCallback(() => {
    const prevIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxImage(filteredImages[prevIndex]);
    setLightboxIndex(prevIndex);
  }, [lightboxIndex, filteredImages]);

  const handleExpandToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <section id="gallery" className="section-padding bg-black">
      <div className="max-width-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">📸 Experience Paradise</h2>
          <p className="body-large text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            Take a visual journey through our stunning accommodations 🏠, breathtaking views 🌄, 
            and memorable experiences at Paradise Resort Vattavada. ✨
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 border ${
                selectedCategory === category
                  ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))]'
                  : 'bg-[hsl(var(--card)_/_0.5)] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]'
              }`}
            >
              <span className="body-medium font-medium">{category}</span>
            </button>
          ))}
        </div>

        {/* Expand/Collapse Button for 'All' category */}
        {selectedCategory === 'All' && allFilteredImages.length > 12 && (
          <div className="text-center mb-16">
            <button
              onClick={handleExpandToggle}
              className="px-8 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)_/_0.9)] font-medium"
            >
              {isExpanded ? (
                <span className="flex items-center gap-2">
                  Show Less Photos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  View All {allFilteredImages.length} Photos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        )}

        {/* Virtual Scrolling Gallery Grid */}
        <PerformanceOptimizer>
          <div 
            ref={galleryRef}
            className="relative overflow-auto mb-8"
            style={{ height: '600px' }}
            onScroll={handleScroll}
          >
            <div 
              className="relative"
              style={{ height: galleryVirtualData.totalHeight }}
            >
              {galleryVirtualData.visibleItems.map((item) => (
                <div 
                  key={item.id}
                  className="absolute cursor-pointer group"
                  style={{
                    top: item.top,
                    left: item.left,
                    width: `calc(${item.width} - 1.5rem)`,
                    height: ITEM_HEIGHT - 24,
                    margin: '0.75rem'
                  }}
                  onClick={() => openLightbox(item, item.index)}
                >
                  <div className="relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg overflow-hidden h-full hover:border-[hsl(var(--primary))] transition-colors">
                    <LazyImage
                      src={item.image}
                      alt={`${item.title} - ${item.category} at Paradise Resort Vattavada`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Simplified Hover Overlay */}
                    <div className="absolute inset-0 bg-[hsl(var(--background)_/_0.8)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImageIcon size={32} className="text-[hsl(var(--primary))]" />
                    </div>
                    
                    {/* Category Badge */}
                    <span className="absolute top-2 left-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PerformanceOptimizer>

        {/* Testimonials Section - Optimized */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="display-medium text-[hsl(var(--primary))]">💬 Verified Guest Reviews</h3>
            <p className="body-medium text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              Real experiences from verified guests who have stayed at Paradise Resort Vattavada
            </p>
          </div>
          
          <PerformanceOptimizer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialsVirtualData.visibleItems.slice(0, 6).map((testimonial) => (
                <Card key={testimonial.id} className="bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header with Rating and Verification */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-[hsl(var(--primary))] rounded-sm"></div>
                          ))}
                        </div>
                        {testimonial.verified && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-full">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Stay Details */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-[hsl(var(--primary)_/_0.1)] text-[hsl(var(--primary))] rounded-full">
                          {testimonial.accommodationType}
                        </span>
                        <span className="px-2 py-1 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-full">
                          {testimonial.stayDuration}
                        </span>
                      </div>
                      
                      {/* Comment */}
                      <p className="body-small text-[hsl(var(--muted-foreground))] italic leading-relaxed line-clamp-4">
                        "{testimonial.comment}"
                      </p>
                      
                      {/* Author Info */}
                      <div className="pt-4 border-t border-[hsl(var(--border))] space-y-1">
                        <p className="body-medium text-[hsl(var(--foreground))] font-medium">{testimonial.name}</p>
                        <p className="body-small text-[hsl(var(--muted-foreground))]">{testimonial.profession}</p>
                        <p className="body-small text-[hsl(var(--muted-foreground))]">{testimonial.location}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] opacity-75">{testimonial.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </PerformanceOptimizer>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-8 max-w-xl mx-auto">
            <h3 className="heading-2 mb-4">Create Your Own Memories</h3>
            <p className="body-medium text-[hsl(var(--muted-foreground))] mb-6">
              Join our happy guests and experience the magic of Vattavada mountains.
            </p>
            <a href="#contact" className="btn-primary">
              Book Your Stay
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-[hsl(var(--background)_/_0.2)] hover:bg-[hsl(var(--background)_/_0.3)] flex items-center justify-center transition-colors"
            >
              <X size={24} className="text-[hsl(var(--foreground))]" />
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[hsl(var(--background)_/_0.2)] hover:bg-[hsl(var(--background)_/_0.3)] flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={24} className="text-[hsl(var(--foreground))]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[hsl(var(--background)_/_0.2)] hover:bg-[hsl(var(--background)_/_0.3)] flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={24} className="text-[hsl(var(--foreground))]" />
                </button>
              </>
            )}

            {/* Optimized Lightbox Image */}
            <div className="relative">
              <LazyImage
                src={lightboxImage.image}
                alt={`${lightboxImage.title} - ${lightboxImage.category} at Paradise Resort Vattavada budget accommodation`}
                className="w-full h-auto max-h-[80vh] object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VirtualScrollGallery;
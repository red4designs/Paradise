import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '../data/mock';
import LazyImage from './ui/LazyImage';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = ['All', 'Deluxe Room', 'Double Room', 'Dormitory', 'Cottages', 'Tents', 'Views', 'Activities'];
  
  // Reset expanded state when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsExpanded(false);
  };
  
  const allFilteredImages = selectedCategory === 'All' 
    ? mockData.gallery 
    : mockData.gallery.filter(item => item.category === selectedCategory);
  
  // For 'All' category, show only 6 images initially unless expanded
  const filteredImages = selectedCategory === 'All' && !isExpanded 
    ? allFilteredImages.slice(0, 6)
    : allFilteredImages;

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
    setLightboxIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxImage(filteredImages[prevIndex]);
    setLightboxIndex(prevIndex);
  };

  const handleImageError = (imageId) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  const handleImageLoad = (imageId) => {
    setImageErrors(prev => ({ ...prev, [imageId]: false }));
  };

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
              className={`px-6 py-3 border transition-all duration-300 ${
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
        {selectedCategory === 'All' && allFilteredImages.length > 6 && (
          <div className="text-center mb-16">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)_/_0.9)] transition-all duration-300 font-medium"
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

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredImages.map((item, index) => (
            <Card 
              key={item.id} 
              className="theme-card theme-hover cursor-pointer overflow-hidden group"
              onClick={() => openLightbox(item, index)}
              style={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))'
              }}
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Optimized Lazy Image */}
                  <LazyImage
                    src={item.image}
                    alt={`${item.title} - ${item.category} at Paradise Resort Vattavada budget accommodation`}
                    className="aspect-square transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    style={{ backgroundColor: 'hsl(var(--background) / 0.8)' }}
                  >
                    <div className="text-center">
                      <ImageIcon size={32} style={{ color: 'hsl(var(--primary))' }} className="mx-auto mb-2" />
                      <p className="body-small" style={{ color: 'hsl(var(--foreground))' }}>View Full Size</p>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <Badge 
                    className="absolute top-2 left-2 z-10"
                    style={{
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))'
                    }}
                  >
                    {item.category}
                  </Badge>
                </div>
                

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="space-y-8">
          <h3 className="display-medium text-center text-[hsl(var(--primary))]">💬 What Our Guests Say</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {mockData.testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Star Rating */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-[hsl(var(--primary))]"></div>
                      ))}
                    </div>
                    
                    {/* Comment */}
                    <p className="body-medium text-[hsl(var(--muted-foreground))] italic">
                      "{testimonial.comment}"
                    </p>
                    
                    {/* Author */}
                    <div className="pt-4 border-t border-[hsl(var(--border))]">
              <p className="body-medium text-[hsl(var(--foreground))] font-medium">{testimonial.name}</p>
                      <p className="body-small text-[hsl(var(--muted-foreground))]">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

export default Gallery;
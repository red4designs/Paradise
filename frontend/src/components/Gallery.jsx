import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '../data/mock';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const categories = ['All', 'Deluxe Room', 'Double Room', 'Dormitory', 'Cottages', 'Tents', 'Views', 'Activities'];
  
  const filteredImages = selectedCategory === 'All' 
    ? mockData.gallery 
    : mockData.gallery.filter(item => item.category === selectedCategory);

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
              onClick={() => setSelectedCategory(category)}
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

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
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
                  {/* Actual Image */}
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={() => handleImageError(item.id)}
                      onLoad={() => handleImageLoad(item.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div 
                      className="aspect-square flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: 'hsl(var(--muted))',
                      }}
                    >
                      <div className="text-center">
                        <ImageIcon size={48} style={{ color: 'hsl(var(--primary))' }} />
                        <p className="body-small mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Image not found</p>
                      </div>
                    </div>
                  )}
                  
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
                
                {/* Image Info */}
                <div className="p-4">
                  <h4 className="body-medium" style={{ color: 'hsl(var(--foreground))' }}>{item.title}</h4>
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

            {/* Image */}
            <div className="relative">
              {!imageErrors[lightboxImage.id] ? (
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  onError={() => handleImageError(lightboxImage.id)}
                  onLoad={() => handleImageLoad(lightboxImage.id)}
                />
              ) : (
                <div className="aspect-video bg-[hsl(var(--muted)_/_0.1)] flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon size={64} className="text-[hsl(var(--primary))] mx-auto mb-4" />
                    <p className="body-medium text-[hsl(var(--muted-foreground))] mb-2">Image not available</p>
                  </div>
                </div>
              )}
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="body-medium text-white mb-2">{lightboxImage.title}</p>
                <Badge className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">{lightboxImage.category}</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
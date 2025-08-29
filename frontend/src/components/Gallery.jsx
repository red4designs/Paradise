import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '../data/mock';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['All', 'Cottages', 'Tents', 'Views', 'Activities'];
  
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

  return (
    <section id="gallery" className="section-padding bg-black">
      <div className="max-width-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">📸 Experience Paradise</h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
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
                  ? 'bg-brand-primary text-black border-brand-primary'
                  : 'bg-white/5 text-text-secondary border-white/25 hover:border-brand-primary hover:text-brand-primary'
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
              className="bg-white/5 border-white/25 dark-hover dark-transition cursor-pointer overflow-hidden group"
              onClick={() => openLightbox(item, index)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ImageIcon size={48} className="text-brand-primary" />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon size={32} className="text-white mx-auto mb-2" />
                      <p className="body-small text-white">View Image</p>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <Badge className="absolute top-2 left-2 bg-brand-primary text-black">
                    {item.category}
                  </Badge>
                </div>
                
                {/* Image Info */}
                <div className="p-4">
                  <h4 className="body-medium text-text-primary">{item.title}</h4>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="space-y-8">
          <h3 className="display-medium text-center text-brand-primary">💬 What Our Guests Say</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {mockData.testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white/5 border-white/25">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Star Rating */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-brand-primary"></div>
                      ))}
                    </div>
                    
                    {/* Comment */}
                    <p className="body-medium text-text-secondary italic">
                      "{testimonial.comment}"
                    </p>
                    
                    {/* Author */}
                    <div className="pt-4 border-t border-white/25">
                      <p className="body-medium text-text-primary font-medium">{testimonial.name}</p>
                      <p className="body-small text-text-muted">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/5 border border-white/25 p-8 max-w-xl mx-auto">
            <h3 className="heading-2 mb-4">Create Your Own Memories</h3>
            <p className="body-medium text-text-secondary mb-6">
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
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="aspect-video bg-white/10 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon size={64} className="text-brand-primary mx-auto mb-4" />
                <p className="heading-2 text-white mb-2">{lightboxImage.title}</p>
                <Badge className="bg-brand-primary text-black">{lightboxImage.category}</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
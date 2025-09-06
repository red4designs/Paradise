import React from 'react';
import { Card, CardContent } from './ui/card';
import { mockData } from '../data/mock';
import { 
  Wifi, 
  Droplets, 
  Home, 
  Mountain, 
  Music, 
  ChefHat, 
  Car, 
  Eye 
} from 'lucide-react';
import LazyImage from './ui/LazyImage';
import PerformanceOptimizer from './PerformanceOptimizer';

const iconMap = {
  Wifi,
  Droplets,
  Home,
  Mountain,
  Music,
  ChefHat,
  Car,
  Eye
};

const Amenities = () => {
  return (
    <section 
      id="amenities" 
      className="section-padding bg-black"
    >
      <div className="max-width-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">🌟 World-Class Amenities</h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Every comfort and adventure you need for an unforgettable mountain experience 🏔️, 
            from modern facilities to thrilling outdoor activities. 🎯
          </p>
        </div>

        {/* Amenities Grid */}
        <PerformanceOptimizer>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {mockData.amenities.map((amenity) => {
              const IconComponent = iconMap[amenity.icon];
              
              return (
                <Card key={amenity.id} className="bg-white/5 border-white/25 dark-hover dark-transition">
                  <CardContent className="p-6 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-brand-primary/10 flex items-center justify-center mx-auto">
                        <IconComponent size={32} className="text-brand-primary" />
                      </div>
                      <div>
                        <h3 className="heading-3 mb-2">{amenity.name}</h3>
                        <p className="body-small text-text-secondary">{amenity.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </PerformanceOptimizer>

        {/* Featured Amenities Details */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="display-medium text-brand-primary mb-6">Premium Comfort Meets Adventure</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="heading-3">Modern Facilities</h4>
                  <p className="body-medium text-text-secondary">
                    Stay connected with free high-speed WiFi and enjoy 24/7 hot water supply. 
                    Our private cottages and adventure tents are equipped with all modern amenities 
                    while maintaining the authentic mountain experience.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="heading-3">Adventure Activities</h4>
                  <p className="body-medium text-text-secondary">
                    Experience the thrill of guided jeep trekking through scenic mountain trails. 
                    Enjoy magical campfire nights with music and BBQ sessions under the starlit sky.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="heading-3">Breathtaking Views</h4>
                  <p className="body-medium text-text-secondary">
                    Wake up to spectacular valley views extending up to 5 kilometers on clear days. 
                    Our strategic location offers unparalleled mountain vistas and peaceful surroundings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Amenities Highlights */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary flex items-center justify-center">
                    <Home size={24} className="text-black" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="heading-3">🏠 Private Cottages</h4>
                    <p className="body-small text-text-secondary">
                      Spacious 3-bedroom cottages accommodating up to 18 guests with complete privacy and comfort.
                    </p>
                    <div className="aspect-video bg-white/10 border border-white/20 overflow-hidden rounded-sm mt-3">
                      <img 
                        src={`/images/Cottages/IMG_20250208_122711.jpg?v=${Date.now()}`} 
                        alt="3 bedroom private cottage in Vattavada - budget resort accommodation" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary flex items-center justify-center">
                    <Mountain size={24} className="text-black" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="heading-3">⛺ Adventure Camping</h4>
                    <p className="body-small text-text-secondary">
                      8 premium tents for up to 24 guests, perfect for group adventures and nature immersion.
                    </p>
                    <div className="aspect-video bg-white/10 border border-white/20 overflow-hidden rounded-sm mt-3">
                      <LazyImage 
                        src="/images/Tents/IMG_3632.JPEG?v=1" 
                        alt="Premium camping tents in Vattavada - adventure camping experience" 
                        className="w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-primary flex items-center justify-center">
                    <Music size={24} className="text-black" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="heading-3">🔥 Evening Entertainment</h4>
                    <p className="body-small text-text-secondary">
                      Campfire nights with music and BBQ facilities creating unforgettable mountain memories.
                    </p>
                    <div className="aspect-video bg-white/10 border border-white/20 overflow-hidden rounded-sm mt-3">
                      <LazyImage 
                        src="/images/Views/WhatsApp Image 2025-08-30 at 21.03.59_5b7a8811.jpg" 
                        alt="Campfire night at budget resort Vattavada - evening entertainment" 
                        className="w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/5 border border-white/25 p-8 max-w-xl mx-auto">
            <h3 className="heading-2 mb-4">Ready for Your Mountain Adventure?</h3>
            <p className="body-medium text-text-secondary mb-6">
              Book now and experience all our amazing amenities firsthand.
            </p>
            <a href="#packages" className="btn-primary">
              View Packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
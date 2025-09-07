import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Check, Phone, MessageCircle } from 'lucide-react';
import { mockData } from '../data/mock';
import LazyImage from './ui/LazyImage';
import PerformanceOptimizer from './PerformanceOptimizer';

const Packages = () => {
  const handleContact = (packageName) => {
    const message = `Hi! I'm interested in the ${packageName} package at Paradise Resort Vattavada. Can you please provide more details and pricing?`;
    window.open(`https://wa.me/919074902424?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    if (window.gtag_report_conversion) {
      window.gtag_report_conversion('tel:9074902424');
    }
    window.open('tel:9074902424');
  };

  return (
    <section id="packages" className="section-padding bg-black">
      <div className="max-width-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">🏨 Budget Stay in Vattavada - Choose Your Perfect Package</h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            From intimate couple retreats 💕 to large group adventures 👥, our family friendly resort in Vattavada 
            offers the perfect homestay in Vattavada and tent stay in Vattavada packages for every type of 
            Vattavada trekking stay and mountain getaway. 🏔️
          </p>
        </div>

        {/* Packages Grid */}
        <PerformanceOptimizer>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {mockData.packages.map((pkg, index) => (
              <Card key={pkg.id} className={`bg-white/5 border-white/25 dark-hover dark-transition relative overflow-hidden ${
                index === 1 ? 'border-brand-primary/50 transform lg:scale-105' : ''
              }`}>
              {index === 1 && (
                <div className="absolute top-0 right-0 bg-brand-primary text-black px-4 py-1">
                  <span className="body-small font-semibold">Most Popular</span>
                </div>
              )}
              
              <CardHeader className="p-6 pb-4">
                <div className="space-y-4">
                  {/* Package Image */}
                  <div className="aspect-video bg-white/10 border border-white/20 overflow-hidden relative">
                    {index === 0 ? (
                      <img 
                        src={`/images/Cottages/IMG_20250208_122711.jpg?v=${Date.now()}`} 
                        alt={`${pkg.name} - homestay in Vattavada budget resort package Kerala`} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : index === 1 ? (
                      <LazyImage 
                         src="/images/Views/IMG_1701_optimized.webp" 
                         alt={`${pkg.name} - homestay in Vattavada budget resort package Kerala`} 
                         className="w-full h-full object-cover"
                         responsive={true}
                       />
                    ) : (
                      <LazyImage 
                        src="/images/Views/IMG_20250220_213601.jpg" 
                        alt={`${pkg.name} - homestay in Vattavada budget resort package Kerala`} 
                        className="w-full h-full"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  
                  <div>
                    <h3 className="heading-2 mb-2">{pkg.name}</h3>
                    <Badge variant="secondary" className="bg-brand-primary/20 text-brand-primary">
                      {pkg.capacity}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-2">
                <div className="space-y-6">
                  {/* Features List */}
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check size={12} className="text-brand-primary bg-brand-primary/20 p-1 rounded" />
                        <span className="body-small text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="space-y-4">
                    <div className="text-center py-4 bg-white/5 border border-white/20">
                      <p className="heading-3 text-brand-primary">{pkg.price}</p>
                      <p className="body-small text-text-muted">Best rates guaranteed</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button 
                        onClick={() => handleContact(pkg.name)}
                        className="w-full btn-primary"
                      >
                        <MessageCircle size={18} />
                        WhatsApp for Pricing
                      </button>
                      <button 
                        onClick={handleCall}
                        className="w-full btn-secondary"
                      >
                        <Phone size={18} />
                        Call for Details
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
              </Card>
            ))}
          </div>
        </PerformanceOptimizer>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/25">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="heading-2 text-brand-primary">Group Bookings</h3>
                <p className="body-medium text-text-secondary">
                  Planning a corporate retreat, family reunion, or adventure trip with friends? 
                  We offer special group packages with customized activities, meals, and exclusive access to our facilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    <span className="body-small">Corporate team building packages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    <span className="body-small">Family reunion special rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    <span className="body-small">Adventure group activities</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/25">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="heading-2 text-brand-primary">What's Included</h3>
                <p className="body-medium text-text-secondary">
                  All our packages come with essential amenities and services to ensure 
                  a comfortable and memorable stay in the beautiful mountains of Vattavada.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-primary"></div>
                    <span className="body-small">Free WiFi & 24/7 hot water</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-primary"></div>
                    <span className="body-small">Campfire & BBQ facilities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-primary"></div>
                    <span className="body-small">Guided local area tours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-primary"></div>
                    <span className="body-small">24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-brand-primary/10 to-transparent border border-brand-primary/30 p-8 max-w-2xl mx-auto">
            <h3 className="heading-2 mb-4">Ready to Book Your Mountain Escape?</h3>
            <p className="body-medium text-text-secondary mb-6">
              Contact us today for personalized packages and the best rates for your perfect Vattavada getaway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => handleContact('Custom Package')} className="btn-primary">
                <MessageCircle size={18} />
                Get Custom Quote
              </button>
              <a href="#contact" className="btn-secondary">
                View All Options
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
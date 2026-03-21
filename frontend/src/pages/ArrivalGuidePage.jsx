import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '../constants/seo';
import { MapPin, Navigation2, Compass, AlertCircle } from 'lucide-react';

const ArrivalGuidePage = () => {
  return (
    <div className="bg-sand min-h-screen pt-24 pb-32">
      <Helmet>
        <title>Arrival Guide | Paradise Resort Vattavada</title>
        <meta name="description" content="Directions, map, and essential travel information to reach Paradise Resort Vattavada smoothly." />
        <link rel="canonical" href={`${BASE_URL}/guide`} />
      </Helmet>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 fade-in-up">
        <span className="uppercase tracking-[0.2em] text-xs font-medium text-forest/80 block mb-4">Journey</span>
        <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">Arrival <span className="italic font-light">Guide</span></h1>
        <p className="text-lg text-forest/90 font-light max-w-2xl mx-auto">
          Navigate your way to our mountain sanctuary. Everything you need to know for a smooth and scenic journey to Vattavada.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Route Information */}
        <section className="grid lg:grid-cols-2 gap-12 items-center fade-in-up">
          <div className="space-y-8">
            <h2 className="font-serif text-3xl text-forest border-b border-forest/10 pb-4">The Route</h2>
            
            <div className="flex gap-4">
              <Navigation2 size={24} className="text-eucalyptus shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-medium text-forest mb-2">From Munnar Center</h3>
                <p className="text-forest/90 font-light leading-relaxed mb-1">Distance: ~42 km</p>
                <p className="text-forest/90 font-light leading-relaxed mb-4">Drive Time: ~1.5 - 2 Hours</p>
                <p className="text-forest/90 font-light leading-relaxed text-sm">
                  Take the Munnar - Top Station Highway. Pass through the beautifully scenic Mattupetty Dam, Echo Point, and Kundala Lake. After Top Station, proceed towards Pampadum Shola National Park into Vattavada.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Compass size={24} className="text-eucalyptus shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-medium text-forest mb-2">Landmark</h3>
                <p className="text-forest/90 font-light leading-relaxed text-sm">
                  We are located exactly 1.5 kilometers before the main Vattavada town center, offering a pristine, secluded environment while retaining easy access to the village.
                </p>
              </div>
            </div>

            <div className="bg-forest/5 p-6 border-l-2 border-forest">
              <div className="flex gap-3 items-start">
                <AlertCircle size={20} className="text-forest shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-forest/80 text-sm font-light leading-relaxed">
                  <strong>Travel Tip:</strong> The road through the Shola forest is stunning but winding. We recommend arriving before dusk for the best driving experience and to enjoy the sunset from the resort.
                </p>
              </div>
            </div>
          </div>

          <div className="h-full min-h-[400px] w-full bg-forest/5 relative border border-forest/10 rounded-sm overflow-hidden">
            {/* Minimal Map Embed Placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.173088683253!2d77.25562087572334!3d10.166582070144775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b077714e3dae1d9%3A0xc2c5144ee017a067!2sParadise%20Resort%20Vattavada!5e0!3m2!1sen!2sin!4v1774098616367!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(100%) opacity(0.9) contrast(1.1)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Paradise Resort Location Map"
              className="absolute inset-0"
            ></iframe>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ArrivalGuidePage;

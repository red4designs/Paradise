import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '../constants/seo';
import { MapPin, Navigation2, Compass, AlertCircle, Home, Car, VolumeX, Flame, Utensils, Clock, ShieldCheck, CreditCard, Leaf, Heart } from 'lucide-react';

const rulesData = [
  {
    category: "General Rules",
    icon: Home,
    rules: [
      "Valid ID proof is mandatory for all guests at check-in",
      "Check-in time: 12:00 PM | Check-out time: 11:00 AM",
      "Guests are requested to maintain cleanliness and take care of the property",
      "Any damage to property will be charged accordingly",
      "Outside visitors are not allowed without prior permission"
    ]
  },
  {
    category: "Parking Policy",
    icon: Car,
    rules: [
      "Parking is available on the property",
      "Parking is at the owner's risk",
      "Guests are requested to park carefully and responsibly",
      "Please ensure your vehicle does not block or damage other vehicles",
      "The management is not responsible for any damage, theft, or loss"
    ]
  },
  {
    category: "Noise & Behavior Policy",
    icon: VolumeX,
    rules: [
      "Please maintain silence after 10:00 PM",
      "Loud music and parties are not allowed after campfire timing",
      "Illegal activities and substance abuse are strictly prohibited",
      "Respect other guests and maintain a family-friendly environment"
    ]
  },
  {
    category: "Campfire & BBQ Rules",
    icon: Flame,
    rules: [
      "Campfire is available only up to 10:00 PM",
      "Follow safety instructions while using BBQ setup",
      "Guests are responsible while handling fire and grill equipment",
      "Management is not responsible for misuse of BBQ or fire"
    ]
  },
  {
    category: "Food & Kitchen Policy",
    icon: Utensils,
    rules: [
      "Food will be provided as per prior order only",
      "Outside cooking is not allowed (kitchen not available due to LPG shortage)",
      "BBQ chicken and marination must be arranged through the resort"
    ]
  },
  {
    category: "Travel & Timing",
    icon: Clock,
    rules: [
      "Vattavada checkpost entry allowed only from 6:00 AM to 6:00 PM",
      "Guests are requested to plan arrival accordingly",
      "Late check-in is subject to availability and prior confirmation"
    ]
  },
  {
    category: "Safety & Responsibility",
    icon: ShieldCheck,
    rules: [
      "Guests are responsible for their personal belongings",
      "The resort is not liable for loss, theft, or damage",
      "Parents are responsible for children at all times",
      "Follow staff instructions for safety during jeep trekking and activities"
    ]
  },
  {
    category: "Cancellation & Refund Policy",
    icon: CreditCard,
    rules: [
      "Advance booking amount is non-refundable",
      "Date change is subject to availability",
      "In case of no-show, the booking will be cancelled without refund"
    ]
  },
  {
    category: "Eco-Friendly Policy",
    icon: Leaf,
    rules: [
      "Do not litter inside or around the property",
      "Help us keep Vattavada clean and green",
      "Avoid plastic waste wherever possible"
    ]
  }
];

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

        {/* Rules & Regulations Section */}
        <section className="pt-20 border-t border-forest/10 fade-in-up">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">📜 Rules &amp; Regulations</h2>
            <p className="text-forest/80 font-light max-w-2xl mx-auto">
              To ensure a safe, peaceful, and enjoyable stay for all guests, we kindly request you to follow the below rules:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rulesData.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="bg-forest/5 p-8 hover:bg-forest/10 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon size={24} className="text-forest" strokeWidth={1.5} />
                    <h3 className="font-serif text-xl text-forest">{section.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-forest/90 font-light leading-relaxed">
                        <span className="text-forest/40 mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-forest text-sand p-8 text-center max-w-3xl mx-auto rounded-sm fade-in-up">
            <Heart size={32} className="mx-auto mb-4 text-sand/80" strokeWidth={1} />
            <h3 className="font-serif text-2xl mb-4">Our Request</h3>
            <p className="font-light leading-relaxed text-sand/90">
              We are a family-run resort, and we aim to provide a peaceful and memorable experience for every guest. Your cooperation helps us maintain the quality and comfort of our service. Thank you for choosing Paradise Resort Vattavada!
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ArrivalGuidePage;

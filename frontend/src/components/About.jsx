import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, MapPin, Users, Mountain, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { mockData } from '../data/mock';
import LazyImage from './ui/LazyImage';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Family Friendly Resort in Vattavada",
      description: "Warm hospitality with personal care, making us the perfect homestay in Vattavada for families."
    },
    {
      icon: Shield,
      title: "Safe for Families & Couples",
      description: "Secure environment with 24/7 care, perfect for families with children and romantic getaways."
    },
    {
      icon: Mountain,
      title: "Scenic Mountain Location",
      description: "Breathtaking valley views up to 5 km on clear days, surrounded by pristine nature."
    },
    {
      icon: MapPin,
      title: "Strategic Location",
      description: "Just 1.5 km from Vattavada town, 7 km from Top Station & Pampadum Shola National Park."
    },
    {
      icon: Users,
      title: "Vattavada Trekking Stay & Groups",
      description: "Perfect for Vattavada trekking stay with flexible options for couples, families, and large groups up to 60 guests."
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock assistance with hot water, WiFi, and emergency support."
    }
  ];

  return (
    <section id="about" className="section-padding bg-black">
      <div className="max-width-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">🏡 About Paradise Resort Vattavada ✨</h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Nestled in the heart of Vattavada's pristine mountains 🏔️, our family friendly resort in Vattavada offers 
            the perfect homestay in Vattavada experience. As one of the best resorts near Vattavada, we provide 
            budget stay in Vattavada with comfort, adventure, and natural beauty. 🌿
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="display-medium text-brand-primary">🏠 Your Home Away From Home</h3>
              <p className="body-medium text-text-secondary">
                Paradise Resort Vattavada is more than just accommodation - it's a gateway to unforgettable 
                mountain experiences. 🌄 Our family has been welcoming guests for years, ensuring every visitor 
                feels the warmth and safety of a true home. ❤️
              </p>
              <p className="body-medium text-text-secondary">
                Located in the stunning hill station of Vattavada, we offer easy access to Top Station 
                and Pampadum Shola National Park 🌲 while providing a peaceful retreat from the bustling world. ✨
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="display-medium text-brand-primary mb-2">7️⃣km</div>
                <p className="body-small text-text-muted">From Top Station 🏔️</p>
              </div>
              <div className="text-center">
                <div className="display-medium text-brand-primary mb-2">1️⃣.5️⃣km</div>
                <p className="body-small text-text-muted">From Vattavada Town 🏘️</p>
              </div>
              <div className="text-center">
                <div className="display-medium text-brand-primary mb-2">5️⃣km</div>
                <p className="body-small text-text-muted">Valley View Range 👁️</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="aspect-video bg-white/5 border border-white/25 rounded-sm overflow-hidden relative">
              <LazyImage 
                src="/images/Views/WhatsApp Image 2025-04-05 at 6.46.48 PM.jpeg" 
                alt="Paradise Resort Vattavada valley view - best budget resort in Vattavada Kerala" 
                className="w-full h-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute top-4 left-4 bg-brand-primary text-black px-4 py-2">
              <span className="body-small font-semibold">Best Budget Stay</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-white/25 dark-hover dark-transition">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center">
                    <feature.icon size={24} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="heading-3 mb-2">{feature.title}</h4>
                    <p className="body-small text-text-secondary">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/5 border border-white/25 p-8 max-w-4xl mx-auto">
            <h3 className="heading-2 mb-4">Experience Paradise Today</h3>
            <p className="body-medium text-text-secondary mb-8">
              Join hundreds of satisfied guests who have made Paradise Resort their preferred mountain destination. 
              Choose from our variety of accommodations to suit your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-2xl mx-auto justify-center">
              <Link 
                to="/cottages" 
                className="flex-1 sm:w-auto px-6 py-3 border border-brand-primary bg-brand-primary text-white hover:bg-brand-primary/90 hover:border-brand-primary/90 transition-colors font-medium text-center rounded-md min-w-0"
              >
                Private Cottages
              </Link>
              <Link 
                to="/tents" 
                className="flex-1 sm:w-auto px-6 py-3 border border-white/25 text-white hover:border-brand-primary hover:text-brand-primary transition-colors font-medium text-center rounded-md min-w-0"
              >
                Adventure Tents
              </Link>
              <Link 
                to="/dormitory" 
                className="flex-1 sm:w-auto px-6 py-3 border border-white/25 text-white hover:border-brand-primary hover:text-brand-primary transition-colors font-medium text-center rounded-md min-w-0"
              >
                Budget Dormitory
              </Link>
            </div>
            <a href="#contact" className="btn-primary">
              Book Your Stay Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
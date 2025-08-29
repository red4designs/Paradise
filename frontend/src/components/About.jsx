import React from 'react';
import { Shield, Heart, MapPin, Users, Mountain, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { mockData } from '../data/mock';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Family-Run Resort",
      description: "Warm hospitality with personal care and attention to every guest's comfort and safety."
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
      title: "Group Accommodations",
      description: "Flexible stay options for couples, families, and large groups up to 60 guests."
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
          <h2 className="display-large mb-6">About Paradise Resort Vattavada</h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Nestled in the heart of Vattavada's pristine mountains, our family-run resort offers 
            the perfect blend of comfort, adventure, and natural beauty. Experience the warmth 
            of home while surrounded by breathtaking landscapes.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="display-medium text-brand-primary">Your Home Away From Home</h3>
              <p className="body-medium text-text-secondary">
                Paradise Resort Vattavada is more than just accommodation - it's a gateway to unforgettable 
                mountain experiences. Our family has been welcoming guests for years, ensuring every visitor 
                feels the warmth and safety of a true home.
              </p>
              <p className="body-medium text-text-secondary">
                Located in the stunning hill station of Vattavada, we offer easy access to Top Station 
                and Pampadum Shola National Park while providing a peaceful retreat from the bustling world.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="display-medium text-brand-primary mb-2">7km</div>
                <p className="body-small text-text-muted">From Top Station</p>
              </div>
              <div className="text-center">
                <div className="display-medium text-brand-primary mb-2">1.5km</div>
                <p className="body-small text-text-muted">From Vattavada Town</p>
              </div>
              <div className="text-center">
                <div className="display-medium text-brand-primary mb-2">5km</div>
                <p className="body-small text-text-muted">Valley View Range</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="aspect-video bg-white/5 border border-white/25 rounded-sm overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1531932594968-e5e5e9dee95a?w=800&q=80" 
                alt="Paradise Resort Valley View" 
                className="w-full h-full object-cover"
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
          <div className="bg-white/5 border border-white/25 p-8 max-w-2xl mx-auto">
            <h3 className="heading-2 mb-4">Experience Paradise Today</h3>
            <p className="body-medium text-text-secondary mb-6">
              Join hundreds of satisfied guests who have made Paradise Resort their preferred mountain destination.
            </p>
            <a href="#contact" className="btn-primary">
              Plan Your Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
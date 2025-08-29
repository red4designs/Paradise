import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail,
  Mountain,
  Wifi,
  Car,
  Users,
  ChevronUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Resort', href: '#about' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Packages', href: '#packages' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' }
  ];

  const accommodations = [
    { label: '3-Bedroom Cottage', capacity: 'Up to 18 guests' },
    { label: 'Resort Stay', capacity: 'Up to 60 guests' },
    { label: 'Camping Tents', capacity: 'Up to 24 guests' }
  ];

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Mountain, label: 'Valley Views' },
    { icon: Car, label: 'Jeep Trekking' },
    { icon: Users, label: 'Group Stay' }
  ];

  return (
    <footer className="bg-black border-t border-white/25">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="max-width-container">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Resort Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="heading-2 text-brand-primary mb-4">Paradise Resort</h3>
                <p className="body-medium text-text-secondary">
                  Experience the magic of Vattavada mountains with our family-run resort offering 
                  safe, comfortable accommodations and unforgettable adventures.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-primary" />
                  <a href="tel:8296979749" className="body-medium text-text-secondary hover:text-brand-primary dark-transition">
                    +91 82969 79749
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-brand-primary" />
                  <button 
                    onClick={() => window.open('https://wa.me/918296979749', '_blank')}
                    className="body-medium text-text-secondary hover:text-brand-primary dark-transition"
                  >
                    WhatsApp Us
                  </button>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-primary mt-1" />
                  <p className="body-medium text-text-secondary">
                    Vattavada, Kerala<br />
                    1.5 km from Vattavada town
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="heading-3 text-text-primary">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="body-medium text-text-secondary hover:text-brand-primary dark-transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accommodations */}
            <div className="space-y-6">
              <h4 className="heading-3 text-text-primary">Accommodations</h4>
              <div className="space-y-4">
                {accommodations.map((acc, index) => (
                  <div key={index} className="space-y-1">
                    <h5 className="body-medium text-text-primary font-medium">{acc.label}</h5>
                    <p className="body-small text-text-muted">{acc.capacity}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <a href="#packages" className="btn-secondary inline-flex">
                  View All Packages
                </a>
              </div>
            </div>

            {/* Amenities & Features */}
            <div className="space-y-6">
              <h4 className="heading-3 text-text-primary">Key Features</h4>
              
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-primary/10 flex items-center justify-center">
                      <amenity.icon size={16} className="text-brand-primary" />
                    </div>
                    <span className="body-small text-text-secondary">{amenity.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4">
                <p className="body-small text-text-muted">
                  <strong className="text-text-secondary">Best Budget Stay</strong> in Vattavada
                </p>
                <p className="body-small text-text-muted">
                  <strong className="text-text-secondary">7 km</strong> from Top Station & Pampadum Shola
                </p>
                <p className="body-small text-text-muted">
                  <strong className="text-text-secondary">5 km</strong> valley views on clear days
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/25 my-12"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="body-medium text-text-secondary">
                &copy; 2024 Paradise Resort Vattavada. All rights reserved.
              </p>
              <p className="body-small text-text-muted">
                Family-run resort providing safe and memorable mountain experiences.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:8296979749" className="btn-primary">
                <Phone size={18} />
                Call Now
              </a>
              <button 
                onClick={() => window.open('https://wa.me/918296979749', '_blank')}
                className="btn-secondary"
              >
                <MessageCircle size={18} />
                Book via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-brand-primary hover:bg-brand-active text-black flex items-center justify-center dark-transition z-40"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>

      {/* Bottom Bar */}
      <div className="bg-white/5 border-t border-white/25 py-4">
        <div className="max-width-container px-[7.6923%]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="body-small text-text-muted text-center sm:text-left">
              Paradise Resort Vattavada - Your gateway to mountain adventures
            </p>
            
            <div className="flex items-center gap-4">
              <span className="body-small text-text-muted">Emergency Contact:</span>
              <a href="tel:8296979749" className="body-small text-brand-primary hover:underline">
                +91 82969 79749
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
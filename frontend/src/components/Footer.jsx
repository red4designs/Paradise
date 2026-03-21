import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Room Details' },
    { href: '/guide', label: 'Guide' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact Us' }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-forest text-sand pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-sand/20 pb-12 mb-8">
          
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl">Paradise Resort</h3>
            <p className="text-sand/70 max-w-xs font-light leading-relaxed text-sm">
              Discover the perfect stay offering luxury cottages, adventure tents, and family-friendly accommodations in the heart of Vattavada.
            </p>
            <div className="flex items-center space-x-4">
              <button aria-label="Visit Instagram" onClick={() => handleSocialClick('https://instagram.com/paradise_resort_vattavada')} className="w-10 h-10 border border-sand/30 rounded-full flex items-center justify-center hover:bg-sand hover:text-forest transition-colors"><Instagram size={18} strokeWidth={1.5} /></button>
              <button aria-label="Visit Facebook" onClick={() => handleSocialClick('https://www.facebook.com/paradisevattavada1')} className="w-10 h-10 border border-sand/30 rounded-full flex items-center justify-center hover:bg-sand hover:text-forest transition-colors"><Facebook size={18} strokeWidth={1.5} /></button>
              <button aria-label="Visit YouTube" onClick={() => handleSocialClick('https://www.youtube.com/watch?v=UwGLRFeFBOk')} className="w-10 h-10 border border-sand/30 rounded-full flex items-center justify-center hover:bg-sand hover:text-forest transition-colors"><Youtube size={18} strokeWidth={1.5} /></button>
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h4 className="font-serif text-xl mb-6">Explore</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} onClick={scrollToTop} className="text-sand/70 hover:text-sand text-sm transition-colors uppercase tracking-widest">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-sand/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" />
                <span>Vattavada, Kerala<br />1.5 km from Vattavada town</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} strokeWidth={1.5} className="shrink-0" />
                <a href="tel:9074902424" className="hover:text-sand">+91 90749 02424</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.5} className="shrink-0" />
                <a href="mailto:info@paradisevattavada.com" className="hover:text-sand">info@paradisevattavada.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Trust Section */}
        <div className="border-b border-sand/20 pb-12 mb-8">
          <h4 className="font-serif text-2xl mb-8 text-center text-sand">Trusted Hospitality</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-mist p-10 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
              <div className="flex text-forest text-sm mb-5 tracking-widest">★★★★★</div>
              <p className="font-sans text-forest/90 font-light leading-relaxed text-lg mb-6">
                "The homemade food was tasty and good quality. Homely and relaxing accommodation."
              </p>
              <div className="text-xs font-serif font-bold text-forest tracking-wide uppercase mt-auto">
                Manju Kunjumon
              </div>
            </div>

            <div className="bg-mist p-10 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
              <div className="flex text-forest text-sm mb-5 tracking-widest">★★★★★</div>
              <p className="font-sans text-forest/90 font-light leading-relaxed text-lg mb-6">
                "The Staff are very friendly and they look like our parents."
              </p>
              <div className="text-xs font-serif font-bold text-forest tracking-wide uppercase mt-auto">
                Ramadas C N
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-sand/70 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Paradise Resort Vattavada. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#amenities', label: 'Amenities' },
    { href: '#packages', label: 'Packages' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/919074902424', '_blank');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black border-b border-white/25 px-[7.6923%] py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="heading-2 text-brand-primary">Paradise Resort</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="body-medium text-text-muted hover:text-text-primary dark-transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:9074902424" className="btn-secondary">
            <Phone size={18} />
            Call Now
          </a>
          <button onClick={handleWhatsApp} className="btn-primary">
            <MessageCircle size={18} />
            WhatsApp
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black border-b border-white/25 px-[7.6923%] py-6">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="body-medium text-text-muted hover:text-text-primary dark-transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex flex-col gap-3">
            <a href="tel:8296979749" className="btn-secondary">
              <Phone size={18} />
              Call Now
            </a>
            <button onClick={handleWhatsApp} className="btn-primary">
              <MessageCircle size={18} />
              WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
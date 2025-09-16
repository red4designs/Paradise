import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Instagram, Facebook, ExternalLink, Youtube, Twitter, Linkedin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cottages', label: 'Cottages' },
    { href: '/tents', label: 'Tents' },
    { href: '/dormitory', label: 'Dormitory' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' }
  ];

  const location = useLocation();

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I would like to check availability at Paradise Resort Vattavada.');
    window.open(`https://wa.me/919074902424?text=${message}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/paradise_resort_vattavada', '_blank');
  };

  const handleFacebook = () => {
    window.open('https://www.facebook.com/paradisevattavada1', '_blank');
  };

  const handleYoutube = () => {
    window.open('https://www.youtube.com/watch?v=UwGLRFeFBOk', '_blank');
  };

  const handleTwitter = () => {
    window.open('https://twitter.com/vattavadaresort', '_blank');
  };

  const handleLinkedin = () => {
    window.open('https://www.linkedin.com/in/paradiseresort/', '_blank');
  };

  const handleAgodaBooking = () => {
    window.open('https://www.agoda.com/paradise-resort-vattavada/hotel/vattavada-in.html', '_blank');
  };

  const handleBookingComBooking = () => {
    window.open('https://www.booking.com/hotel/in/vattavada-paradise-stay.html', '_blank');
  };

  const handleNavClick = (href) => {
    // Scroll to top for all pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-border px-[7.6923%] py-4 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/paradise-logo.svg" 
              alt="Paradise Resort Vattavada Logo" 
              className="h-16 w-auto"
              width="64"
              height="64"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`body-medium theme-transition ${
                  location.pathname === link.href
                    ? 'text-[hsl(var(--foreground))] font-semibold'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Contact Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleInstagram}
              className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={20} />
            </button>
            <button 
              onClick={handleFacebook}
              className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={20} />
            </button>
            <button 
              onClick={handleYoutube}
              className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              aria-label="Subscribe to our YouTube channel"
            >
              <Youtube size={20} />
            </button>
            <button 
              onClick={handleTwitter}
              className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter size={20} />
            </button>
            <button 
              onClick={handleLinkedin}
              className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              aria-label="Connect with us on LinkedIn"
            >
              <Linkedin size={20} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleAgodaBooking} className="btn-primary" aria-label="Book accommodation on Agoda">
              <ExternalLink size={18} />
              Book in Agoda
            </button>
            <button onClick={handleBookingComBooking} className="btn-primary" aria-label="Book accommodation on Booking.com">
              <ExternalLink size={18} />
              Book on Booking.com
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-inset"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[hsl(var(--background))] border-b border-[hsl(var(--border))] px-[7.6923%] py-6">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNavClick(link.href);
                  }}
                  className={`body-medium theme-transition ${
                    location.pathname === link.href
                      ? 'text-[hsl(var(--foreground))] font-semibold'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex flex-col gap-3">
            {/* Social Media Links */}
            <div className="flex items-center gap-3 justify-center mb-3 flex-wrap">
              <button 
                onClick={handleInstagram}
                className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} />
              </button>
              <button 
                onClick={handleFacebook}
                className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={24} />
              </button>
              <button 
                onClick={handleYoutube}
                className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={24} />
              </button>
              <button 
                onClick={handleTwitter}
                className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter size={24} />
              </button>
              <button 
                onClick={handleLinkedin}
                className="p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={24} />
              </button>
            </div>
            <button onClick={handleAgodaBooking} className="btn-primary" aria-label="Book accommodation on Agoda">
              <ExternalLink size={18} />
              Book in Agoda
            </button>
            <button onClick={handleBookingComBooking} className="btn-primary" aria-label="Book accommodation on Booking.com">
              <ExternalLink size={18} />
              Book on Booking.com
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
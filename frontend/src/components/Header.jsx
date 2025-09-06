import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Instagram, Facebook, ExternalLink } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cottages', label: 'Cottages' },
    { href: '/tents', label: 'Tents' },
    { href: '/dormitory', label: 'Dormitory' },
    { href: '#gallery', label: 'Gallery', isSection: true },
    { href: '#faq', label: 'FAQ', isSection: true },
    { href: '/contact', label: 'Contact' }
  ];

  const location = useLocation();

  // Handle hash navigation on page load or location change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && location.pathname === '/') {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const sectionId = hash.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

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

  const handleAgodaBooking = () => {
    window.open('https://www.agoda.com/paradise-resort-vattavada/hotel/vattavada-in.html', '_blank');
  };

  const handleNavClick = (href, isSection = false) => {
    if (isSection) {
      // Handle section scrolling - only works on homepage
      if (location.pathname !== '/') {
        // Navigate to homepage first, then scroll to section
        window.location.href = `/${href}`;
        return;
      }
      
      const sectionId = href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Scroll to top for specific pages
      if (href === '/' || href === '/cottages' || href === '/tents' || href === '/dormitory') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
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
            if (link.isSection) {
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, true)}
                  className="body-medium theme-transition text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                >
                  {link.label}
                </button>
              );
            }
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
          </div>
          <button onClick={handleAgodaBooking} className="btn-primary">
            <ExternalLink size={18} />
            Book in Agoda
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-[hsl(var(--background))] border-b border-[hsl(var(--border))] px-[7.6923%] py-6">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => {
              if (link.isSection) {
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleNavClick(link.href, true);
                    }}
                    className="body-medium theme-transition text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] text-left"
                  >
                    {link.label}
                  </button>
                );
              }
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
            <div className="flex items-center gap-4 justify-center mb-3">
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
            </div>
            <button onClick={handleAgodaBooking} className="btn-primary">
              <ExternalLink size={18} />
              Book in Agoda
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
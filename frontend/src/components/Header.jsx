import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Room Details' },
    { href: '/guide', label: 'Guide' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact Us' }
  ];

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleAgodaBooking = () => {
    window.open('https://www.agoda.com/paradise-resort-vattavada/hotel/vattavada-in.html', '_blank');
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-sand/95 backdrop-blur-md shadow-sm py-4' : 'bg-sand/50 backdrop-blur-sm py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo area */}
        <Link to="/" onClick={handleNavClick} className="flex items-center group">
           <img src="/paradise-logo.svg" alt="Paradise Resort Vattavada Logo" className="h-12 w-auto transition-transform duration-500 group-hover:scale-105" />
           <span className="ml-3 font-serif text-2xl text-forest hidden md:block">Paradise Resort</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={handleNavClick}
              className={`text-sm uppercase tracking-widest transition-colors pb-1 border-b ${
                location.pathname === link.href 
                  ? 'border-forest text-forest font-medium' 
                  : 'border-transparent text-forest/70 hover:text-forest hover:border-forest/30'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-3 text-forest/70">
            <button onClick={() => handleSocialClick('https://instagram.com/paradise_resort_vattavada')} className="hover:text-forest transition-colors"><Instagram size={18} strokeWidth={1.5} /></button>
            <button onClick={() => handleSocialClick('https://www.facebook.com/paradisevattavada1')} className="hover:text-forest transition-colors"><Facebook size={18} strokeWidth={1.5} /></button>
            <button onClick={() => handleSocialClick('https://www.youtube.com/watch?v=UwGLRFeFBOk')} className="hover:text-forest transition-colors"><Youtube size={18} strokeWidth={1.5} /></button>
          </div>
          <button 
            onClick={handleAgodaBooking} 
            className="flex items-center gap-2 px-5 py-2.5 bg-forest text-sand text-xs uppercase tracking-widest font-medium hover:bg-forest/90 transition-colors shadow-sm"
          >
            <ExternalLink size={14} /> Book on Agoda
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-forest p-2 focus:outline-none"
        >
          {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>
    </header>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 top-[72px] bg-sand z-40 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
          <nav className="flex flex-col space-y-6 mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={handleNavClick}
                className={`font-serif text-2xl ${location.pathname === link.href ? 'text-forest' : 'text-forest/70'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="border-t border-forest/10 pt-8 flex flex-col items-center space-y-8">
            <button 
              onClick={handleAgodaBooking} 
              className="w-full max-w-xs flex justify-center items-center gap-2 px-5 py-3 bg-forest text-sand text-sm uppercase tracking-widest font-medium"
            >
              <ExternalLink size={16} /> Book on Agoda
            </button>
            
            <div className="flex items-center justify-center space-x-6 text-forest">
              <button onClick={() => handleSocialClick('https://instagram.com/paradise_resort_vattavada')}><Instagram size={24} strokeWidth={1.5} /></button>
              <button onClick={() => handleSocialClick('https://www.facebook.com/paradisevattavada1')}><Facebook size={24} strokeWidth={1.5} /></button>
              <button onClick={() => handleSocialClick('https://www.youtube.com/watch?v=UwGLRFeFBOk')}><Youtube size={24} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
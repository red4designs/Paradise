import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '../constants/seo';
import { ArrowRight, ChevronRight, Tent, Home, Users, Mountain, Compass, BedDouble, Bed, Flame, Map, CarFront } from 'lucide-react';
import YouTubeFacade from '../components/facades/YouTubeFacade';

const HomePage = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
    accommodation: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const message = `Hi! I would like to inquire about booking:
Check-in: ${bookingData.checkIn || 'Not specified'}
Check-out: ${bookingData.checkOut || 'Not specified'}
Guests: ${bookingData.guests || 'Not specified'}
Accommodation: ${bookingData.accommodation || 'Not specified'}

Please check availability and let me know.`;

    window.open(`https://wa.me/919074902424?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-sand min-h-screen">
      <Helmet>
        <title>Best Stay in Vattavada - Paradise Resort | Cottages & Tents</title>
        <meta name="description" content="Experience the best stay in Vattavada at Paradise Resort. Premium luxury cottages, adventure tents, dormitory stays, and stunning mountain views near Munnar." />
        <link rel="canonical" href={BASE_URL} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Views/IMG_1701_optimized.webp"
            alt="Paradise Resort Views"
            width="1920"
            height="1080"
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white drop-shadow-xl fade-in-up">
              <span className="uppercase tracking-[0.2em] text-sm font-bold mb-4 block drop-shadow-md">Vattavada, Kerala</span>
              <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6 drop-shadow-lg text-white">
                A Minimalist Escape to Nature
              </h1>
              <p className="text-lg font-medium max-w-md drop-shadow-md text-white/95">
                Experience the best budget stay featuring private cottages, adventure tents, and curated sightseeing in the heart of the mountains.
              </p>
            </div>

            {/* WhatsApp Booking Inquiry Box */}
            <div className="lg:justify-self-end w-full max-w-md fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-sand p-8 shadow-xl">
                <h2 className="font-serif text-2xl text-forest mb-6">Booking Enquiry</h2>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-forest/80 font-medium">Check-in</label>
                      <input
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                        className="w-full bg-transparent border-b border-forest/20 py-2 text-forest focus:outline-none focus:border-forest"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-forest/80 font-medium">Check-out</label>
                      <input
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                        className="w-full bg-transparent border-b border-forest/20 py-2 text-forest focus:outline-none focus:border-forest"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-forest/80 font-medium">Accommodation Type</label>
                    <select
                      value={bookingData.accommodation}
                      onChange={(e) => setBookingData({ ...bookingData, accommodation: e.target.value })}
                      className="w-full bg-transparent border-b border-forest/20 py-2 text-forest focus:outline-none focus:border-forest"
                    >
                      <option value="">Select option...</option>
                      <option value="Deluxe Room">Deluxe Room - Spacious room, max 7 pax capacity</option>
                      <option value="Double Room">Double room - 2pax capacity</option>
                      <option value="Dormitory">Dormitory - 16 pax capacity bunk bed</option>
                      <option value="Tent Stay">Tent Stay - 2pax</option>
                      <option value="Private Cottage">Private Cottage - upto 15pax private property</option>
                      <option value="Resort Full Property">Resort Full Property - 50 to 60 pax</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-forest/80 font-medium">Total number of Guest including kids</label>
                    <input
                      type="number"
                      min="1"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                      className="w-full bg-transparent border-b border-forest/20 py-2 text-forest focus:outline-none focus:border-forest"
                      placeholder="Number of guests"
                    />
                  </div>
                  <button type="submit" className="w-full bg-forest text-sand py-4 text-xs uppercase tracking-widest font-medium hover:bg-forest/90 transition-colors mt-6 flex justify-center items-center gap-2">
                    Inquire via WhatsApp
                    <ChevronRight size={16} />
                  </button>

                  <div className="text-center mt-3">
                    <span className="text-xs uppercase tracking-widest text-forest/80 font-medium block mb-1">Or reach us directly at:</span>
                    <a href="https://wa.me/919074902424" className="text-lg font-bold text-forest hover:underline">WhatsApp: 9074902424</a>
                  </div>

                  {/* Trust Badge */}
                  <div className="pt-4 mt-4 border-t border-forest/10 flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center gap-1 text-forest">
                      <span className="text-xl">★</span><span className="text-xl">★</span><span className="text-xl">★</span><span className="text-xl">★</span><span className="text-xl">★</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-forest/80 font-medium">4.2/5 from 200+ Google Genuine Reviews</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Short Information Section: Accommodations & Activities */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto fade-in-up">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">Our Offerings</h2>
          <p className="text-forest/80 font-light leading-relaxed">
            We provide diverse accommodations and curated adventures to connect you with the untamed beauty of Vattavada.
          </p>
        </div>

        {/* 🛏️ Our Stays Bento Grid */}
        <div className="mb-16 fade-in-up">
          <div className="flex flex-col items-center md:items-start mb-8">
            <h3 className="font-serif text-3xl md:text-4xl text-forest flex items-center gap-3">
              <span className="text-2xl md:text-3xl">🛏️</span> Our Stays
            </h3>
            <p className="text-forest/80 font-light mt-2">Tailored comfort for every traveler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Private Cottage */}
            <div className="md:col-span-2 xl:col-span-2 group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden min-h-[300px]">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img src="/images/Cottages/WhatsApp%20Image%202026-03-22%20at%208.57.30%20AM.webp" alt="Private Cottage" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <Home size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <h4 className="font-serif text-3xl text-forest">Private Cottage</h4>
                  <span className="font-sans text-sm font-light text-forest/80">Up to 15 Pax</span>
                </div>
                <p className="text-forest/90 font-light leading-relaxed mb-6">
                  Your own 3-BHK sanctuary. A secluded, private property that comfortably hosts up to 15 guests.
                </p>
                <button onClick={() => navigate('/rooms#cottage')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Deluxe Room */}
            <div className="group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/Deluxe Room/IMG_1831.webp" alt="Deluxe Room" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <Bed size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <h4 className="font-serif text-2xl text-forest">Deluxe Room</h4>
                  <span className="font-sans text-sm font-light text-forest/80">7 Pax</span>
                </div>
                <p className="text-forest/90 font-light leading-relaxed text-sm mb-6">
                  Expansive and versatile. A spacious retreat designed for groups, accommodating up to 7 guests with ease.
                </p>
                <button onClick={() => navigate('/rooms#deluxe')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Double Room */}
            <div className="group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/Double room/IMG_20241011_150853.webp" alt="Double Room" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <BedDouble size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <h4 className="font-serif text-2xl text-forest">Double Room</h4>
                  <span className="font-sans text-sm font-light text-forest/80">2 Pax</span>
                </div>
                <p className="text-forest/90 font-light leading-relaxed text-sm mb-6">
                  Intimate and serene. The perfect mountain escape for 2 guests.
                </p>
                <button onClick={() => navigate('/rooms#double')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>

            {/* The Dormitory */}
            <div className="group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/Dormitory/DJI_20231022_090731_99.webp" alt="The Dormitory" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <Users size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <h4 className="font-serif text-2xl text-forest">The Dormitory</h4>
                  <span className="font-sans text-sm font-light text-forest/80">16 Pax</span>
                </div>
                <p className="text-forest/90 font-light leading-relaxed text-sm mb-6">
                  Community-focused comfort. Features bunk beds with a total capacity for 16 guests—ideal for trekking groups.
                </p>
                <button onClick={() => navigate('/rooms#dormitory')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Tent Stay */}
            <div className="group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/Tents/tent-new-1.webp" alt="Tent Stay" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <Tent size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <h4 className="font-serif text-2xl text-forest">Tent Stay</h4>
                  <span className="font-sans text-sm font-light text-forest/80">2 Pax</span>
                </div>
                <p className="text-forest/90 font-light leading-relaxed text-sm mb-6">
                  Fall asleep to the mountain breeze. We offer 8 private tents, each perfectly sized for 2 guests.
                </p>
                <button onClick={() => navigate('/faq#sightseeing')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Resort Full Property */}
            <div className="md:col-span-2 xl:col-span-2 group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden min-h-[300px]">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img src="/images/Views/WhatsApp Image 2025-04-05 at 6.46.48 PM.webp" alt="Resort Full Property" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <Home size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
                  <h4 className="font-serif text-3xl text-forest">Resort Full Property</h4>
                  <span className="font-sans text-sm font-light text-forest/80">50-60 Pax &nbsp;&bull;&nbsp; ₹30k</span>
                </div>
                <p className="text-forest/90 font-light leading-relaxed mb-6">
                  Exclusive access to the entire resort wrapped in stunning panoramic resort views. Includes 5 deluxe rooms, 3 double rooms, and a 16-person dormitory.
                </p>
                <button onClick={() => navigate('/rooms#full-property')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 🌲 The Experience Bento Grid */}
        <div className="mb-20 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col items-center md:items-start mb-8">
            <h3 className="font-serif text-3xl md:text-4xl text-forest flex items-center gap-3">
              <span className="text-2xl md:text-3xl">🌲</span> The Experience
            </h3>
            <p className="text-forest/80 font-light mt-2">Beyond the four walls.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Jeep Trekking */}
            <div className="group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/Activities/Jeep-Trekking.jpg.jpeg" alt="Jeep Trekking" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <CarFront size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h4 className="font-serif text-2xl text-forest mb-3 mt-2">Jeep Trekking</h4>
                <p className="text-forest/90 font-light leading-relaxed text-sm mb-6">
                  A rugged 28km off-road journey. Experience 3+ hours of breathtaking trails and hidden viewpoints.
                </p>
                <button onClick={() => navigate('/faq#jeep-trekking')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Guided Sightseeing */}
            <div className="group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/Views/IMG_1701_optimized.webp" alt="Guided Sightseeing" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <Map size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h4 className="font-serif text-2xl text-forest mb-3 mt-2">Guided Sightseeing</h4>
                <p className="text-forest/90 font-light leading-relaxed text-sm mb-6">
                  Slow down and explore. Immerse yourself in the local landscape with curated walking tours of the valley.
                </p>
                <button onClick={() => navigate('/faq#jeep-trekking')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Campfire & BBQ */}
            <div className="group bg-mist border border-forest/10 flex flex-col hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/Activities/campfire.jpeg" alt="Campfire & BBQ" width="800" height="600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-mist/90 backdrop-blur-sm flex items-center justify-center rounded-full shadow-sm">
                  <Flame size={18} strokeWidth={1.5} className="text-forest" />
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h4 className="font-serif text-2xl text-forest mb-3 mt-2">Campfire & BBQ</h4>
                <p className="text-forest/90 font-light leading-relaxed text-sm mb-6">
                  Warmth and flavor. Gather round for an evening of fresh grilling under the Vattavada stars.
                </p>
                <button onClick={() => navigate('/faq#campfire')} className="mt-auto inline-flex items-center text-xs uppercase tracking-widest font-bold text-forest hover:text-forest/70 transition-colors w-max pb-1 border-b border-forest/30">
                  More Details <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* What our guests say (Reviews Bento Block) */}
        <div className="fade-in-up flex flex-col" style={{ animationDelay: '0.4s' }}>
          <div className="mb-10 text-center md:text-left">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-forest/80 block mb-2">Guest Love</span>
            <h3 className="font-serif text-4xl text-forest">Verified Experiences</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 flex-1">
            {/* Nidhun P - Wide Block */}
            <div className="md:col-span-2 bg-mist p-12 md:p-16 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
              <div className="flex text-forest text-xl mb-8 tracking-widest">★★★★★</div>
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-forest leading-snug mb-10">
                "A slice of paradise nestled in the hills. Misty mornings, lush greenery, and total serenity."
              </p>
              <div className="text-sm font-serif font-bold text-forest tracking-wide uppercase mt-auto">
                Nidhun P
              </div>
            </div>

            {/* Jagan Krishna - Smaller Block */}
            <div className="bg-mist p-10 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
              <div className="flex text-forest text-base mb-6 tracking-widest">★★★★★</div>
              <p className="font-sans text-forest/90 font-light leading-relaxed text-lg mb-8">
                "A serene retreat... ideal choice for relaxation and adventure."
              </p>
              <div className="text-sm font-serif font-bold text-forest tracking-wide uppercase mt-auto">
                Jagan Krishna
              </div>
            </div>

            {/* YouTube Testimonial Embed */}
            <div className="md:col-span-3 bg-mist/50 p-2 sm:p-4 mt-2 transition-transform hover:-translate-y-1 duration-300 rounded-sm">
              <YouTubeFacade 
                videoId="UwGLRFeFBOk" 
                title="Paradise Resort Vattavada Guest Experience"
                className="w-full h-full border border-forest/10 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
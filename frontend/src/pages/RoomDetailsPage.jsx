import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '../constants/seo';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import generatedGallery from '../data/generated-gallery.json';

const getGalleryImages = (category, fallback) => {
  const images = generatedGallery.filter(item => item.category === category).map(item => item.image);
  return images.length > 0 ? images : fallback;
};

const rooms = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    description: 'A premium space designed for utmost comfort. Features an en-suite bathroom, modern amenities, a plush king-sized bed, and large windows that frame the mist-covered mountains of Vattavada.',
    features: ['King Bed', 'En-suite Bathroom', 'Mountain View', 'In-room Dining'],
    review: { text: "Waking up to the misty mountains from this room was an absolute dream. Clean, spacious, and perfect.", author: "David L." },
    images: getGalleryImages('Deluxe Room', [
      '/images/Deluxe Room/IMG_1831.webp',
      '/images/Deluxe Room/IMG_1834.webp',
      '/images/Deluxe Room/IMG_1846.webp'
    ])
  },
  {
    id: 'double',
    name: 'Double Room',
    description: 'Perfect for couples or close friends. Clean, minimalist design featuring natural wood tones, a comfortable double bed, and all the essential amenities for a serene mountain stay.',
    features: ['Double Bed', 'Attached Bath', 'Wood Aesthetics', '24/7 Hot Water'],
    review: { text: "Spacious rooms and neat bathroom. Feel like staying at home.", author: "Freddyjohn987", verifiedComfort: true },
    images: getGalleryImages('Double Room', [
      '/images/Double room/IMG_20241011_150853.webp',
      '/images/Double room/IMG_20241011_150912.webp',
      '/images/Double room/IMG_4674.webp'
    ])
  },
  {
    id: 'cottage',
    name: 'Private Cottage',
    description: 'An exclusive, standalone cottage offering complete privacy. Includes a private living area, attached modern bathrooms, and an outdoor sit-out to enjoy the evening breeze and campfire.',
    features: ['Private Sit-out', 'Living Area', 'Complete Privacy', 'Family Friendly'],
    review: { text: "The private cottage was spotless and offered such a peaceful sleep. Unmatched hospitality.", author: "Sarah K." },
    images: getGalleryImages('Cottages', [
      '/images/Cottages/WhatsApp%20Image%202026-03-22%20at%208.57.30%20AM.webp',
      '/images/Cottages/IMG_20241109_151624.webp',
      '/images/Cottages/WhatsApp Image 2025-06-18 at 3.43.19 PM.webp'
    ])
  },
  {
    id: 'tent',
    name: 'Adventure Tent',
    description: 'Immerse yourself in nature. Our premium heavy-duty tents come equipped with thick, comfortable mattresses and blankets, positioned perfectly to watch the stars and enjoy the campfire.',
    features: ['Heavy-Duty Tent', 'Thick Mattress', 'Campfire Access', 'Star Gazing'],
    review: { text: "Absolutely breathtaking view from the dome tent. The mist rolling over the hills in the morning was surreal.", author: "Rahul M." },
    images: getGalleryImages('Tents', [
      '/images/Tents/tent-new-1.webp',
      '/images/Tents/tent-new-3.webp',
      '/images/Tents/tent-new-5.webp'
    ])
  },
  {
    id: 'dormitory',
    name: 'Dormitory',
    description: 'The ultimate space for large groups and backpackers. Clean, spacious, and budget-friendly, featuring individual comfortable beds, shared clean washrooms, and plenty of room to socialize.',
    features: ['Large Group Capacity', 'Budget Friendly', 'Clean Shared Baths', 'Locker Space'],
    review: { text: "A peaceful, affordable place to stay. Rooms were very spacious and clean.", author: "Gopikrishna R", verifiedComfort: true },
    images: getGalleryImages('Dormitory', [
      '/images/Dormitory/DJI_20231022_090731_99.webp',
      '/images/Dormitory/DJI_20231022_090731_99.webp',
      '/images/Dormitory/DJI_20231022_090731_99.webp'
    ])
  },
  {
    id: 'full-property',
    name: 'Resort Full Property',
    description: 'Experience Paradise Resort exclusively for your large group or event. Enjoy unrestricted access to our entire facility overlooking stunning mountain views.',
    features: ['5 Deluxe Rooms', '3 Double Rooms', '16-Person Dorm', '50-60 Pax Capacity', 'Around ₹30,000/night'],
    review: { text: "Booking the entire property for our family reunion was incredible. Absolute privacy and incredible views!", author: "Thomas George", verifiedComfort: true },
    images: getGalleryImages('Views', [
      '/images/Views/WhatsApp Image 2025-04-05 at 6.46.48 PM.webp',
      '/images/Views/IMG_20241109_174235.webp',
      '/images/Views/IMG_1701.webp'
    ])
  }
];

const RoomDetailsPage = () => {
  const [galleryState, setGalleryState] = useState({ isOpen: false, images: [], currentIndex: 0 });
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const openGallery = (images, index = 0) => {
    setGalleryState({ isOpen: true, images, currentIndex: index });
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeGallery = () => {
    setGalleryState({ ...galleryState, isOpen: false });
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setGalleryState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1
    }));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setGalleryState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
    }));
  };

  return (
    <div className="bg-sand min-h-screen pt-24 pb-32">
      <Helmet>
        <title>Best Rooms & Cottages in Vattavada - Paradise Resort</title>
        <meta name="description" content="Explore our premium Vattavada accommodations. We offer Private Cottages, Adventure Tents, Deluxe Rooms, and Dormitories for the best stay in Vattavada." />
        <link rel="canonical" href={`${BASE_URL}/rooms`} />
      </Helmet>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 fade-in-up">
        <span className="uppercase tracking-[0.2em] text-xs font-medium text-forest/80 block mb-4">Accommodations</span>
        <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">Stay in <span className="italic font-light">Nature</span></h1>
        <p className="text-lg text-forest/90 font-light max-w-2xl mx-auto">
          From premium deluxe rooms and private cottages to immersive adventure tents, discover the perfect space to anchor your Vattavada experience.
        </p>
      </div>

      {/* Room Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {rooms.map((room, index) => (
          <div key={room.id} id={room.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center fade-in-up scroll-mt-32`}>
            
            {/* Image Preview (Clickable to Gallery) */}
            <div className="w-full lg:w-1/2 relative group cursor-pointer" onClick={() => openGallery(room.images)}>
              <div className="aspect-[4/3] overflow-hidden rounded-sm">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  width="800"
                  height="600"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-forest/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Gallery Overlay Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-forest/80 text-sand p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                <Maximize2 size={24} />
              </div>
              <div className="absolute bottom-4 right-4 bg-sand text-forest text-xs font-medium px-3 py-1 uppercase tracking-widest shadow-sm">
                View Gallery ({room.images.length})
              </div>
            </div>

            {/* Description */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="font-serif text-3xl text-forest">{room.name}</h2>
              <p className="text-forest/90 font-light leading-relaxed">{room.description}</p>
              
              <ul className="space-y-2 pt-4 border-t border-forest/10">
                {room.features.map(feature => (
                  <li key={feature} className="flex items-center text-sm text-forest uppercase tracking-widest font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest/30 mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {room.review && (
                <div className="bg-mist p-8 mt-8 transition-transform hover:-translate-y-1 duration-300">
                  {room.review.verifiedComfort && (
                    <div className="inline-flex items-center gap-1.5 bg-forest/5 text-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 mb-5 rounded-sm">
                      <span className="text-[10px]">✓</span> Verified Comfort
                    </div>
                  )}
                  <div className="flex text-forest text-sm mb-5 tracking-widest">★★★★★</div>
                  <p className="text-forest/90 font-sans font-light text-base leading-relaxed mb-6">
                    "{room.review.text}"
                  </p>
                  <div className="text-xs font-serif font-bold text-forest tracking-wide uppercase">
                    {room.review.author}
                  </div>
                </div>
              )}
              
              <div className="pt-6">
                <a href={`https://wa.me/919074902424?text=${encodeURIComponent(`Hi, I am interested in booking the ${room.name}.`)}`} target="_blank" rel="noreferrer" className="inline-block border border-forest text-forest hover:bg-forest hover:text-sand transition-colors px-6 py-3 text-xs uppercase tracking-widest font-medium">
                  Check Availability
                </a>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery Modal */}
      {galleryState.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md" onClick={closeGallery}>
          <button aria-label="Close Gallery" onClick={closeGallery} className="absolute top-6 right-6 text-white/80 hover:text-white z-50 transition-colors">
            <X size={32} strokeWidth={1} />
          </button>
          
          <button aria-label="Previous Image" onClick={prevImage} className="absolute left-4 lg:left-8 text-white/80 hover:text-white z-50 p-2 transition-colors">
            <ChevronLeft size={48} strokeWidth={1} />
          </button>

          <img 
            src={galleryState.images[galleryState.currentIndex]} 
            alt="Gallery view" 
            width="1200"
            height="800"
            className="max-h-[85vh] max-w-full object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          <button aria-label="Next Image" onClick={nextImage} className="absolute right-4 lg:right-8 text-white/80 hover:text-white z-50 p-2 transition-colors">
            <ChevronRight size={48} strokeWidth={1} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-widest font-light">
            {galleryState.currentIndex + 1} / {galleryState.images.length}
          </div>
        </div>
      )}

    </div>
  );
};

export default RoomDetailsPage;

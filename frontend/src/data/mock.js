import generatedGallery from './generated-gallery.json';

// Mock data for Paradise Resort Vattavada
export const mockData = {
  resort: {
    name: "Paradise Resort Vattavada",
    tagline: "Best Budget Stay in Vattavada",
    description: "Experience the breathtaking beauty of Vattavada's mountains with our family-run resort offering safe, comfortable accommodations for families and couples.",
    location: "Just 1.5 km from Vattavada town, 7 km from Top Station & Pampadum Shola National Park",
    phone: "9074902424",
    whatsapp: "9074902424"
  },

  amenities: [
    { id: 1, name: "📶 Free WiFi", icon: "Wifi", description: "High-speed internet connectivity" },
    { id: 2, name: "🚿 Hot Water", icon: "Droplets", description: "24/7 hot water supply" },
    { id: 3, name: "🏠 Private Cottages", icon: "Home", description: "Spacious private accommodations" },
    { id: 4, name: "⛺ Camping Tents", icon: "Mountain", description: "Adventure camping experience" },
    { id: 5, name: "🔥 Campfire & Music", icon: "Music", description: "Evening entertainment with campfire" },
    { id: 6, name: "🍖 BBQ Set with Coal", icon: "ChefHat", description: "Outdoor cooking facilities" },
    { id: 7, name: "🚗 Jeep Trekking", icon: "Car", description: "Guided adventure trips" },
    { id: 8, name: "👁️ Scenic Views", icon: "Eye", description: "5 km valley views on clear days" }
  ],

  packages: [
    {
      id: 1,
      name: "🏡 3-Bedroom Private Cottage",
      capacity: "Up to 1️⃣8️⃣ adults",
      features: ["🚿 Shared bathroom", "🍳 Kitchen facilities", "🌄 Mountain view", "👨‍👩‍👧‍👦 Family-friendly"],
      price: "💬 Contact for pricing",
      image: "/images/Cottages/IMG_20250208_122711.webp?v=" + Date.now()
    },
    {
      id: 2,
      name: "🏨 Resort Stay Package",
      capacity: "Up to 6️⃣0️⃣ guests",
      features: ["🛏️ Deluxe rooms", "🏠 Dormitory options", "💑 Double rooms", "👥 Group facilities"],
      price: "💬 Contact for pricing",
      image: "/images/Views/IMG_1701_optimized.webp"
    },
    {
      id: 3,
      name: "⛺ Camping Experience",
      capacity: "8️⃣ tents for up to 2️⃣4️⃣ guests",
      features: ["🏕️ Adventure tents", "🔥 Campfire access", "🥾 Trekking included", "🌲 Nature experience"],
      price: "💬 Contact for pricing",
      image: "/images/Tents/tent-new-1.jpg"
    }
  ],

  gallery: generatedGallery,

  testimonials: [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      location: "Bangalore, Karnataka",
      profession: "Medical Professional",
      rating: 5,
      date: "December 2024",
      verified: true,
      stayDuration: "3 nights",
      accommodationType: "Private Cottage",
      comment: "As a medical professional who values cleanliness and safety, I was thoroughly impressed with Paradise Resort. The 3-bedroom cottage was impeccably maintained, spacious enough for our family of 12, and offered stunning valley views. The hosts demonstrated exceptional hospitality and local knowledge. Highly recommended for families seeking a safe, comfortable mountain retreat."
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Chennai, Tamil Nadu",
      profession: "Travel Blogger",
      rating: 5,
      date: "November 2024",
      verified: true,
      stayDuration: "2 nights",
      accommodationType: "Deluxe Room",
      comment: "Having reviewed over 200 resorts across South India, Paradise Resort Vattavada stands out for its authentic mountain experience and exceptional value. The campfire evening with local cultural insights was magical. The resort's commitment to sustainable tourism and supporting the local community is commendable. Perfect blend of adventure and comfort."
    },
    {
      id: 3,
      name: "David Wilson",
      location: "Kochi, Kerala",
      profession: "Adventure Tour Guide",
      rating: 5,
      date: "October 2024",
      verified: true,
      stayDuration: "4 nights",
      accommodationType: "Tent Stay",
      comment: "As a professional adventure guide with 15+ years experience, I can confidently say Paradise Resort offers one of the best trekking base camps in the Western Ghats. The jeep trekking to Top Station was expertly guided, and the tent accommodations exceeded expectations. The resort's location provides easy access to Pambadum Shola National Park and multiple trekking trails."
    },
    {
      id: 4,
      name: "Mrs. Lakshmi Menon",
      location: "Trivandrum, Kerala",
      profession: "Retired Teacher",
      rating: 5,
      date: "January 2025",
      verified: true,
      stayDuration: "5 nights",
      accommodationType: "Dormitory",
      comment: "At 68, I was initially hesitant about mountain travel, but the Paradise Resort team made everything comfortable and accessible. The dormitory was clean, well-ventilated, and the staff's attention to elderly guests was remarkable. The peaceful environment and fresh mountain air were exactly what I needed for my wellness retreat."
    },
    {
      id: 5,
      name: "Arjun Patel",
      location: "Mumbai, Maharashtra",
      profession: "Corporate Executive",
      rating: 5,
      date: "December 2024",
      verified: true,
      stayDuration: "Weekend",
      accommodationType: "Double Room",
      comment: "Needed a quick escape from Mumbai's chaos and Paradise Resort delivered perfectly. The double room was cozy, WiFi was reliable for essential work calls, and the mountain views provided the mental reset I desperately needed. The resort's proximity to Top Station made it ideal for a short but rejuvenating weekend getaway."
    },
    {
      id: 6,
      name: "Sarah Johnson",
      location: "Bangalore, Karnataka",
      profession: "International Tourist",
      rating: 5,
      date: "November 2024",
      verified: true,
      stayDuration: "1 week",
      accommodationType: "Private Cottage",
      comment: "Visiting from Australia, I was amazed by the authentic Kerala mountain experience at Paradise Resort. The hosts spoke excellent English and provided invaluable insights into local culture and attractions. The cottage was perfect for my extended stay, and the resort's commitment to eco-friendly practices aligns with my values as a conscious traveler."
    }
  ]
};

export const bookingOptions = {
  accommodationTypes: [
    { value: "cottage", label: "3 bedroom Private Cottage (18 pax)", maxRooms: 0 }, // No room selection for cottage
    { value: "deluxe", label: "Deluxe Room (5-6pax)", maxRooms: 5 },
    { value: "dormitory", label: "Dormitory (8 to 16pax)", maxRooms: 0 }, // No room selection for dormitory
    { value: "double", label: "Double Room (2+1 pax)", maxRooms: 2 },
    { value: "tent", label: "Tent Stay (3 pax)", maxRooms: 8, isTent: true } // Special handling for tents
  ],

  guestCounts: [
    { value: "1-5", label: "1-5 guests" },
    { value: "6-10", label: "6-10 guests" },
    { value: "11-18", label: "11-18 guests" },
    { value: "19-30", label: "19-30 guests" },
    { value: "30+", label: "30+ guests" }
  ],

  getRoomOptions: (accommodationType) => {
    const accommodation = bookingOptions.accommodationTypes.find(acc => acc.value === accommodationType);
    if (!accommodation || accommodation.maxRooms === 0) return [];

    const isTent = accommodation.isTent;
    const unitName = isTent ? 'tent' : 'room';

    return Array.from({ length: accommodation.maxRooms }, (_, i) => ({
      value: i + 1,
      label: `${i + 1} ${unitName}${i > 0 ? 's' : ''}`
    }));
  }
};
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
      features: ["🚿 Private bathroom", "🍳 Kitchen facilities", "🌄 Mountain view", "👨‍👩‍👧‍👦 Family-friendly"],
      price: "💬 Contact for pricing",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      name: "🏨 Resort Stay Package",
      capacity: "Up to 6️⃣0️⃣ guests",
      features: ["🛏️ Deluxe rooms", "🏠 Dormitory options", "💑 Double rooms", "👥 Group facilities"],
      price: "💬 Contact for pricing",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      name: "⛺ Camping Experience",
      capacity: "8️⃣ tents for up to 2️⃣4️⃣ guests",
      features: ["🏕️ Adventure tents", "🔥 Campfire access", "🥾 Trekking included", "🌲 Nature experience"],
      price: "💬 Contact for pricing", 
      image: "/api/placeholder/400/300"
    }
  ],

  gallery: [
    { id: 1, category: "Cottages", image: "/api/placeholder/600/400", title: "Private Cottage Exterior" },
    { id: 2, category: "Cottages", image: "/api/placeholder/600/400", title: "Cottage Interior" },
    { id: 3, category: "Tents", image: "/api/placeholder/600/400", title: "Adventure Camping Tents" },
    { id: 4, category: "Tents", image: "/api/placeholder/600/400", title: "Tent Setup" },
    { id: 5, category: "Views", image: "/api/placeholder/600/400", title: "Valley View" },
    { id: 6, category: "Views", image: "/api/placeholder/600/400", title: "Mountain Landscape" },
    { id: 7, category: "Activities", image: "/api/placeholder/600/400", title: "Campfire Night" },
    { id: 8, category: "Activities", image: "/api/placeholder/600/400", title: "Jeep Trekking" }
  ],

  testimonials: [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
      comment: "Amazing experience! The cottage was spacious and the views were breathtaking. Perfect for family vacation."
    },
    {
      id: 2,
      name: "Priya Sharma", 
      location: "Chennai",
      rating: 5,
      comment: "Best budget stay in Vattavada. The campfire night was magical and the hosts were very welcoming."
    },
    {
      id: 3,
      name: "David Wilson",
      location: "Kochi",
      rating: 5,
      comment: "Peaceful location with stunning valley views. The jeep trekking was an unforgettable adventure!"
    }
  ]
};

export const bookingOptions = {
  accommodationTypes: [
    { value: "cottage", label: "3-Bedroom Private Cottage (18 guests)" },
    { value: "resort", label: "Resort Stay (60 guests)" }, 
    { value: "camping", label: "Camping Tents (24 guests)" }
  ],
  
  guestCounts: [
    { value: "1-5", label: "1-5 guests" },
    { value: "6-10", label: "6-10 guests" },
    { value: "11-18", label: "11-18 guests" },
    { value: "19-30", label: "19-30 guests" },
    { value: "30+", label: "30+ guests" }
  ]
};
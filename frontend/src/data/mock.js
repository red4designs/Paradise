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
    { id: 1, category: "Deluxe Room", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", title: "Deluxe Room Interior" },
    { id: 2, category: "Deluxe Room", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", title: "Deluxe Room with Mountain View" },
    { id: 3, category: "Double Room", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", title: "Cozy Double Room" },
    { id: 4, category: "Double Room", image: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=600&q=80", title: "Double Room Setup" },
    { id: 5, category: "Dormitory", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", title: "Dormitory Accommodation" },
    { id: 6, category: "Dormitory", image: "https://images.unsplash.com/photo-1624923686627-514dd5e57bae?w=600&q=80", title: "Dormitory Facilities" },
    { id: 7, category: "Cottages", image: "/api/placeholder/600/400", title: "Private Cottage Exterior" },
    { id: 8, category: "Cottages", image: "/api/placeholder/600/400", title: "Cottage Interior" },
    { id: 9, category: "Tents", image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=600&q=80", title: "Adventure Camping Tents" },
    { id: 10, category: "Tents", image: "/api/placeholder/600/400", title: "Tent Setup" },
    { id: 11, category: "Views", image: "https://images.unsplash.com/photo-1531932594968-e5e5e9dee95a?w=600&q=80", title: "Valley View" },
    { id: 12, category: "Views", image: "https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?w=600&q=80", title: "Mountain Landscape" },
    { id: 13, category: "Activities", image: "/api/placeholder/600/400", title: "Campfire Night" },
    { id: 14, category: "Activities", image: "/api/placeholder/600/400", title: "Jeep Trekking" }
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
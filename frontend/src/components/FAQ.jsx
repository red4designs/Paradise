import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('booking');
  const categoryRefs = useRef({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = 140; // Account for sticky navigation + padding
      const elementPosition = rect.top + window.scrollY - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // Account for navigation height
      
      Object.entries(categoryRefs.current).forEach(([categoryId, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveCategory(categoryId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqCategories = {
    booking: {
      title: "🏨 Booking & Rooms",
      questions: [
        {
          question: "How can I book rooms in Vattavada at Paradise Resort?",
          answer: "You can book directly through our website, WhatsApp, or by calling 9074902424. Instant confirmation is available for all bookings."
        },
        {
          question: "What types of rooms and stays are available in Vattavada?",
          answer: "We offer:\n\n• Private Cottages (ideal for families & groups)\n• Budget Rooms (for couples & small families)\n• Tent Stay (for adventure & budget travelers)\n• Dormitory Stay (for bachelors & backpackers)"
        },
        {
          question: "What is the price of rooms in Vattavada?",
          answer: "Rooms start from ₹1,500/night\nTent stays from ₹800/night\nCottages for large groups available at budget-friendly prices\n\n(Contact us for the latest offers.)"
        },
        {
          question: "Do you provide family rooms in Vattavada?",
          answer: "Yes ✅ We have family-friendly cottages that can accommodate up to 18 adults, making it perfect for groups, families, and get-togethers."
        },
        {
          question: "Do you have budget-friendly stay options?",
          answer: "Yes, Paradise Resort is known as the best budget stay in Vattavada with rooms, tents, and cottages to fit every budget."
        }
      ]
    },
    safety: {
      title: "🛡️ Safety & Comfort",
      questions: [
        {
          question: "Is Paradise Resort safe for families and couples?",
          answer: "Yes, our property is family-run and very safe. Couples, families, and even solo travelers can enjoy a peaceful stay with privacy."
        }
      ]
    },
    activities: {
      title: "🎯 Activities & Attractions",
      questions: [
        {
          question: "What activities are available at the resort?",
          answer: "Guests can enjoy:\n\n• Campfire with music\n• BBQ setup with coal\n• Jeep trekking to nearby viewpoints\n• Scenic views of farms & mountains right from the resort"
        },
        {
          question: "What are the nearby attractions in Vattavada?",
          answer: "• Pampadum Shola National Park – 5 km\n• Top Station, Munnar – 7 km\n• Vegetable farms & strawberry fields\n• Scenic trekking & camping trails"
        }
      ]
    },
    travel: {
      title: "🌿 Travel & Location",
      questions: [
        {
          question: "What is the best time to visit Vattavada?",
          answer: "Vattavada is a 365-day destination 🌿\n\n• Summer (Mar–May): Cool climate, ideal for families\n• Monsoon (Jun–Sep): Lush greenery, perfect for nature lovers\n• Winter (Oct–Feb): Misty mornings & best for honeymoon couples"
        },
        {
          question: "How far is Paradise Resort Vattavada from Munnar?",
          answer: "We are located around 30 km from Munnar town and just 7 km from Top Station. Easily accessible by car or jeep."
        }
      ]
    }
  };

  const navigationItems = [
    { id: 'booking', label: 'Booking & Rooms', icon: '🏨' },
    { id: 'safety', label: 'Safety', icon: '🛡️' },
    { id: 'activities', label: 'Activities', icon: '🎯' },
    { id: 'travel', label: 'Travel Info', icon: '🌿' }
  ];

  return (
    <section className="section-padding bg-black">
      <div className="max-width-container">
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">
            ❓ Frequently Asked Questions – Paradise Resort Vattavada
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Find answers to common questions about our hotels and resorts in Vattavada
          </p>
        </div>

        {/* FAQ Navigation */}
        <div className="sticky top-20 z-40 mb-12 bg-black/95 backdrop-blur-sm border-b border-[hsl(var(--border))] pb-4">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToCategory(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === item.id
                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg'
                    : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)_/_0.8)] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQ Categories */}
        <div className="space-y-12">
          {Object.entries(faqCategories).map(([categoryId, category]) => (
            <div 
              key={categoryId}
              ref={(el) => (categoryRefs.current[categoryId] = el)}
              className="scroll-mt-36"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = `${categoryId}-${questionIndex}`;
                  return (
                    <div 
                      key={globalIndex}
                      className="bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))] overflow-hidden transition-all duration-200 hover:border-[hsl(var(--primary))] hover:shadow-lg hover:shadow-[hsl(var(--primary)_/_0.1)]"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                      >
                        <span className="text-lg font-semibold text-white pr-4">
                          {item.question}
                        </span>
                        {openItems[globalIndex] ? (
                          <ChevronUpIcon className="h-5 w-5 text-[hsl(var(--primary))] flex-shrink-0" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-[hsl(var(--primary))] flex-shrink-0" />
                        )}
                      </button>
                      
                      {openItems[globalIndex] && (
                        <div className="px-6 pb-4 border-t border-gray-800">
                          <div className="pt-4 text-[hsl(var(--muted-foreground))] leading-relaxed whitespace-pre-line">
                            {item.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-6">
            Still have questions about our Vattavada stay options?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919074902424" 
              className="inline-flex items-center px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold rounded-lg hover:bg-[hsl(var(--primary)_/_0.9)] transition-colors shadow-lg hover:shadow-[hsl(var(--primary)_/_0.25)]"
            >
              📞 Call +91 90749 02424
            </a>
            <a 
              href="https://wa.me/919074902424" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-500/25"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
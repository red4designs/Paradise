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
    general: {
      title: "❓ Frequently Asked Questions",
      questions: [
        {
          question: "Where is Paradise Resort Vattavada located?",
          answer: "Paradise Resort Vattavada is located just 1.5 km before Vattavada town, near Munnar in Kerala. The resort is surrounded by peaceful valleys, vegetable and strawberry farms, and breathtaking mountain views. Nearby attractions include Pampadum Shola National Park and Top Station (7 km), making it an ideal base for exploring Vattavada and Munnar."
        },
        {
          question: "What types of accommodation do you offer?",
          answer: "We provide multiple stay options to suit every traveler:\n\nPrivate Cottage in Vattavada – 3-bedroom cottage with hot water and free WiFi, perfect for large families or groups (up to 18 adults with extra beds).\n\nResort Rooms in Vattavada – Spacious and comfortable rooms that can host up to 60 guests, with hot water and WiFi included.\n\nTent Stay in Vattavada – 8 cozy tents designed for adventurous travelers, accommodating up to 24 guests."
        },
        {
          question: "Is the property family and couple-friendly?",
          answer: "Yes. Paradise Resort Vattavada is a family-run budget resort near Munnar, ensuring safety, cleanliness, and a welcoming atmosphere for families, couples, and groups."
        },
        {
          question: "Do you provide food?",
          answer: "Yes, we serve delicious South Indian non-vegetarian food in Vattavada. Guests can also enjoy BBQ facilities and campfire nights with music, available at an additional cost."
        },
        {
          question: "What extra activities are available at Paradise Resort Vattavada?",
          answer: "Campfire with music under the stars\n\nBBQ set with coal for a memorable evening\n\nJeep trekking in Vattavada through scenic mountain routes"
        },
        {
          question: "Is parking available?",
          answer: "Yes, our resort provides free and spacious parking in Vattavada, suitable for cars and even large 49-seater buses."
        },
        {
          question: "What are the check-in and check-out times?",
          answer: "Check-in: 12:00 PM\n\nCheck-out: 11:00 AM\n\n(Early check-in or late check-out may be possible on request, subject to availability.)"
        },
        {
          question: "Do you provide internet and mobile connectivity?",
          answer: "Yes, free WiFi in Vattavada is available across our property. Mobile network coverage exists but may be limited in some areas due to the hill station's location."
        },
        {
          question: "How can I book my stay?",
          answer: "You can book your stay at Paradise Resort Vattavada directly through Booking.com, our official website, or by contacting us via WhatsApp at 9074902424. Please note that advance payment is mandatory for all bookings to secure your reservation."
        },
        {
          question: "What is your cancellation policy?",
          answer: "All bookings at Paradise Resort Vattavada are non-refundable. However, if you inform us at least 7 days before your check-in date, you can reschedule your stay to the next available date without any extra charges."
        }
      ]
    }
  };

  const navigationItems = [
    { id: 'general', label: 'All Questions', icon: '❓' }
  ];

  return (
    <section id="faq" className="section-padding bg-black">
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
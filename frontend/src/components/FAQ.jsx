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
      title: "❓ Frequently Asked Questions About Paradise Resort Vattavada",
      subtitle: "Complete answers to help you plan your perfect mountain getaway in Vattavada, Kerala",
      questions: [
        {
          question: "Where is Paradise Resort Vattavada located and what are nearby attractions?",
          answer: "Paradise Resort Vattavada is strategically located just 1.5 km before Vattavada town, near Munnar in Kerala's Western Ghats. Our resort sits at an elevation surrounded by peaceful valleys, organic vegetable farms, and strawberry plantations with breathtaking 360-degree mountain views. Key nearby attractions include Pampadum Shola National Park (7 km), Top Station viewpoint (7 km), Kolukkumalai Tea Estate (12 km), and Munnar town center (25 km). This makes us the perfect base for exploring Vattavada's natural beauty and Munnar's famous tea gardens.",
          category: "Location & Attractions",
          keywords: ["Vattavada location", "Munnar nearby", "Top Station", "Pampadum Shola"]
        },
        {
          question: "What types of accommodation and room options are available at Paradise Resort?",
          answer: "Paradise Resort Vattavada offers three distinct accommodation types to suit every traveler and budget: 1) Private 3-Bedroom Cottage in Vattavada – Spacious family cottage with hot water, free WiFi, and mountain views, accommodating up to 18 adults with extra bedding arrangements. Perfect for large families and groups. 2) Resort Rooms in Vattavada – Comfortable and well-appointed rooms with modern amenities, capable of hosting up to 60 guests total. Ideal for medium-sized groups and corporate retreats. 3) Adventure Tent Stay in Vattavada – 8 premium camping tents designed for nature enthusiasts, accommodating up to 24 guests total (2-3 per tent). Each tent includes comfortable bedding and access to shared facilities.",
          category: "Accommodation Types",
          keywords: ["cottage Vattavada", "tent stay", "resort rooms", "group accommodation"]
        },
        {
          question: "Is Paradise Resort Vattavada safe and suitable for families with children and couples?",
          answer: "Absolutely yes. Paradise Resort Vattavada is a family-owned and operated budget resort near Munnar, ensuring the highest standards of safety, cleanliness, and hospitality. We maintain a secure, family-friendly environment with 24/7 staff presence, well-lit pathways, and child-safe facilities. Our property is particularly welcoming for families with children, offering spacious grounds for kids to play safely, and we provide a peaceful, romantic atmosphere perfect for couples seeking a mountain retreat. All our staff are trained in hospitality and emergency procedures.",
          category: "Safety & Suitability",
          keywords: ["family friendly Vattavada", "safe resort", "couples retreat", "child safe"]
        },
        {
          question: "What food and dining options are available at the resort?",
          answer: "Paradise Resort Vattavada serves authentic, freshly prepared South Indian cuisine with both vegetarian and non-vegetarian options. Our in-house kitchen specializes in traditional Kerala dishes using locally sourced ingredients from nearby farms. Meal options include breakfast, lunch, and dinner with advance notice. Additionally, we offer exciting outdoor dining experiences: BBQ facilities with coal and grilling equipment for evening cookouts, and campfire dining under the stars with traditional music. Special dietary requirements and custom meal requests can be accommodated with prior arrangement.",
          category: "Food & Dining",
          keywords: ["South Indian food", "Kerala cuisine", "BBQ facilities", "campfire dining"]
        },
        {
          question: "What adventure activities and experiences are available at Paradise Resort Vattavada?",
          answer: "Paradise Resort Vattavada offers a range of exciting mountain activities and experiences: 1) Campfire Nights with Music – Enjoy evenings around a crackling campfire with traditional folk music and storytelling under the starlit sky. 2) BBQ Cookouts – Complete BBQ setup with coal, grilling equipment, and fresh ingredients for a memorable outdoor cooking experience. 3) Jeep Trekking Adventures – Guided jeep safaris through Vattavada's rugged mountain terrain, visiting hidden viewpoints, tea estates, and local villages. 4) Nature Walks – Guided walks through organic farms, spice plantations, and forest trails. 5) Stargazing Sessions – Clear mountain skies perfect for astronomy enthusiasts. All activities are conducted with safety measures and experienced local guides.",
          category: "Activities & Experiences",
          keywords: ["jeep trekking Vattavada", "campfire music", "BBQ setup", "nature walks"]
        },
        {
          question: "What parking facilities are available for cars and buses?",
          answer: "Paradise Resort Vattavada provides ample, secure, and completely free parking facilities suitable for all vehicle types. Our spacious parking area can accommodate personal cars, SUVs, and even large tour buses up to 49-seater capacity. The parking area is well-maintained, properly lit for night security, and located conveniently close to all accommodation types. This makes us ideal for group tours, family road trips, and corporate outings arriving by chartered buses.",
          category: "Parking & Transportation",
          keywords: ["free parking Vattavada", "bus parking", "car parking", "group tours"]
        },
        {
          question: "What are the check-in and check-out times, and can they be flexible?",
          answer: "Standard check-in time at Paradise Resort Vattavada is 02:00 PM, and check-out time is 11:00 AM. However, we understand that travel plans can vary, especially in hill stations. Early check-in (from 10:00 AM) and late check-out (until 1:00 PM) may be possible based on availability and prior arrangement. For guests arriving very early or departing very late, we can provide luggage storage and common area access. Please contact us at +91 9074902424 to discuss flexible timing options for your specific travel needs.",
          category: "Check-in & Check-out",
          keywords: ["check-in time", "check-out time", "flexible timing", "early check-in"]
        },
        {
          question: "What internet and mobile connectivity options are available in Vattavada?",
          answer: "Paradise Resort Vattavada provides complimentary high-speed WiFi internet access throughout the property, including all rooms, common areas, and outdoor spaces. Our WiFi network is reliable and suitable for video calls, streaming, and work-from-mountain needs. Regarding mobile connectivity, major Indian networks ( Jio, BSNL) have coverage in Vattavada, though signal strength may vary in some remote areas due to the mountainous terrain. We recommend downloading offline maps and entertainment before arrival for the best experience.",
          category: "Connectivity & Technology",
          keywords: ["free WiFi Vattavada", "internet connectivity", "mobile network", "work from mountain"]
        },
        {
          question: "How can I book my stay at Paradise Resort Vattavada and what payment is required?",
          answer: "Booking your stay at Paradise Resort Vattavada is simple and convenient through multiple channels: 1) Direct WhatsApp booking at +91 9074902424 for instant confirmation and personalized service. 2) Online through our official website with secure payment options. 3) Third-party platforms like Booking.com and Agoda for international travelers. 4) Phone booking at +91 9074902424 for detailed discussions about your requirements. Important: Advance payment is mandatory for all bookings to secure your reservation, especially during peak seasons (October-March). We accept UPI, bank transfers, and online payments for your convenience.",
          category: "Booking & Reservations",
          keywords: ["book Vattavada resort", "WhatsApp booking", "advance payment", "reservation"]
        },
        {
          question: "What is the cancellation and rescheduling policy for bookings?",
          answer: "Paradise Resort Vattavada operates a clear and fair booking policy: All bookings are non-refundable due to the seasonal nature of hill station tourism and advance arrangements we make for your stay. However, we offer flexible rescheduling options: If you notify us at least 7 days before your scheduled check-in date, you can reschedule your stay to any available future date within the same calendar year without any additional charges. This policy allows you to adjust your travel plans while ensuring we can accommodate other guests. For emergency situations, please contact us directly to discuss possible solutions.",
          category: "Cancellation & Policy",
          keywords: ["cancellation policy", "reschedule booking", "non-refundable", "flexible dates"]
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
        <header className="text-center mb-16">
          <h2 className="display-large mb-6 text-brand-primary">
            {faqCategories.general.title}
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            {faqCategories.general.subtitle}
          </p>
        </header>

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
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = `${categoryId}-${questionIndex}`;
                  return (
                    <article 
                      key={globalIndex}
                      className="bg-white/5 border border-white/25 rounded-lg overflow-hidden transition-all duration-200 hover:border-brand-primary/50 hover:shadow-lg"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-inset hover:bg-white/5 transition-colors"
                        aria-expanded={openItems[globalIndex]}
                        aria-controls={`answer-${globalIndex}`}
                      >
                        <h3 className="text-lg font-semibold text-white pr-4" itemProp="name">
                          {item.question}
                        </h3>
                        <div className="flex items-center gap-2">
                          {item.category && (
                            <span className="hidden sm:inline-block px-2 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded-full">
                              {item.category}
                            </span>
                          )}
                          {openItems[globalIndex] ? (
                            <ChevronUpIcon className="h-5 w-5 text-brand-primary flex-shrink-0" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-text-secondary flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {openItems[globalIndex] && (
                        <div 
                          id={`answer-${globalIndex}`}
                          className="px-6 pb-6 border-t border-white/10"
                          itemScope
                          itemType="https://schema.org/Answer"
                        >
                          <div className="pt-4">
                            <div className="text-text-secondary leading-relaxed mb-4" itemProp="text">
                              {item.answer}
                            </div>
                            
                            {/* Keywords for AI Context */}
                            {item.keywords && item.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                <span className="text-xs text-brand-primary font-medium">Related:</span>
                                {item.keywords.map((keyword, keywordIndex) => (
                                  <span 
                                    key={keywordIndex}
                                    className="px-2 py-1 bg-white/10 text-text-muted text-xs rounded-full border border-white/20"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </article>
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
                onClick={() => window.gtag_report_conversion && window.gtag_report_conversion('tel:+919074902424')} 
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
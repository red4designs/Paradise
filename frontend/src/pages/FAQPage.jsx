import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '../constants/seo';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { useLocation } from 'react-router-dom';

const faqs = [
  { id: "location", question: "Where is Paradise Resort Vattavada located?", answer: "Paradise Resort Vattavada is located just 1.5 km from Vattavada town, offering a peaceful nature stay with scenic valley views." },
  { id: "family", question: "Is your resort suitable for families and groups?", answer: "Yes, we are a family-run resort providing a safe and comfortable stay for families, couples, and groups." },
  { id: "jeep-trekking", question: "Do you provide jeep trekking in Vattavada?", answer: "Yes, we offer Vattavada Jeep Trekking covering 28 km for 3+ hours at ₹2500 per jeep (max 8 persons)." },
  { id: "sightseeing", question: "What places are covered in jeep trekking?", answer: "Shooting Point, Chilanthiyar Waterfall, Tiger Cave, Tribal Village View, Vegetable Farms, Pazhathottam Aerial View Point, Vattavada Silver Falls, Strawberry Farm, Honey Museum." },
  { id: "campfire", question: "Do you provide campfire?", answer: "Yes, campfire with music is available up to 10:00 PM for ₹800." },
  { id: "bbq", question: "Do you provide BBQ setup?", answer: "Yes, grill set + charcoal is ₹400. Extra charcoal, chicken, and marination are charged separately. Marination is ₹100 per chicken." },
  { id: "food-cost", question: "What is the cost of food?", answer: "Dinner ₹200 per person, Breakfast ₹100 per person." },
  { id: "food-menu", question: "What food do you provide?", answer: "Dinner: Chapati + Chicken Curry\nBreakfast: Idli, Vada, Chutney, Sambar, Tea" },
  { id: "kitchen", question: "Is kitchen available for cooking?", answer: "Currently not available due to LPG shortage." },
  { id: "facilities", question: "What facilities do you provide?", answer: "Free WiFi, hot water (restricted timing due to LPG), parking, scenic views, group stay options." },
  { id: "timing", question: "What is Vattavada checkpost timing?", answer: "Entry allowed only from 6:00 AM to 6:00 PM." }
];

const FAQPage = () => {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const index = faqs.findIndex(f => f.id === hash);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  React.useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const index = faqs.findIndex(f => f.id === hash);
      if (index >= 0) {
        setOpenIndex(index);
        setTimeout(() => {
          const element = document.getElementById(`faq-${hash}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [location.hash]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-sand min-h-screen pt-24 pb-32">
      <Helmet>
        <title>Frequently Asked Questions | Paradise Resort Vattavada</title>
        <meta name="description" content="Find answers to commonly asked questions about your stay, amenities, and experiences at Paradise Resort Vattavada." />
        <link rel="canonical" href={`${BASE_URL}/faq`} />

        {/* FAQ SCHEMA FOR GOOGLE RICH RESULTS */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Where is Paradise Resort Vattavada located?", "acceptedAnswer": { "@type": "Answer", "text": "Paradise Resort Vattavada is located 1.5 km from Vattavada town with scenic valley views." } },
              { "@type": "Question", "name": "Do you provide jeep trekking in Vattavada?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, 28 km jeep trekking for 3+ hours at Rs. 2500 per jeep (max 8 persons)." } },
              { "@type": "Question", "name": "What places are covered in jeep trekking?", "acceptedAnswer": { "@type": "Answer", "text": "Shooting Point, Chilanthiyar Waterfall, Tiger Cave, Tribal Village, Vegetable Farms, Pazhathottam View Point, Silver Falls, Strawberry Farm and Honey Museum." } },
              { "@type": "Question", "name": "Do you provide campfire?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, campfire available till 10 PM at Rs. 800." } },
              { "@type": "Question", "name": "Do you provide BBQ?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, grill set with charcoal at Rs. 400. Chicken and marination extra." } },
              { "@type": "Question", "name": "What is food cost?", "acceptedAnswer": { "@type": "Answer", "text": "Dinner Rs. 200 and breakfast Rs. 100 per person." } },
              { "@type": "Question", "name": "Is kitchen available?", "acceptedAnswer": { "@type": "Answer", "text": "No, currently not available due to LPG shortage." } },
              { "@type": "Question", "name": "What facilities do you provide?", "acceptedAnswer": { "@type": "Answer", "text": "WiFi, hot water (limited timing), parking, scenic views and group stay." } },
              { "@type": "Question", "name": "What is Vattavada checkpost entry timing?", "acceptedAnswer": { "@type": "Answer", "text": "Entry is allowed only between 6 AM and 6 PM." } }
            ]
          })
        }} />

        {/* LOCAL BUSINESS SCHEMA FOR GOOGLE MAPS SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": "Paradise Resort Vattavada",
            "telephone": "+91-9074902424",
            "priceRange": "₹₹",
            "description": "Best budget stay in Vattavada with jeep trekking, campfire, BBQ and scenic views.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Vattavada",
              "addressRegion": "Kerala",
              "postalCode": "685615",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "10.1830",
              "longitude": "77.2550"
            },
            "amenityFeature": [
              { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Hot Water", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "Campfire", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "BBQ", "value": true }
            ],
            "makesOffer": [
              { "@type": "Offer", "name": "Jeep Trekking", "price": "2500", "priceCurrency": "INR" },
              { "@type": "Offer", "name": "Campfire", "price": "800", "priceCurrency": "INR" },
              { "@type": "Offer", "name": "BBQ", "price": "400", "priceCurrency": "INR" }
            ],
            "sameAs": [
              "https://maps.app.goo.gl/J3zwapznrALcECEN6"
            ]
          })
        }} />
      </Helmet>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 fade-in-up">
        <span className="uppercase tracking-[0.2em] text-xs font-medium text-forest/80 block mb-4">Support & Information</span>
        <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">Frequently Asked <span className="italic font-light">Questions</span></h1>
        <p className="text-lg text-forest/90 font-light max-w-2xl mx-auto">
          Planning your trip to the <strong>best resort in Vattavada</strong>? Find all the details below regarding our cozy stays, exclusive <strong>Jeep trekking Vattavada</strong> packages, amenities, and more.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 fade-in-up" style={{ animationDelay: '0.1s' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} id={`faq-${faq.id}`} className="border-b border-forest/10 pt-4 mt-px">
              <button 
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
              >
                <h2 className={`font-serif text-xl transition-colors pr-6 ${isOpen ? 'text-forest' : 'text-forest/90 group-hover:text-forest'}`}>
                  {faq.question}
                </h2>
                <span className="text-forest/80 shrink-0 transition-transform duration-300">
                  {isOpen ? <ChevronUp size={24} strokeWidth={1.5} /> : <ChevronDown size={24} strokeWidth={1.5} />}
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}`}
              >
                <p className="text-forest/90 font-light leading-relaxed pl-4 border-l border-forest/20 whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default FAQPage;
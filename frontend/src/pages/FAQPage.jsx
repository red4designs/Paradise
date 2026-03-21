import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '../constants/seo';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { mockData } from '../data/mock'; // Ensure mockData has the FAQs, else fallback to standard list.

const faqs = [
  { question: "What are the check-in and check-out times?", answer: "Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in and late check-out are subject to availability." },
  { question: "Is parking available at the resort?", answer: "Yes, we offer complimentary secure parking for all our guests within the resort premises." },
  { question: "Are pets allowed?", answer: "Currently, we do not accommodate pets to ensure the comfort of all our guests." },
  { question: "How do I book a jeep trekking session?", answer: "You can book jeep trekking either directly during your stay via our front desk or by requesting it through our WhatsApp booking inquiry prior to your arrival." },
  { question: "Is the resort child-friendly?", answer: "Yes, our private cottages and deluxe rooms are very spacious and perfect for families with children." },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-sand min-h-screen pt-24 pb-32">
      <Helmet>
        <title>Frequently Asked Questions | Paradise Resort Vattavada</title>
        <meta name="description" content="Find answers to commonly asked questions about your stay, amenities, and experiences at Paradise Resort Vattavada." />
        <link rel="canonical" href={`${BASE_URL}/faq`} />
      </Helmet>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 fade-in-up">
        <span className="uppercase tracking-[0.2em] text-xs font-medium text-forest/80 block mb-4">Support</span>
        <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">Frequently Asked <span className="italic font-light">Questions</span></h1>
        <p className="text-lg text-forest/90 font-light max-w-2xl mx-auto">
          Everything you need to know about your upcoming stay at Paradise Resort Vattavada.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 fade-in-up" style={{ animationDelay: '0.1s' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-forest/10">
              <button 
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
              >
                <h2 className={`font-serif text-xl transition-colors ${isOpen ? 'text-forest' : 'text-forest/90 group-hover:text-forest'}`}>
                  {faq.question}
                </h2>
                <span className="text-forest/80 ml-4 shrink-0 transition-transform duration-300">
                  {isOpen ? <ChevronUp size={24} strokeWidth={1.5} /> : <ChevronDown size={24} strokeWidth={1.5} />}
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}`}
              >
                <p className="text-forest/90 font-light leading-relaxed pl-4 border-l border-forest/20">
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
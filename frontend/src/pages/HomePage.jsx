import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import RoomDetails from '../components/RoomDetails';
import About from '../components/About';
import Amenities from '../components/Amenities';
import Packages from '../components/Packages';
import Gallery from '../components/Gallery';
import TravelGuide from '../components/TravelGuide';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import FAQSchema from '../components/schemas/FAQSchema';
import EventSchema from '../components/schemas/EventSchema';
import OfferSchema from '../components/schemas/OfferSchema';

const HomePage = () => {
  // Common FAQ data for homepage
  const commonFAQs = [
    {
      question: "What are the check-in and check-out times?",
      answer: "Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request."
    },
    {
      question: "What accommodation options are available?",
      answer: "We offer private cottages, adventure tents, and budget dormitory stays to suit different preferences and budgets."
    },
    {
      question: "Is food included in the stay?",
      answer: "We offer delicious Kerala cuisine and can arrange meals upon request. Please contact us for meal packages and pricing."
    },
    {
      question: "What activities are available nearby?",
      answer: "Vattavada offers trekking, nature walks, tea plantation visits, and stunning mountain views. We can help arrange local tours and activities."
    },
    {
      question: "How do I make a reservation?",
      answer: "You can call us at +91 9074902424 or contact us through our website. We recommend booking in advance, especially during peak seasons."
    }
  ];

  // Seasonal events data
  const seasonalEvents = [
    {
      name: "Vattavada Trekking Season",
      description: "Best time for trekking and outdoor adventures in Vattavada hills",
      startDate: "2024-10-01",
      endDate: "2024-03-31",
      location: "Vattavada, Kerala"
    },
    {
      name: "Summer Holiday Special",
      description: "Family-friendly summer programs with activities for all ages",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      location: "Paradise Resort Vattavada"
    }
  ];

  // Current offers data
  const currentOffers = [
    {
      name: "Family Package Deal",
      description: "Special rates for families staying 2+ nights in our cottages",
      validFrom: "2024-01-01",
      validThrough: "2024-12-31",
      discount: "20% off on cottage bookings for families"
    },
    {
      name: "Adventure Tent Special",
      description: "Experience camping with comfort - tent stay packages",
      validFrom: "2024-01-01",
      validThrough: "2024-12-31",
      discount: "15% off on tent bookings for 3+ nights"
    }
  ];
  return (
    <>
      <Helmet>
        <title>Paradise Resort Vattavada | Best Budget Stay in Vattavada Kerala</title>
        <meta name="description" content="Experience paradise at Paradise Resort Vattavada - the best budget resort near Munnar. Enjoy luxury accommodations, mountain views, adventure activities & delicious cuisine in Kerala's hill station." />
        <meta name="keywords" content="Paradise Resort Vattavada, budget resort Vattavada, best stay in Vattavada, Munnar resorts, Kerala hill station resort, budget accommodation Vattavada, homestay in Vattavada, resorts near Vattavada, family friendly resorts in Vattavada" />
        <link rel="canonical" href="https://www.paradisevattavada.com/" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Paradise Resort Vattavada | Best Budget Stay in Vattavada Kerala" />
        <meta property="og:description" content="Experience paradise at Paradise Resort Vattavada - the best budget resort near Munnar. Enjoy luxury accommodations, mountain views, adventure activities & delicious cuisine." />
        <meta property="og:url" content="https://www.paradisevattavada.com/" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:title" content="Paradise Resort Vattavada | Best Budget Stay in Vattavada Kerala" />
        <meta name="twitter:description" content="Experience paradise at Paradise Resort Vattavada - the best budget resort near Munnar. Enjoy luxury accommodations, mountain views, adventure activities & delicious cuisine." />
      </Helmet>
      
      {/* Schema.org structured data */}
      <FAQSchema faqs={commonFAQs} />
      <EventSchema events={seasonalEvents} />
      <OfferSchema offers={currentOffers} />

      <Hero />
      <RoomDetails />
      <About />
      <Amenities />
      <Packages />
      <Gallery />
      <TravelGuide />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;
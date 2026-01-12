import React, { Suspense, useMemo } from 'react';
import { BASE_URL } from '../constants/seo';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import OptimizedRoomDetails from '../components/OptimizedRoomDetails';
import About from '../components/About';
// Lazy load non-critical below-the-fold components for better INP
const Amenities = React.lazy(() => import('../components/Amenities'));
const Packages = React.lazy(() => import('../components/Packages'));
const VirtualScrollGallery = React.lazy(() => import('../components/VirtualScrollGallery'));
const TravelGuide = React.lazy(() => import('../components/TravelGuide'));
const FAQ = React.lazy(() => import('../components/FAQ'));
const Contact = React.lazy(() => import('../components/Contact'));
import FAQSchema from '../components/schemas/FAQSchema';
import EventSchema from '../components/schemas/EventSchema';
import OfferSchema from '../components/schemas/OfferSchema';

import PerformanceOptimizer from '../components/PerformanceOptimizer';
import LazySection from '../components/LazySection';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';

const HomePage = () => {
  const { scheduleIdleTask } = usePerformanceOptimization();

  // Memoize static data to prevent recreation on every render
  const commonFAQs = useMemo(() => [
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
  ], []);

  // Memoize seasonal events data
  const seasonalEvents = useMemo(() => [
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
  ], []);

  // Memoize current offers data
  const currentOffers = useMemo(() => [
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
  ], []);
  return (
    <PerformanceOptimizer>
      <>
        <Helmet>
          <title>Paradise Resort Vattavada | Best Budget Stay in Vattavada Kerala</title>
          <meta name="description" content="Experience paradise at Paradise Resort Vattavada - the best budget resort near Munnar. Enjoy luxury accommodations, mountain views & adventure activities." />
          <meta name="keywords" content="Paradise Resort Vattavada, budget resort Vattavada, best stay in Vattavada, Munnar resorts, Kerala hill station resort, budget accommodation Vattavada, homestay in Vattavada, resorts near Vattavada, family friendly resorts in Vattavada" />
          <link rel="canonical" href={BASE_URL} />

          {/* Enhanced Open Graph tags */}
          <meta property="og:title" content="Paradise Resort Vattavada | Best Budget Stay in Vattavada Kerala" />
          <meta property="og:description" content="Experience paradise at Paradise Resort Vattavada - the best budget resort near Munnar. Enjoy luxury accommodations, mountain views & adventure activities." />
          <meta property="og:url" content="https://www.paradisevattavada.com/" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://www.paradisevattavada.com/images/hero-resort.webp" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Paradise Resort Vattavada - Mountain Views and Luxury Accommodation" />
          <meta property="og:site_name" content="Paradise Resort Vattavada" />
          <meta property="og:locale" content="en_US" />

          {/* Enhanced Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Paradise Resort Vattavada | Best Budget Stay in Vattavada Kerala" />
          <meta name="twitter:description" content="Experience paradise at Paradise Resort Vattavada - the best budget resort near Munnar. Enjoy luxury accommodations, mountain views & adventure activities." />
          <meta name="twitter:image" content="https://www.paradisevattavada.com/images/hero-resort.webp" />
          <meta name="twitter:image:alt" content="Paradise Resort Vattavada - Mountain Views and Luxury Accommodation" />

          {/* Additional SEO meta tags */}
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
          <meta name="googlebot" content="index, follow" />
          <meta name="geo.region" content="IN-KL" />
          <meta name="geo.placename" content="Vattavada, Kerala, India" />
          <meta name="geo.position" content="10.1632;77.1624" />

          {/* Enhanced structured data for resort */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Resort",
              "name": "Paradise Resort Vattavada",
              "description": "Premium budget resort in Vattavada offering cottages, adventure tents, and dormitory accommodation with stunning mountain views near Munnar.",
              "url": "https://www.paradisevattavada.com/",
              "image": [
                "https://www.paradisevattavada.com/images/hero-resort.webp",
                "https://www.paradisevattavada.com/images/cottages/cottage-exterior.webp",
                "https://www.paradisevattavada.com/images/Tents/tent-new-1.jpg"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Vattavada",
                "addressLocality": "Vattavada",
                "addressRegion": "Kerala",
                "postalCode": "685565",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "10.1632",
                "longitude": "77.1624"
              },
              "telephone": "+91-9074902424",
              "email": "info@paradisevattavada.com",
              "priceRange": "₹₹",
              "starRating": {
                "@type": "Rating",
                "ratingValue": "4.5"
              },
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Mountain Views",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Adventure Activities",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Campfire Area",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Multiple Accommodation Types",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Family Friendly",
                  "value": true
                }
              ],
              "hasMap": "https://maps.google.com/?q=10.1632,77.1624",
              "openingHours": "Mo-Su 00:00-23:59",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9074902424",
                "contactType": "reservations",
                "availableLanguage": ["English", "Hindi", "Malayalam"]
              }
            })}
          </script>
        </Helmet>

        {/* Schema.org structured data */}
        <FAQSchema faqs={commonFAQs} />
        <EventSchema events={seasonalEvents} />
        <OfferSchema offers={currentOffers} />

        <Hero />

        <OptimizedRoomDetails />
        <About />

        {/* Enhanced lazy loaded components with intersection observer */}
        <LazySection
          minHeight="400px"
          rootMargin="200px"
          priority="high"
          fallback={<div className="h-96 bg-[hsl(var(--muted)_/_0.1)] animate-pulse rounded-lg mx-4 my-8"></div>}
        >
          <Amenities />
        </LazySection>

        <LazySection
          minHeight="400px"
          rootMargin="150px"
          priority="high"
          fallback={<div className="h-96 bg-[hsl(var(--muted)_/_0.1)] animate-pulse rounded-lg mx-4 my-8"></div>}
        >
          <Packages />
        </LazySection>

        <LazySection
          minHeight="600px"
          rootMargin="100px"
          priority="high"
          fallback={<div className="h-96 bg-[hsl(var(--muted)_/_0.1)] animate-pulse rounded-lg mx-4 my-8"></div>}
        >
          <VirtualScrollGallery />
        </LazySection>

        <LazySection
          minHeight="300px"
          rootMargin="100px"
          priority="normal"
          fallback={<div className="h-64 bg-[hsl(var(--muted)_/_0.1)] animate-pulse rounded-lg mx-4 my-8"></div>}
        >
          <TravelGuide />
        </LazySection>

        <LazySection
          minHeight="300px"
          rootMargin="50px"
          priority="normal"
          fallback={<div className="h-64 bg-[hsl(var(--muted)_/_0.1)] animate-pulse rounded-lg mx-4 my-8"></div>}
        >
          <FAQ />
        </LazySection>

        <LazySection
          minHeight="400px"
          rootMargin="50px"
          priority="low"
          fallback={<div className="h-96 bg-[hsl(var(--muted)_/_0.1)] animate-pulse rounded-lg mx-4 my-8"></div>}
        >
          <Contact />
        </LazySection>
      </>
    </PerformanceOptimizer>
  );
};

export default HomePage;
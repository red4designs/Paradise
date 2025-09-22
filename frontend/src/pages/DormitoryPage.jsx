import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import RoomDetails from '../components/RoomDetails';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
const Contact = React.lazy(() => import('../components/Contact'));
import FAQSchema from '../components/schemas/FAQSchema';
import OfferSchema from '../components/schemas/OfferSchema';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Home, Users } from 'lucide-react';

const DormitoryPage = () => {
  // Dormitory-specific FAQs
  const dormitoryFAQs = [
    {
      question: "What is included in the dormitory stay at Paradise Resort Vattavada?",
      answer: "Our budget dormitory stay includes bunk beds accommodating up to 16 guests, shared bathroom facilities (not private bathroom), free WiFi, hot water, and access to all resort amenities. Rs. 500 per head with minimum 8 pax booking required."
    },
    {
      question: "Is the dormitory safe for solo travelers and backpackers?",
      answer: "Yes, our dormitory provides a safe and social environment for solo travelers, backpackers, and budget-conscious guests. We maintain 24/7 security and a friendly atmosphere at our family friendly resort."
    },
    {
      question: "Can groups book the entire dormitory?",
      answer: "Yes, groups can book the entire dormitory for exclusive use. This makes it an excellent budget stay option for large groups, student trips, or corporate retreats in Vattavada."
    }
  ];

  // Dormitory-specific offers
  const dormitoryOffers = [
    {
      name: "Budget Dormitory - Backpacker Special",
      description: "Special rates for backpackers and solo travelers seeking affordable budget stay in Vattavada with shared accommodation and social atmosphere. Rs. 500 per head with minimum 8 pax booking.",
      price: "500",
      validFrom: "2024-01-01",
      validThrough: "2024-12-31",
      category: "Budget Accommodation",
      serviceName: "Backpacker Dormitory Stay",
      serviceDescription: "Affordable shared accommodation perfect for budget travelers and backpackers"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Budget Dormitory Stay in Vattavada | Paradise Resort Backpacker Accommodation</title>
        <meta name="description" content="Affordable dormitory accommodation at Paradise Resort Vattavada. Perfect for backpackers, solo travelers & groups seeking budget-friendly mountain stay near Munnar." />
        <meta name="keywords" content="budget dormitory Vattavada, backpacker accommodation Vattavada, shared dormitory near Munnar, budget stay Vattavada, hostel accommodation Kerala, group accommodation Vattavada, cheap stay near Munnar, budget travelers Vattavada" />
        <link rel="canonical" href="https://paradisevattavada.com/dormitory" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Budget Dormitory Stay in Vattavada | Paradise Resort Backpacker Accommodation" />
        <meta property="og:description" content="Affordable dormitory accommodation at Paradise Resort Vattavada. Perfect for backpackers, solo travelers & groups seeking budget-friendly mountain stay near Munnar." />
        <meta property="og:url" content="https://paradisevattavada.com/dormitory" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://paradisevattavada.com/images/dormitory-exterior.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Budget Dormitory at Paradise Resort Vattavada" />
        <meta property="og:site_name" content="Paradise Resort Vattavada" />
        <meta property="og:locale" content="en_US" />
        
        {/* Enhanced Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Budget Dormitory Stay in Vattavada | Paradise Resort Backpacker Accommodation" />
        <meta name="twitter:description" content="Affordable dormitory accommodation at Paradise Resort Vattavada. Perfect for backpackers, solo travelers & groups seeking budget-friendly mountain stay near Munnar." />
        <meta name="twitter:image" content="https://paradisevattavada.com/images/dormitory-exterior.webp" />
        <meta name="twitter:image:alt" content="Budget Dormitory at Paradise Resort Vattavada" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Vattavada, Kerala, India" />
        <meta name="geo.position" content="10.1632;77.1624" />
        
        {/* Structured data for accommodation */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Accommodation",
            "name": "Budget Dormitory - Paradise Resort Vattavada",
            "description": "Affordable shared dormitory accommodation perfect for backpackers, solo travelers, and budget-conscious groups seeking mountain adventure.",
            "url": "https://paradisevattavada.com/dormitory",
            "image": [
              "https://paradisevattavada.com/images/dormitory-exterior.webp",
              "https://paradisevattavada.com/images/dormitory-interior.webp"
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
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "Shared Bathroom",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification", 
                "name": "Mountain Views",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Common Area",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Budget Friendly",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Backpacker Friendly",
                "value": true
              }
            ],
            "occupancy": {
              "@type": "QuantitativeValue",
              "maxValue": 8
            },
            "priceRange": "₹",
            "telephone": "+91-9074902424",
            "isPartOf": {
              "@type": "Resort",
              "name": "Paradise Resort Vattavada",
              "url": "https://www.paradisevattavada.com"
            }
          })}
        </script>
      </Helmet>
      
      {/* Schema.org structured data for dormitory */}
      <FAQSchema faqs={dormitoryFAQs} />
      <OfferSchema offers={dormitoryOffers} />

      <div className="container mx-auto px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Budget Dormitory
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Budget Dormitory Stay in Vattavada</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Affordable and comfortable dormitory accommodation perfect for backpackers, solo travelers, and budget-conscious groups. Experience the beauty of Vattavada without breaking the bank.
            </p>
          </div>
        </div>
      </div>
      
      <RoomDetails />
      <Amenities />
      <Gallery />
      <Contact />
    </>
  );
};

export default DormitoryPage;
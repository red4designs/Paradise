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
      answer: "Our budget dormitory stay includes 8 bunk beds accommodating up to 16 guests, shared bathroom facilities, free WiFi, 24/7 hot water, and access to all resort amenities. Perfect budget stay in Vattavada option."
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
      description: "Special rates for backpackers and solo travelers seeking affordable budget stay in Vattavada with shared accommodation and social atmosphere.",
      price: "600",
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
        <title>Budget Dormitory Stay Vattavada | Paradise Resort Backpacker Accommodation</title>
        <meta name="description" content="Affordable dormitory accommodation at Paradise Resort Vattavada. Perfect for backpackers, solo travelers & groups. Clean, comfortable beds with mountain views near Munnar Kerala." />
        <meta name="keywords" content="budget dormitory Vattavada, backpacker accommodation Vattavada, cheap stay Vattavada, dormitory near Munnar, budget stay in Vattavada, hostel Vattavada, solo traveler accommodation, group stay Vattavada" />
        <link rel="canonical" href="https://www.paradisevattavada.com/dormitory" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Budget Dormitory Stay Vattavada | Paradise Resort Backpacker Accommodation" />
        <meta property="og:description" content="Affordable dormitory accommodation at Paradise Resort Vattavada. Perfect for backpackers, solo travelers & groups. Clean, comfortable beds with mountain views." />
        <meta property="og:url" content="https://www.paradisevattavada.com/dormitory" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:title" content="Budget Dormitory Stay Vattavada | Paradise Resort Backpacker Accommodation" />
        <meta name="twitter:description" content="Affordable dormitory accommodation at Paradise Resort Vattavada. Perfect for backpackers, solo travelers & groups. Clean, comfortable beds with mountain views." />
        
        {/* Structured Data for Dormitory */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Accommodation",
            "name": "Budget Dormitory - Paradise Resort Vattavada",
            "description": "Clean and comfortable dormitory accommodation perfect for backpackers, solo travelers, and budget-conscious groups visiting Vattavada.",
            "url": "https://www.paradisevattavada.com/dormitory",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Vattavada",
              "addressLocality": "Munnar",
              "addressRegion": "Kerala",
              "postalCode": "685565",
              "addressCountry": "IN"
            },
            "amenityFeature": [
              {"@type": "LocationFeatureSpecification", "name": "Shared Bathroom"},
              {"@type": "LocationFeatureSpecification", "name": "Mountain View"},
              {"@type": "LocationFeatureSpecification", "name": "Common Area"},
              {"@type": "LocationFeatureSpecification", "name": "Budget Friendly"}
            ],
            "occupancy": {
              "@type": "QuantitativeValue",
              "maxValue": 8
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
            <h1 className="text-4xl font-bold mb-4">Budget Dormitory Stay in Vattavada</h1>
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
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
import { Home, Building } from 'lucide-react';

const CottagesPage = () => {
  // Cottage-specific FAQs
  const cottageFAQs = [
    {
      question: "What is included in the private cottage at Paradise Resort Vattavada?",
      answer: "Our private cottage includes 3 bedrooms with 6 double cots, full kitchen with dining area, hall, shared bathroom facilities, free WiFi, 24/7 hot water, and can accommodate up to 18 guests comfortably."
    },
    {
      question: "Is the cottage suitable for large families?",
      answer: "Yes, our homestay cottage in Vattavada is perfect for large families and groups. It offers complete privacy, spacious accommodation for up to 18 guests, and self-catering facilities making it ideal for extended family stays."
    },
    {
      question: "Can we cook our own meals in the cottage?",
      answer: "Absolutely! The private cottage comes with a fully equipped kitchen and dining area, allowing you to prepare your own meals during your homestay in Vattavada experience."
    }
  ];

  // Cottage-specific offers
  const cottageOffers = [
    {
      name: "Private Cottage - Extended Stay Discount",
      description: "Special discount for extended stays in our private cottage, perfect for large families seeking a homestay in Vattavada experience.",
      price: "7000",
      validFrom: "2024-01-01",
      validThrough: "2024-12-31",
      category: "Group Accommodation",
      serviceName: "Private Cottage Extended Stay",
      serviceDescription: "Discounted rates for stays longer than 3 nights in our spacious private cottage"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Private Cottages in Vattavada | Paradise Resort Budget Stay</title>
        <meta name="description" content="Stay in cozy private cottages at Paradise Resort Vattavada. Perfect for couples & families. Enjoy mountain views, campfire & local experiences near Munnar Kerala." />
        <meta name="keywords" content="private cottages Vattavada, 3 bedroom cottages Vattavada, family accommodation Vattavada, cottage stay near Munnar, budget cottages Kerala, homestay in Vattavada, Vattavada trekking stay, cottage with mountain view" />
        <link rel="canonical" href="https://www.paradisevattavada.com/cottages" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Private Cottages in Vattavada | Paradise Resort Budget Stay" />
        <meta property="og:description" content="Stay in cozy private cottages at Paradise Resort Vattavada. Perfect for couples & families. Enjoy mountain views, campfire & local experiences near Munnar Kerala." />
        <meta property="og:url" content="https://www.paradisevattavada.com/cottages" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:title" content="Private Cottages in Vattavada | Paradise Resort Budget Stay" />
        <meta name="twitter:description" content="Stay in cozy private cottages at Paradise Resort Vattavada. Perfect for couples & families. Enjoy mountain views, campfire & local experiences." />
        
        {/* Structured Data for Cottages */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Accommodation",
            "name": "Private Cottages - Paradise Resort Vattavada",
            "description": "Cozy private cottages with 3 bedrooms, perfect for families and couples seeking a peaceful mountain retreat in Vattavada.",
            "url": "https://www.paradisevattavada.com/cottages",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Vattavada",
              "addressLocality": "Munnar",
              "addressRegion": "Kerala",
              "postalCode": "685565",
              "addressCountry": "IN"
            },
            "amenityFeature": [
              {"@type": "LocationFeatureSpecification", "name": "Mountain View"},
              {"@type": "LocationFeatureSpecification", "name": "Shared Bathroom"},
              {"@type": "LocationFeatureSpecification", "name": "3 Bedrooms"},
              {"@type": "LocationFeatureSpecification", "name": "Campfire Area"}
            ],
            "occupancy": {
              "@type": "QuantitativeValue",
              "maxValue": 6
            }
          })}
        </script>
      </Helmet>
      
      {/* Schema.org structured data for cottages */}
      <FAQSchema faqs={cottageFAQs} />
      <OfferSchema offers={cottageOffers} />
      
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
                <Building className="w-4 h-4" />
                Private Cottages
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Private Cottages in Vattavada</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the comfort of home in our cozy private cottages. Perfect for families and couples seeking privacy and tranquility in the heart of Vattavada's stunning landscape.
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

export default CottagesPage;
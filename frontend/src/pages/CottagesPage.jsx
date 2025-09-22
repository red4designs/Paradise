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
        <link rel="canonical" href="https://paradisevattavada.com/cottages" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Private Cottages in Vattavada | Paradise Resort Budget Stay" />
        <meta property="og:description" content="Stay in cozy private cottages at Paradise Resort Vattavada. Perfect for couples & families. Enjoy mountain views, campfire & local experiences near Munnar Kerala." />
        <meta property="og:url" content="https://www.paradisevattavada.com/cottages" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.paradisevattavada.com/images/Cottages/IMG_20250208_122711.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Private Cottages at Paradise Resort Vattavada" />
        <meta property="og:site_name" content="Paradise Resort Vattavada" />
        <meta property="og:locale" content="en_US" />
        
        {/* Enhanced Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Private Cottages in Vattavada | Paradise Resort Budget Stay" />
        <meta name="twitter:description" content="Stay in cozy private cottages at Paradise Resort Vattavada. Perfect for couples & families. Enjoy mountain views, campfire & local experiences near Munnar Kerala." />
        <meta name="twitter:image" content="https://www.paradisevattavada.com/images/Cottages/IMG_20250208_122711.webp" />
        <meta name="twitter:image:alt" content="Private Cottages at Paradise Resort Vattavada" />
        
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
            "name": "Private Cottages - Paradise Resort Vattavada",
            "description": "Spacious private cottages with 3 bedrooms, full kitchen, and mountain views. Perfect for families and groups up to 18 guests.",
            "url": "https://www.paradisevattavada.com/cottages",
            "image": [
              "https://www.paradisevattavada.com/images/Cottages/IMG_20250208_122711.webp",
              "https://www.paradisevattavada.com/images/Cottages/IMG_20241109_151546.webp"
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
                "name": "3 Bedrooms",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification", 
                "name": "Full Kitchen",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Mountain Views",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Free WiFi",
                "value": true
              }
            ],
            "occupancy": {
              "@type": "QuantitativeValue",
              "maxValue": 18
            },
            "priceRange": "₹₹",
            "telephone": "+91-9074902424",
            "isPartOf": {
              "@type": "Resort",
              "name": "Paradise Resort Vattavada",
              "url": "https://www.paradisevattavada.com"
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
            <h2 className="text-4xl font-bold mb-4">Private Cottages in Vattavada</h2>
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
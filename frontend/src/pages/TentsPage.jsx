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
import { Home, Tent } from 'lucide-react';

const TentsPage = () => {
  // Tent-specific FAQs
  const tentFAQs = [
    {
      question: "What is included in the tent stay in Vattavada?",
      answer: "Our tent stay in Vattavada includes premium camping tents with comfortable bedding, campfire facilities, BBQ setup with coal, shared bathroom facilities, free WiFi, and stunning mountain views. Perfect for adventure enthusiasts."
    },
    {
      question: "How many people can stay in each tent?",
      answer: "Each tent can accommodate 2-3 guests (2 adults + 1 child OR 3 adults). We have 8 premium tents available, making it perfect for groups seeking tent stay in Vattavada experience."
    },
    {
      question: "Is tent stay suitable for families with children?",
      answer: "Yes, our tent stay in Vattavada is family-friendly and safe for children. We provide comfortable bedding, nearby bathroom facilities, and supervised campfire activities at our family friendly resort."
    },
    {
      question: "What activities are available during tent stay?",
      answer: "Tent stay guests can enjoy campfire with music, BBQ cooking, stargazing, jeep trekking, nature walks, and easy access to Vattavada trekking trails and scenic viewpoints."
    }
  ];

  // Tent-specific offers
  const tentOffers = [
    {
      name: "Tent Stay Adventure Package - Weekend Special",
      description: "Special weekend package for tent stay in Vattavada including camping, campfire, BBQ, and jeep trekking activities.",
      price: "2500",
      validFrom: "2024-01-01",
      validThrough: "2024-12-31",
      category: "Adventure Tourism",
      serviceName: "Weekend Tent Adventure",
      serviceDescription: "Complete weekend camping experience with adventure activities and meals"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Adventure Tents in Vattavada | Paradise Resort Camping Experience</title>
        <meta name="description" content="Experience adventure camping in luxury tents at Paradise Resort Vattavada. Enjoy mountain views, campfire nights & nature activities near Munnar Kerala." />
        <meta name="keywords" content="adventure tents Vattavada, camping in Vattavada, tent stay near Munnar, glamping Kerala, outdoor accommodation Vattavada, mountain camping, tent with attached bathroom, adventure tourism Vattavada" />
        <link rel="canonical" href="https://www.paradisevattavada.com/tents" />
        
        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Adventure Tents in Vattavada | Paradise Resort Camping Experience" />
        <meta property="og:description" content="Experience adventure camping in luxury tents at Paradise Resort Vattavada. Enjoy mountain views, campfire nights & nature activities near Munnar Kerala." />
        <meta property="og:url" content="https://www.paradisevattavada.com/tents" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.paradisevattavada.com/images/Tents/IMG_3632.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Adventure Tents at Paradise Resort Vattavada" />
        <meta property="og:site_name" content="Paradise Resort Vattavada" />
        <meta property="og:locale" content="en_US" />
        
        {/* Enhanced Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Adventure Tents in Vattavada | Paradise Resort Camping Experience" />
        <meta name="twitter:description" content="Experience adventure camping in luxury tents at Paradise Resort Vattavada. Enjoy mountain views, campfire nights & nature activities near Munnar Kerala." />
        <meta name="twitter:image" content="https://www.paradisevattavada.com/images/Tents/IMG_3632.webp" />
        <meta name="twitter:image:alt" content="Adventure Tents at Paradise Resort Vattavada" />
        
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
            "name": "Adventure Tents - Paradise Resort Vattavada",
            "description": "Luxury adventure tents with attached bathrooms and mountain views. Perfect for couples and adventure enthusiasts seeking a unique camping experience.",
            "url": "https://www.paradisevattavada.com/tents",
            "image": [
              "https://www.paradisevattavada.com/images/Tents/IMG_3632.webp",
              "https://www.paradisevattavada.com/images/Tents/IMG_3629.webp"
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
                "name": "Attached Bathroom",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification", 
                "name": "Mountain Views",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Campfire Area",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Adventure Activities",
                "value": true
              }
            ],
            "occupancy": {
              "@type": "QuantitativeValue",
              "maxValue": 2
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
      
      {/* Schema.org structured data for tents */}
      <FAQSchema faqs={tentFAQs} />
      <OfferSchema offers={tentOffers} />
      
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
                <Tent className="w-4 h-4" />
                Adventure Tents
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Premium Tent Stay in Vattavada</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Embrace the great outdoors with our premium tent accommodation. Perfect for adventure enthusiasts who want to experience nature while enjoying modern comforts and breathtaking mountain views.
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

export default TentsPage;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import RoomDetails from '../components/RoomDetails';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
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
        <title>Camping in Vattavada | Premium Tent Stay Paradise Resort</title>
        <meta name="description" content="Experience premium camping at Paradise Resort Vattavada. Luxury tent accommodation with mountain views, adventure activities & campfire nights. Perfect for adventure lovers near Munnar." />
        <meta name="keywords" content="tent stay in Vattavada, camping in Vattavada, premium tent accommodation, adventure camping Kerala, tent stay near Munnar, Vattavada trekking stay, camping with mountain view, outdoor adventure Vattavada" />
        <link rel="canonical" href="https://www.paradisevattavada.com/tents" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Camping in Vattavada | Premium Tent Stay Paradise Resort" />
        <meta property="og:description" content="Experience premium camping at Paradise Resort Vattavada. Luxury tent accommodation with mountain views, adventure activities & campfire nights. Perfect for adventure lovers." />
        <meta property="og:url" content="https://www.paradisevattavada.com/tents" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:title" content="Camping in Vattavada | Premium Tent Stay Paradise Resort" />
        <meta name="twitter:description" content="Experience premium camping at Paradise Resort Vattavada. Luxury tent accommodation with mountain views, adventure activities & campfire nights." />
        
        {/* Structured Data for Tents */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Accommodation",
            "name": "Premium Tent Stay - Paradise Resort Vattavada",
            "description": "Luxury camping experience with premium tents offering comfort and adventure in the beautiful mountains of Vattavada.",
            "url": "https://www.paradisevattavada.com/tents",
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
              {"@type": "LocationFeatureSpecification", "name": "Campfire Area"},
              {"@type": "LocationFeatureSpecification", "name": "Adventure Activities"},
              {"@type": "LocationFeatureSpecification", "name": "Trekking Access"}
            ],
            "occupancy": {
              "@type": "QuantitativeValue",
              "maxValue": 4
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
            <h1 className="text-4xl font-bold mb-4">Premium Tent Stay in Vattavada</h1>
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
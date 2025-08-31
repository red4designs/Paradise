import React from 'react';
import { Helmet } from 'react-helmet-async';

const OfferSchema = ({ offers }) => {
  const offerSchemas = offers.map(offer => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": offer.name,
    "description": offer.description,
    "price": offer.price,
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "validFrom": offer.validFrom,
    "validThrough": offer.validThrough,
    "category": offer.category,
    "seller": {
      "@type": "Organization",
      "name": "Paradise Resort Vattavada",
      "url": "https://paradise-resort-vattavada.netlify.app",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Vattavada",
        "addressLocality": "Munnar",
        "addressRegion": "Kerala",
        "postalCode": "685565",
        "addressCountry": "IN"
      }
    },
    "itemOffered": {
      "@type": "Service",
      "name": offer.serviceName,
      "description": offer.serviceDescription,
      "provider": {
        "@type": "Organization",
        "name": "Paradise Resort Vattavada"
      }
    },
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": offer.price,
      "priceCurrency": "INR",
      "valueAddedTaxIncluded": true
    }
  }));

  return (
    <Helmet>
      {offerSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default OfferSchema;

// Common offers for Paradise Resort Vattavada
export const currentOffers = [
  {
    name: "Homestay in Vattavada - Family Package",
    description: "Special family package for homestay in Vattavada including accommodation, meals, and activities for families at our family friendly resort.",
    price: "3500",
    validFrom: "2024-01-01",
    validThrough: "2024-12-31",
    category: "Accommodation",
    serviceName: "Family Homestay Package",
    serviceDescription: "Complete family accommodation with meals and activities at Paradise Resort Vattavada"
  },
  {
    name: "Tent Stay in Vattavada - Adventure Package",
    description: "Premium tent stay in Vattavada with camping experience, campfire, BBQ, and jeep trekking for adventure enthusiasts.",
    price: "2000",
    validFrom: "2024-01-01",
    validThrough: "2024-12-31",
    category: "Adventure Tourism",
    serviceName: "Adventure Tent Stay",
    serviceDescription: "Complete camping experience with premium tents and adventure activities"
  },
  {
    name: "Budget Stay in Vattavada - Dormitory Special",
    description: "Affordable budget stay in Vattavada with dormitory accommodation, perfect for backpackers and budget travelers.",
    price: "800",
    validFrom: "2024-01-01",
    validThrough: "2024-12-31",
    category: "Budget Accommodation",
    serviceName: "Budget Dormitory Stay",
    serviceDescription: "Affordable shared accommodation with all basic amenities"
  },
  {
    name: "Vattavada Trekking Stay - Complete Package",
    description: "Complete Vattavada trekking stay package including accommodation, guided treks, meals, and transportation to trekking spots.",
    price: "4500",
    validFrom: "2024-01-01",
    validThrough: "2024-12-31",
    category: "Adventure Tourism",
    serviceName: "Trekking Stay Package",
    serviceDescription: "Complete trekking experience with accommodation, guides, and transportation"
  },
  {
    name: "Private Cottage - Group Booking Offer",
    description: "Special offer for private cottage booking at our resort near Vattavada, perfect for large families and groups up to 18 guests.",
    price: "8000",
    validFrom: "2024-01-01",
    validThrough: "2024-12-31",
    category: "Group Accommodation",
    serviceName: "Private Cottage Rental",
    serviceDescription: "Spacious 3-bedroom cottage with kitchen and dining facilities for large groups"
  }
];
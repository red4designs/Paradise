import React from 'react';
import { Helmet } from 'react-helmet-async';

const EventSchema = ({ events }) => {
  const eventSchemas = events.map(event => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": {
      "@type": "Place",
      "name": "Paradise Resort Vattavada",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Vattavada",
        "addressLocality": "Munnar",
        "addressRegion": "Kerala",
        "postalCode": "685565",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "10.0889",
        "longitude": "77.0595"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Paradise Resort Vattavada",
      "url": "https://paradise-resort-vattavada.netlify.app"
    },
    "offers": event.offers ? {
      "@type": "Offer",
      "price": event.offers.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": event.offers.validFrom,
      "validThrough": event.offers.validThrough
    } : undefined,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
  }));

  return (
    <Helmet>
      {eventSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default EventSchema;

// Common events for Paradise Resort Vattavada
export const seasonalEvents = [
  {
    name: "Vattavada Trekking Season - Peak Mountain Views",
    description: "Experience the best trekking season in Vattavada with clear mountain views, perfect weather for outdoor activities, and premium tent stay options.",
    startDate: "2024-10-01",
    endDate: "2024-03-31",
    offers: {
      price: "1500",
      validFrom: "2024-10-01",
      validThrough: "2024-03-31"
    }
  },
  {
    name: "Family Friendly Resort Special - Summer Holidays",
    description: "Special family packages at our family friendly resort in Vattavada with activities for children, campfire nights, and comfortable homestay accommodation.",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    offers: {
      price: "2000",
      validFrom: "2024-04-01",
      validThrough: "2024-06-30"
    }
  },
  {
    name: "Budget Stay Monsoon Offer - Vattavada Retreat",
    description: "Enjoy budget stay in Vattavada during monsoon season with lush green landscapes, cozy indoor activities, and special monsoon packages.",
    startDate: "2024-06-01",
    endDate: "2024-09-30",
    offers: {
      price: "1200",
      validFrom: "2024-06-01",
      validThrough: "2024-09-30"
    }
  }
];
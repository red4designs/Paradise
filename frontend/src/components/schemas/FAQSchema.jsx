import React from 'react';
import { Helmet } from 'react-helmet-async';

const FAQSchema = ({ faqs }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default FAQSchema;

// Common FAQ data for Paradise Resort Vattavada
export const commonFAQs = [
  {
    question: "What accommodation options are available at Paradise Resort Vattavada?",
    answer: "We offer three types of accommodation: Resort rooms (Deluxe and Double rooms, plus Dormitory), Private 3-bedroom cottage for up to 18 guests, and Tent stay with 8 premium tents for camping enthusiasts. All options include free WiFi and hot water."
  },
  {
    question: "Is Paradise Resort Vattavada family friendly?",
    answer: "Yes, Paradise Resort Vattavada is a family friendly resort perfect for families with children. We offer safe accommodations, 24/7 care, spacious rooms, and family-oriented activities like campfire, BBQ, and jeep trekking."
  },
  {
    question: "What is the location of Paradise Resort Vattavada?",
    answer: "Paradise Resort is located just 1.5 km from Vattavada town, 7 km from Top Station, and near Pampadum Shola National Park. We offer breathtaking valley views up to 5 km on clear days."
  },
  {
    question: "What activities are available for Vattavada trekking stay?",
    answer: "We offer jeep trekking adventures through scenic mountain trails, campfire with music, BBQ facilities, and easy access to nearby trekking spots like Top Station and Pampadum Shola National Park."
  },
  {
    question: "Is Paradise Resort a budget stay option in Vattavada?",
    answer: "Yes, we offer budget stay options in Vattavada including dormitory accommodation and affordable tent stay packages. Our homestay in Vattavada provides excellent value with all essential amenities."
  },
  {
    question: "How can I book a tent stay in Vattavada?",
    answer: "You can book tent stay in Vattavada by contacting us via WhatsApp at +91 9074902424. We have 8 premium tents accommodating 2-3 guests each, perfect for camping enthusiasts and adventure seekers."
  },
  {
    question: "What makes Paradise Resort the best homestay in Vattavada?",
    answer: "Our homestay in Vattavada offers warm family hospitality, strategic location near Vattavada town, multiple accommodation options, 24/7 service, free WiFi, hot water, and stunning mountain views in a safe environment."
  },
  {
    question: "What amenities are included in the stay?",
    answer: "All stays include free WiFi, 24/7 hot water supply, campfire facilities, BBQ setup with coal, jeep trekking options, valley views, and round-the-clock assistance. Private cottage includes full kitchen and dining area."
  }
];
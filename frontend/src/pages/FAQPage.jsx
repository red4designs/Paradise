import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ - Paradise Resort Vattavada | Frequently Asked Questions</title>
        <meta name="description" content="Find answers to frequently asked questions about Paradise Resort Vattavada. Learn about our accommodations, amenities, booking process, and policies." />
        <meta name="keywords" content="Paradise Resort FAQ, Vattavada questions, Munnar resort information, booking FAQ, resort policies" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="FAQ - Paradise Resort Vattavada" />
        <meta property="og:description" content="Find answers to frequently asked questions about Paradise Resort Vattavada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://paradiseresort.in/faq" />
        <meta property="og:image" content="https://paradiseresort.in/paradise-resort-faq.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Paradise Resort Vattavada" />
        <meta name="twitter:description" content="Find answers to frequently asked questions about Paradise Resort Vattavada." />
        <meta name="twitter:image" content="https://paradiseresort.in/paradise-resort-faq.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Paradise Resort Vattavada FAQ",
            "description": "Frequently asked questions about Paradise Resort Vattavada",
            "url": "https://paradiseresort.in/faq",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the check-in and check-out times?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request."
                }
              },
              {
                "@type": "Question",
                "name": "What amenities are included?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer free WiFi, parking, mountain views, restaurant, room service, and various outdoor activities."
                }
              },
              {
                "@type": "Question",
                "name": "Is parking available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide free parking for all guests."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      
      <main className="pt-24">
        <FAQ />
      </main>
    </>
  );
};

export default FAQPage;
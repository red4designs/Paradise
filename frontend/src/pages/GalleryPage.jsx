import React from 'react';
import { Helmet } from 'react-helmet-async';
import VirtualScrollGallery from '../components/VirtualScrollGallery';

const GalleryPage = () => {
  return (
    <>
      <Helmet>
        <title>Photo Gallery - Paradise Resort Vattavada | Scenic Mountain Views</title>
        <meta name="description" content="Explore our stunning photo gallery showcasing the natural beauty of Paradise Resort Vattavada. View our cottages, tents, dormitory, and breathtaking mountain landscapes in Munnar." />
        <meta name="keywords" content="Paradise Resort gallery, Vattavada photos, Munnar resort images, mountain resort pictures, Kerala hill station gallery" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Photo Gallery - Paradise Resort Vattavada" />
        <meta property="og:description" content="Explore our stunning photo gallery showcasing the natural beauty of Paradise Resort Vattavada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.paradisevattavada.com/gallery" />
        <meta property="og:image" content="https://www.paradisevattavada.com/paradise-resort-gallery.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Paradise Resort Gallery - Beautiful photos of our resort" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.paradisevattavada.com/paradise-resort-gallery.jpg" />
        <meta name="twitter:image:alt" content="Paradise Resort Gallery - Beautiful photos of our resort" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Paradise Resort Vattavada Photo Gallery",
            "description": "Photo gallery showcasing Paradise Resort Vattavada's accommodations and scenic mountain views",
            "url": "https://www.paradisevattavada.com/gallery",
            "mainEntity": {
              "@type": "Resort",
              "name": "Paradise Resort Vattavada",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Vattavada",
                "addressLocality": "Munnar",
                "addressRegion": "Kerala",
                "postalCode": "685565",
                "addressCountry": "IN"
              }
            }
          })}
        </script>
      </Helmet>
      
      <main className="pt-24">
        <VirtualScrollGallery />
      </main>
    </>
  );
};

export default GalleryPage;
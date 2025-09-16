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
        <meta property="og:url" content="https://paradiseresort.in/gallery" />
        <meta property="og:image" content="https://paradiseresort.in/paradise-resort-gallery.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Photo Gallery - Paradise Resort Vattavada" />
        <meta name="twitter:description" content="Explore our stunning photo gallery showcasing the natural beauty of Paradise Resort Vattavada." />
        <meta name="twitter:image" content="https://paradiseresort.in/paradise-resort-gallery.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Paradise Resort Vattavada Photo Gallery",
            "description": "Photo gallery showcasing Paradise Resort Vattavada's accommodations and scenic mountain views",
            "url": "https://paradiseresort.in/gallery",
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
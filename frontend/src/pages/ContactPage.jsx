import React from 'react';
import { getCanonicalUrl } from '../constants/seo';
import { Helmet } from 'react-helmet-async';
const Contact = React.lazy(() => import('../components/Contact'));
import Gallery from '../components/Gallery';
import FAQSchema from '../components/schemas/FAQSchema';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Home, Phone } from 'lucide-react';

const ContactPage = () => {
  // Contact-specific FAQs
  const contactFAQs = [
    {
      question: "How can I book a stay at Paradise Resort Vattavada?",
      answer: "You can book your stay by contacting us via WhatsApp at +91 9074902424, calling us directly, or filling out our online contact form. We respond quickly to all booking inquiries."
    },
    {
      question: "What is the location and how to reach Paradise Resort Vattavada?",
      answer: "Paradise Resort is located in Vattavada, just 1.5 km from Vattavada town and 7 km from Top Station. We can arrange transportation and provide detailed directions upon booking."
    },
    {
      question: "What are the check-in and check-out timings?",
      answer: "Standard check-in time is 2:00 PM and check-out is 11:00 AM. However, we can accommodate flexible timings based on availability and prior arrangement."
    },
    {
      question: "Do you provide pickup and drop services?",
      answer: "Yes, we can arrange pickup and drop services from nearby locations. Please contact us in advance to arrange transportation to our family friendly resort in Vattavada."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash payments, bank transfers, and digital payments. Advance booking confirmation can be done through online payment methods."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Paradise Resort Vattavada | Book Your Stay Near Munnar Kerala</title>
        <meta name="description" content="Contact Paradise Resort Vattavada for bookings & inquiries. Call +91-9074902424 or visit us in Vattavada near Munnar. Best rates guaranteed for your mountain getaway." />
        <meta name="keywords" content="contact Paradise Resort Vattavada, book resort Vattavada, Paradise Resort phone number, Vattavada resort booking, contact resort near Munnar, Paradise Resort address, Vattavada accommodation booking, resort contact Kerala" />
        <link rel="canonical" href={getCanonicalUrl("/contact")} />

        {/* Enhanced Open Graph tags */}
        <meta property="og:title" content="Contact Paradise Resort Vattavada | Book Your Stay Near Munnar Kerala" />
        <meta property="og:description" content="Contact Paradise Resort Vattavada for bookings & inquiries. Call +91-9074902424 or visit us in Vattavada near Munnar. Best rates guaranteed for your mountain getaway." />
        <meta property="og:url" content="https://www.paradisevattavada.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.paradisevattavada.com/images/resort-contact.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Contact Paradise Resort Vattavada" />
        <meta property="og:site_name" content="Paradise Resort Vattavada" />
        <meta property="og:locale" content="en_US" />

        {/* Enhanced Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Paradise Resort Vattavada | Book Your Stay Near Munnar Kerala" />
        <meta name="twitter:description" content="Contact Paradise Resort Vattavada for bookings & inquiries. Call +91-9074902424 or visit us in Vattavada near Munnar. Best rates guaranteed for your mountain getaway." />
        <meta name="twitter:image" content="https://www.paradisevattavada.com/images/resort-contact.webp" />
        <meta name="twitter:image:alt" content="Contact Paradise Resort Vattavada" />

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Vattavada, Kerala, India" />
        <meta name="geo.position" content="10.1632;77.1624" />

        {/* Structured data for local business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Resort",
            "name": "Paradise Resort Vattavada",
            "description": "Premium resort in Vattavada offering cottages, tents, and dormitory accommodation with stunning mountain views near Munnar.",
            "url": "https://www.paradisevattavada.com/contact",
            "image": [
              "https://www.paradisevattavada.com/images/resort-contact.webp",
              "https://www.paradisevattavada.com/images/resort-exterior.webp"
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
            "telephone": "+91-9074902424",
            "email": "info@paradisevattavada.com",
            "priceRange": "₹₹",
            "openingHours": "Mo-Su 00:00-23:59",
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "Mountain Views",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Adventure Activities",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Campfire Area",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Multiple Accommodation Types",
                "value": true
              }
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9074902424",
              "contactType": "reservations",
              "availableLanguage": ["English", "Hindi", "Malayalam"]
            }
          })}
        </script>

        {/* FAQ Schema for Contact Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How can I book a room at Paradise Resort Vattavada?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can book a room by calling us at +91 9074902424, sending a WhatsApp message, or filling out our contact form. We offer cottages, tent stays, and dormitory accommodation."
                }
              },
              {
                "@type": "Question",
                "name": "What is the contact number for Paradise Resort Vattavada?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our contact number is +91 9074902424. You can call or WhatsApp us for bookings and inquiries."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Paradise Resort Vattavada located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Paradise Resort Vattavada is located in Vattavada, near Munnar, Kerala 685565. We are situated in the beautiful hill station with stunning mountain views."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 pt-20">
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
                <Phone className="w-4 h-4" />
                Contact Us
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Schema.org structured data for contact */}
      <FAQSchema faqs={contactFAQs} />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Contact Paradise Resort Vattavada</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to experience paradise? Get in touch with us for bookings, inquiries, and information about our accommodation options. We're here to help make your Vattavada getaway unforgettable.
            </p>
          </div>
        </div>
      </div>

      <Contact />
      <Gallery />
    </>
  );
};

export default ContactPage;
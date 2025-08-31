import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
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
        <title>Contact Paradise Resort Vattavada | Book Your Stay in Kerala</title>
        <meta name="description" content="Contact Paradise Resort Vattavada for bookings and inquiries. Call +91 9074902424 or WhatsApp us. Located in Vattavada near Munnar, Kerala. Best rates guaranteed for your mountain getaway." />
        <meta name="keywords" content="contact Paradise Resort Vattavada, book resort Vattavada, Paradise Resort booking, Vattavada resort contact number, resort near Munnar contact, Kerala hill station booking, Vattavada accommodation booking" />
        <link rel="canonical" href="https://www.paradisevattavada.com/contact" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Contact Paradise Resort Vattavada | Book Your Stay in Kerala" />
        <meta property="og:description" content="Contact Paradise Resort Vattavada for bookings and inquiries. Call +91 9074902424 or WhatsApp us. Located in Vattavada near Munnar, Kerala. Best rates guaranteed." />
        <meta property="og:url" content="https://www.paradisevattavada.com/contact" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:title" content="Contact Paradise Resort Vattavada | Book Your Stay in Kerala" />
        <meta name="twitter:description" content="Contact Paradise Resort Vattavada for bookings and inquiries. Call +91 9074902424 or WhatsApp us. Located in Vattavada near Munnar, Kerala." />
        
        {/* Structured Data for Contact */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Paradise Resort Vattavada",
            "description": "Get in touch with Paradise Resort Vattavada for bookings, inquiries, and information about our accommodation options in Kerala's beautiful hill station.",
            "url": "https://www.paradisevattavada.com/contact",
            "mainEntity": {
              "@type": "LodgingBusiness",
              "name": "Paradise Resort Vattavada",
              "telephone": "+91-9074902424",
              "email": "info@paradisevattavada.com",
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
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "₹₹"
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
            <h1 className="text-4xl font-bold mb-4">Contact Paradise Resort Vattavada</h1>
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
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ArrivalGuidePage = () => {
  return (
    <>
      <Helmet>
        <title>Arrival Guide - Paradise Resort Vattavada</title>
        <meta name="description" content="How to reach Paradise Resort Vattavada. Travel directions, nearest landmarks, and contact details for assistance." />
        <link rel="canonical" href="https://www.paradisevattavada.com/arrival-guide" />
        <meta property="og:title" content="Arrival Guide - Paradise Resort Vattavada" />
        <meta property="og:description" content="Find directions and travel tips to reach Paradise Resort Vattavada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.paradisevattavada.com/arrival-guide" />
        <meta property="og:image" content="https://www.paradisevattavada.com/images/resort-social-share.jpg" />
      </Helmet>

      <div className="min-h-screen bg-transparent">
        <div className="container mx-auto px-4 py-12">
          <h1 className="heading-1 mb-4">Arrival Guide</h1>
          <p className="text-muted-foreground mb-8">
            Plan your journey to Paradise Resort Vattavada. Find the best routes, nearby landmarks, and helpful tips.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <section>
              <h2 className="heading-3 mb-2">By Road</h2>
              <p className="text-muted-foreground">
                From Munnar, drive towards Koviloor and proceed to Vattavada. Follow signs to Paradise Resort.
                Roads are scenic with hairpin bends—drive carefully.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-2">Nearest Landmarks</h2>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Munnar Town</li>
                <li>Koviloor Junction</li>
                <li>Vattavada Village Center</li>
              </ul>
            </section>

            <section className="md:col-span-2">
              <h2 className="heading-3 mb-2">Assistance</h2>
              <p className="text-muted-foreground">
                If you need help with directions, call or message us via the Contact page.
              </p>
              <a href="/contact" className="inline-block mt-4 px-6 py-2 bg-brand-primary text-white rounded">
                Contact & Location
              </a>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArrivalGuidePage;


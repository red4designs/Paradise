import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '../constants/seo';
import { MapPin, Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hi! Inquiry from ${formData.name || 'Website Visitor'}.
Phone: ${formData.phone || 'Not provided'}
Message: ${formData.message || 'General inquiry'}`;

    window.open(`https://wa.me/919074902424?text=${encodeURIComponent(text)}`, '_blank');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="bg-sand min-h-screen pt-24 pb-32">
      <Helmet>
        <title>Contact Us | Paradise Resort Vattavada</title>
        <meta name="description" content="Reach out to plan your stay at Paradise Resort Vattavada. Minimalist comfort meets untamed nature." />
        <link rel="canonical" href={`${BASE_URL}/contact`} />
      </Helmet>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 fade-in-up">
        <span className="uppercase tracking-[0.2em] text-xs font-medium text-forest/60 block mb-4">Connect</span>
        <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">Reach <span className="italic font-light">Out</span></h1>
        <p className="text-lg text-forest/70 font-light max-w-2xl mx-auto">
          Contact us to check availability or curate your personalized mountain experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-16 lg:gap-24 fade-in-up" style={{ animationDelay: '0.1s' }}>
        
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-12 flex flex-col justify-center">
          <div>
            <h3 className="font-serif text-2xl text-forest mb-6">Direct Access</h3>
            <p className="text-forest/70 font-light leading-relaxed mb-8 text-sm">
              We recommend booking directly through WhatsApp for the quickest response, customized itineraries, and the best available rates.
            </p>
            
            <div className="space-y-6 text-forest/80 text-sm">
              <div className="flex items-start gap-4">
                <MapPin className="text-eucalyptus mt-1 shrink-0" size={20} strokeWidth={1.5} />
                <div>
                  <strong className="block font-medium text-forest mb-1">Location</strong>
                  Vattavada, Kerala<br />
                  1.5 km from Vattavada town center
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-eucalyptus mt-1 shrink-0" size={20} strokeWidth={1.5} />
                <div>
                  <strong className="block font-medium text-forest mb-1">Phone</strong>
                  <a href="tel:9074902424" className="hover:text-forest transition-colors block">+91 90749 02424</a>
                  <a href="tel:8848019414" className="hover:text-forest transition-colors block">+91 88480 19414</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-eucalyptus mt-1 shrink-0" size={20} strokeWidth={1.5} />
                <div>
                  <strong className="block font-medium text-forest mb-1">Email</strong>
                  <a href="mailto:info@paradisevattavada.com" className="hover:text-forest transition-colors">info@paradisevattavada.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form & Reviews */}
        <div className="md:col-span-3 flex flex-col gap-12">
          
          {/* Recent Stays Reviews */}
          <div>
            <h3 className="font-serif text-2xl text-forest mb-6">Recent Stays</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-forest/5 p-6 border border-forest/10">
                 <div className="flex text-forest text-xs mb-3">★★★★★</div>
                 <p className="text-forest/80 font-light italic text-sm leading-relaxed mb-3">
                   "Booking was so seamless. The staff arranged our jeep safari perfectly. Can't wait to come back!"
                 </p>
                 <div className="text-[10px] uppercase tracking-[0.2em] text-forest/60 font-medium">— Elena R.</div>
              </div>
              <div className="bg-forest/5 p-6 border border-forest/10 hidden sm:block">
                 <div className="flex text-forest text-xs mb-3">★★★★★</div>
                 <p className="text-forest/80 font-light italic text-sm leading-relaxed mb-3">
                   "A hidden gem. We booked the private cottage directly through here and it was the perfect escape."
                 </p>
                 <div className="text-[10px] uppercase tracking-[0.2em] text-forest/60 font-medium">— Michael B.</div>
              </div>
            </div>
          </div>

          <div className="bg-sand p-8 border border-forest/10 shadow-sm relative">
             {isSubmitted ? (
                <div className="absolute inset-0 bg-sand/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-10 transition-all">
                  <span className="w-16 h-16 bg-forest/5 text-forest rounded-full flex items-center justify-center mb-6">
                    <MessageCircle size={32} strokeWidth={1.5} />
                  </span>
                  <h4 className="font-serif text-2xl text-forest mb-2">Message Prepared</h4>
                  <p className="text-forest/70 font-light text-sm">Redirecting you to WhatsApp to complete your request.</p>
                </div>
             ) : null}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-forest/60 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-forest/20 py-3 text-forest focus:outline-none focus:border-forest"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-forest/60 font-medium">WhatsApp No.</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-forest/20 py-3 text-forest focus:outline-none focus:border-forest"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-forest/60 font-medium">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-forest/20 py-3 text-forest focus:outline-none focus:border-forest min-h-[120px] resize-y"
                  required
                />
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-3 bg-forest text-sand py-5 text-sm uppercase tracking-widest font-medium hover:bg-forest/90 transition-all group">
                Send via WhatsApp
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
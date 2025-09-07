import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Navigation,
  Send,
  CheckCircle
} from 'lucide-react';
import { mockData, bookingOptions } from '../data/mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accommodation: '',
    adults: '',
    children: '',
    rooms: '',
    checkIn: '',
    checkOut: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        accommodation: '',
        adults: '',
        children: '',
        rooms: '',
        checkIn: '',
        checkOut: '',
        message: ''
      });
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsApp = () => {
    const totalGuests = (parseInt(formData.adults) || 0) + (parseInt(formData.children) || 0);
    const accommodationLabel = bookingOptions.accommodationTypes.find(acc => acc.value === formData.accommodation)?.label || 'Not specified';
    let roomsText = '';
    if (formData.rooms && formData.accommodation !== 'dormitory' && formData.accommodation !== 'cottage') {
      const unitName = formData.accommodation === 'tent' ? 'Tents' : 'Rooms';
      roomsText = `\nNumber of ${unitName}: ${formData.rooms}`;
    }
    
    const message = `Hi! I would like to inquire about Paradise Resort Vattavada. Here are my details:

Name: ${formData.name || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Accommodation: ${accommodationLabel}${roomsText}
Adults: ${formData.adults || '0'}
Children: ${formData.children || '0'}
Total Guests: ${totalGuests}
Check-in: ${formData.checkIn || 'Not specified'}
Check-out: ${formData.checkOut || 'Not specified'}
Message: ${formData.message || 'General inquiry'}

Please check availability and let me know. Thank you!`;
    window.open(`https://wa.me/919074902424?text=${encodeURIComponent(message)}`, '_blank');
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        accommodation: '',
        adults: '',
        children: '',
        checkIn: '',
        checkOut: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="section-padding bg-background transition-colors duration-300">
      <div className="max-width-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">📱 Book Your Homestay in Vattavada - Check Availability</h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Ready to experience our family friendly resort in Vattavada? 🏔️ Check availability for budget stay in Vattavada, 
            tent stay in Vattavada, or Vattavada trekking stay directly through WhatsApp for the fastest response. 💬
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <Card className="bg-white/5 border-white/25">
              <CardHeader className="p-6 pb-4">
                <h3 className="heading-3">📝 Send Us a Message</h3>
                <p className="body-medium text-text-secondary">
                  Fill out the form below and we'll get back to you within 24 hours. ⏰
                </p>
              </CardHeader>
              
              <CardContent className="p-6 pt-2">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} className="text-brand-primary mx-auto mb-4" />
                    <h4 className="heading-3 text-brand-primary mb-2">Message Sent!</h4>
                    <p className="body-medium text-text-secondary">
                      Thank you for your inquiry. We'll contact you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleWhatsApp(); }} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="body-small text-text-primary mb-2 block">Full Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-white/10 border-white/25 text-white placeholder:text-white/50"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="body-small text-text-primary mb-2 block">Phone Number *</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-white/10 border-white/25 text-white placeholder:text-white/50"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="body-small text-text-primary mb-2 block">Email Address</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white/10 border-white/25 text-white placeholder:text-white/50"
                        placeholder="Enter email address"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Accommodation Type</label>
                        <Select onValueChange={(value) => { handleInputChange('accommodation', value); handleInputChange('rooms', ''); }}>
                          <SelectTrigger className="bg-white/10 border-white/25 text-white">
                            <SelectValue placeholder="Choose accommodation" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-white/25">
                            {bookingOptions.accommodationTypes.map((option) => (
                              <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="body-small text-text-primary">Adults (Above 6 years)</label>
                          <Select onValueChange={(value) => handleInputChange('adults', value)}>
                            <SelectTrigger className="bg-white/10 border-white/25 text-white">
                              <SelectValue placeholder="Select adults" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-white/25">
                              {[...Array(50)].map((_, i) => (
                                <SelectItem key={i+1} value={(i+1).toString()} className="text-white hover:bg-white/10">
                                  {i+1} Adult{i > 0 ? 's' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="body-small text-text-primary">Children (Below 6 years)</label>
                          <Select onValueChange={(value) => handleInputChange('children', value)}>
                            <SelectTrigger className="bg-white/10 border-white/25 text-white">
                              <SelectValue placeholder="Select children" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-white/25">
                              <SelectItem value="0" className="text-white hover:bg-white/10">
                                No Children
                              </SelectItem>
                              {[...Array(10)].map((_, i) => (
                                <SelectItem key={i+1} value={(i+1).toString()} className="text-white hover:bg-white/10">
                                  {i+1} Child{i > 0 ? 'ren' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>



                    {/* Number of Rooms/Tents */}
                    {formData.accommodation && formData.accommodation !== 'dormitory' && formData.accommodation !== 'cottage' && (
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">
                          {formData.accommodation === 'tent' ? 'Number of Tents' : 'Number of Rooms'}
                        </label>
                        <Select onValueChange={(value) => handleInputChange('rooms', value)}>
                          <SelectTrigger className="bg-white/10 border-white/25 text-white">
                            <SelectValue placeholder={formData.accommodation === 'tent' ? 'Select number of tents' : 'Select number of rooms'} />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-white/25">
                            {bookingOptions.getRoomOptions(formData.accommodation).map((option) => (
                              <SelectItem key={option.value} value={option.value.toString()} className="text-white hover:bg-white/10">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Check-in Date</label>
                        <Input
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) => handleInputChange('checkIn', e.target.value)}
                          className="bg-white/10 border-white/25 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Check-out Date</label>
                        <Input
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) => handleInputChange('checkOut', e.target.value)}
                          className="bg-white/10 border-white/25 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="body-small text-text-primary">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="bg-white/10 border-white/25 text-white placeholder:text-white/50 min-h-[120px]"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="space-y-3">
                      <Button type="submit" className="w-full btn-primary">
                        <MessageCircle size={18} />
                        Check Availability on WhatsApp
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <Card className="bg-white/5 border-white/25">
              <CardContent className="p-6">
                <h3 className="heading-3 mb-6">📞 Direct Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center">
                      <Phone size={24} className="text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="heading-3 mb-1">Phone</h4>
                      <p className="body-medium text-text-secondary mb-2">Call us anytime for instant booking</p>
                      <div className="space-y-1">
                        <a href="tel:9074902424" className="body-medium text-brand-primary hover:underline block" onClick={() => window.gtag_report_conversion && window.gtag_report_conversion('tel:9074902424')}>
                  +91 90749 02424
                </a>
                <a href="tel:8848019414" className="body-medium text-brand-primary hover:underline block" onClick={() => window.gtag_report_conversion && window.gtag_report_conversion('tel:8848019414')}>
                  +91 8848019414 (David)
                </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center">
                      <MessageCircle size={24} className="text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="heading-3 mb-1">WhatsApp</h4>
                      <p className="body-medium text-text-secondary mb-2">Quick responses and easy booking</p>
                      <button 
                        onClick={() => window.open('https://wa.me/919074902424', '_blank')}
                        className="body-medium text-brand-primary hover:underline"
                      >
                        +91 90749 02424
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center">
                      <Clock size={24} className="text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="heading-3 mb-1">Response Time</h4>
                      <p className="body-medium text-text-secondary">We respond within 1-2 hours during business hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card className="bg-white/5 border-white/25">
              <CardContent className="p-6">
                <h3 className="heading-3 mb-6">Location & Directions</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center">
                      <MapPin size={24} className="text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="heading-3 mb-1">Address</h4>
                      <p className="body-medium text-text-secondary">
                        Paradise Resort Vattavada<br />
                        Vattavada, Kerala<br />
                        1.5 km from Vattavada town
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center">
                      <Navigation size={24} className="text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="heading-3 mb-1">Nearby Attractions</h4>
                      <ul className="body-small text-text-secondary space-y-1">
                        <li>• Top Station - 7 km</li>
                        <li>• Pampadum Shola National Park - 7 km</li>
                        <li>• Vattavada Town - 1.5 km</li>
                        <li>• Munnar - 45 km</li>
                      </ul>
                    </div>
                  </div>

                  {/* Google Maps Embed */}
                  <div className="aspect-video bg-white/10 border border-white/20 overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0!2d77.059723!3d10.089167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0799c4c8b8c8c8%3A0x1234567890abcdef!2sVattavada%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Paradise Resort Vattavada Location"
                    ></iframe>
                  </div>

                  <a 
                    href="https://maps.app.goo.gl/d6nAeYRU4LsuvpHY8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full btn-secondary inline-flex items-center justify-center gap-2"
                  >
                    <Navigation size={18} />
                    Get Directions on Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-brand-primary/10 to-transparent border border-brand-primary/30 p-8 max-w-2xl mx-auto">
            <h3 className="heading-2 mb-4">Ready for Your Mountain Adventure?</h3>
            <p className="body-medium text-text-secondary mb-6">
              Don't wait! Contact us today and start planning your unforgettable Vattavada experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:9074902424" className="btn-primary" onClick={() => window.gtag_report_conversion && window.gtag_report_conversion('tel:9074902424')}>
              <Phone size={18} />
              Call Now
            </a>
              <button onClick={() => window.open('https://wa.me/919074902424', '_blank')} className="btn-secondary">
                <MessageCircle size={18} />
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
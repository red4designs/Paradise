import React, { useState } from 'react';
import { Calendar, Users, MapPin, Star, ChevronRight } from 'lucide-react';
import LazyImage from './ui/LazyImage';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockData, bookingOptions } from '../data/mock';

const Hero = () => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '',
    children: '',
    accommodation: '',
    rooms: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message with booking details
    const totalGuests = (parseInt(bookingData.adults) || 0) + (parseInt(bookingData.children) || 0);
    const accommodationLabel = bookingOptions.accommodationTypes.find(acc => acc.value === bookingData.accommodation)?.label || 'Not specified';
    let roomsText = '';
    if (bookingData.rooms && bookingData.accommodation !== 'dormitory' && bookingData.accommodation !== 'cottage') {
      const unitName = bookingData.accommodation === 'tent' ? 'Tents' : 'Rooms';
      roomsText = `\nNumber of ${unitName}: ${bookingData.rooms}`;
    }
    
    const message = `Hi! I would like to book a stay at Paradise Resort Vattavada. Here are my booking details:

Check-in Date: ${bookingData.checkIn || 'Not selected'}
Check-out Date: ${bookingData.checkOut || 'Not selected'}
Adults: ${bookingData.adults || '0'}
Children: ${bookingData.children || '0'}
Total Guests: ${totalGuests}
Accommodation Type: ${accommodationLabel}${roomsText}

Please confirm availability and provide pricing details. Thank you!`;
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/919074902424?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form after sending
    setBookingData({
      checkIn: '',
      checkOut: '',
      adults: '',
      children: '',
      accommodation: '',
      rooms: ''
    });
  };

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden">
      {/* Enhanced Nature Hill Background Image */}
      <div className="absolute inset-0">
        <LazyImage 
          src="/images/Views/IMG_20241109_174229_optimized.webp" 
          alt="Breathtaking Vattavada Hill Station Mountain Views - Paradise Resort" 
          className="w-full h-full object-cover"
          loading="eager"
          enableSharing={true}
          shareTitle="Paradise Resort Vattavada - Breathtaking Mountain Views"
          shareDescription="Experience the stunning beauty of Vattavada Hill Station at Paradise Resort - Premium budget accommodation with breathtaking mountain views near Munnar"
        />
        {/* Gradient overlay for better readability and depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        {/* Additional nature-themed overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-5"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px),
              repeating-linear-gradient(-90deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 pt-24 px-[7.6923%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-6rem)]">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 border border-white/25">
                <Star className="w-4 h-4 text-brand-primary" />
                <span className="body-small text-text-primary">🏆 Best Budget Stay in Vattavada</span>
              </div>

              {/* Main Heading - SEO Optimized */}
              <header className="space-y-4">
                <h1 className="display-huge">
                  Paradise Resort Vattavada | Best Budget Stay in Vattavada Munnar
                </h1>
                <p className="body-large text-text-secondary max-w-lg">
                  Discover the perfect vattavada stay offering luxury cottages, adventure tents, and family-friendly accommodations. 
                  Experience the best stay in vattavada located 7km from Top Station with breathtaking mountain views and premium amenities. Book your perfect Kerala hill station getaway today! 🏔️
                </p>
              </header>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-primary"></div>
                  <span className="body-medium">🏠 Homestay in Vattavada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-primary"></div>
                  <span className="body-medium">⛺ Tent Stay in Vattavada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-primary"></div>
                  <span className="body-medium">🔥 Campfire & BBQ</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-primary"></div>
                  <span className="body-medium">🚗 Vattavada Trekking Stay</span>
                </div>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin size={18} className="text-brand-primary" />
                <span className="body-medium">📍 7 km from Top Station & Pampadum Shola National Park</span>
              </div>
            </div>

            {/* Right Content - Booking Card */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md bg-white/5 border-white/25 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="heading-2 text-text-primary mb-2">Book Your Stay</h3>
                      <p className="body-small text-text-muted">Reserve your perfect mountain getaway</p>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      {/* Check-in Date */}
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Check-in Date</label>
                        <Input
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                          className="bg-white/10 border-white/25 text-white placeholder:text-white/50"
                          required
                        />
                      </div>

                      {/* Check-out Date */}
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Check-out Date</label>
                        <Input
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                          className="bg-white/10 border-white/25 text-white placeholder:text-white/50"
                          required
                        />
                      </div>

                      {/* Adults Count */}
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Adults (Above 6 years)</label>
                        <Select onValueChange={(value) => setBookingData({...bookingData, adults: value})}>
                          <SelectTrigger className="bg-white/10 border-white/25 text-white">
                            <SelectValue placeholder="Select number of adults" />
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

                      {/* Children Count */}
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Children (Below 6 years)</label>
                        <Select onValueChange={(value) => setBookingData({...bookingData, children: value})}>
                          <SelectTrigger className="bg-white/10 border-white/25 text-white">
                            <SelectValue placeholder="Select number of children" />
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

                      {/* Accommodation Type */}
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Accommodation Type</label>
                        <Select onValueChange={(value) => setBookingData({...bookingData, accommodation: value, rooms: ''})}>
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

                      {/* Number of Rooms/Tents */}
                      {bookingData.accommodation && bookingData.accommodation !== 'dormitory' && bookingData.accommodation !== 'cottage' && (
                        <div className="space-y-2">
                          <label className="body-small text-text-primary">
                            {bookingData.accommodation === 'tent' ? 'Number of Tents' : 'Number of Rooms'}
                          </label>
                          <Select onValueChange={(value) => setBookingData({...bookingData, rooms: value})}>
                            <SelectTrigger className="bg-white/10 border-white/25 text-white">
                              <SelectValue placeholder={bookingData.accommodation === 'tent' ? 'Select number of tents' : 'Select number of rooms'} />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-white/25">
                              {bookingOptions.getRoomOptions(bookingData.accommodation).map((option) => (
                                <SelectItem key={option.value} value={option.value.toString()} className="text-white hover:bg-white/10">
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <Button type="submit" className="w-full btn-primary">
                        Check Availability
                        <ChevronRight size={18} />
                      </Button>
                    </form>

                    <div className="text-center">
                      <p className="body-small text-text-muted">
                        Need help? <a href="tel:9074902424" className="text-brand-primary hover:underline">Call us now</a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
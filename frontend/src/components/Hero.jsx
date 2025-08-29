import React, { useState } from 'react';
import { Calendar, Users, MapPin, Star, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockData, bookingOptions } from '../data/mock';

const Hero = () => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
    accommodation: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Booking request submitted! We will contact you shortly.');
    console.log('Booking data:', bookingData);
  };

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden">
      {/* Nature Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1612441804231-77a36b284856?w=1920&q=80" 
          alt="Vattavada Mountain Landscape" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>
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
                <span className="body-small text-text-primary">Best Budget Stay in Vattavada</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="display-huge">
                  🏔️ Paradise Resort
                  <span className="block text-brand-primary">Vattavada ✨</span>
                </h1>
                <p className="body-large text-text-secondary max-w-lg">
                  Experience breathtaking mountain views 🌄 and peaceful surroundings in our family-run resort. 
                  Safe, comfortable accommodations just 1.5 km from Vattavada town. 🏡
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-primary"></div>
                  <span className="body-medium">🏠 Private Cottages</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-primary"></div>
                  <span className="body-medium">⛺ Adventure Tents</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-primary"></div>
                  <span className="body-medium">🔥 Campfire & BBQ</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-primary"></div>
                  <span className="body-medium">🚗 Jeep Trekking</span>
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

                      {/* Guest Count */}
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Number of Guests</label>
                        <Select onValueChange={(value) => setBookingData({...bookingData, guests: value})}>
                          <SelectTrigger className="bg-white/10 border-white/25 text-white">
                            <SelectValue placeholder="Select guest count" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-white/25">
                            {bookingOptions.guestCounts.map((option) => (
                              <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Accommodation Type */}
                      <div className="space-y-2">
                        <label className="body-small text-text-primary">Accommodation Type</label>
                        <Select onValueChange={(value) => setBookingData({...bookingData, accommodation: value})}>
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

                      <Button type="submit" className="w-full btn-primary">
                        Check Availability
                        <ChevronRight size={18} />
                      </Button>
                    </form>

                    <div className="text-center">
                      <p className="body-small text-text-muted">
                        Need help? <a href="tel:8296979749" className="text-brand-primary hover:underline">Call us now</a>
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
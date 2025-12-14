import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import {
  Home,
  Tent,
  Users,
  Bed,
  Wifi,
  Car,
  Coffee,
  Mountain,
  Camera,
  Utensils,
  Shield,
  Heart,
  Star,
  MapPin,
  Phone,
  Clock,
  Zap,
  Droplets,
  Wind,
  Sun,
  Moon,
  TreePine,
  Fish,
  Binoculars,
  Compass,
  Backpack,
  ChefHat,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import LazyImage from './ui/LazyImage';
import PerformanceOptimizer from './PerformanceOptimizer';
import YouTubeFacade from './facades/YouTubeFacade';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';

const OptimizedRoomDetails = () => {
  const [activeTab, setActiveTab] = useState('resort');
  const { debounce, scheduleIdleTask } = usePerformanceOptimization();

  // Memoize tabs data
  const tabs = useMemo(() => [
    { id: 'resort', label: 'Resort Rooms', icon: Home },
    { id: 'cottage', label: 'Private Cottages', icon: Home },
    { id: 'tent', label: 'Adventure Tents', icon: Tent }
  ], []);

  // Memoize accommodation options
  const accommodationOptions = useMemo(() => ({
    resort: {
      title: 'Premium Resort Rooms',
      subtitle: 'Comfortable & Budget-Friendly',
      description: 'Experience comfort and affordability in our well-appointed resort rooms. Perfect for families and couples seeking a peaceful retreat with modern amenities.',
      image: '/images/Deluxe Room/IMG_1701_optimized.webp',
      rooms: [
        {
          type: 'Deluxe Room',
          capacity: 'Max 6 guests',
          beds: '1 Queen size + 1 Double size cot',
          features: ['Extra bed available for extra charges', 'Non AC room', 'Private bathroom', 'Free WiFi', 'Hot water'],
          icon: Bed
        },
        {
          type: 'Double Room',
          capacity: 'Up to 2 guests',
          beds: 'Comfortable double bed',
          features: ['Cozy interiors', 'Private bathroom', 'Garden views', 'Hot water'],
          icon: Heart
        },
        {
          type: 'Dormitory',
          capacity: 'Max 16 pax',
          beds: 'Bunk beds',
          features: ['Not private bathroom', 'Free WiFi', 'Hot water', 'Rs. 500 per head min. 8 pax'],
          icon: Users
        }
      ]
    },
    cottage: {
      title: 'Private Cottages',
      subtitle: '3-Bedroom Family Haven',
      description: 'Enjoy complete privacy in our spacious 3-bedroom cottages. Perfect for large families or groups seeking a home-away-from-home experience.',
      image: '/images/Cottages/IMG_20250208_122711.webp',
      features: [
        {
          title: '3 Spacious Bedrooms',
          description: 'Comfortable bedrooms with quality mattresses and linens',
          icon: Bed,
          color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-secondary))]/10'
        },
        {
          title: 'Full Kitchen Access',
          description: 'Cook your own meals with our fully equipped kitchen',
          icon: ChefHat,
          color: 'from-[hsl(var(--brand-secondary))]/10 to-[hsl(var(--brand-primary))]/10'
        },
        {
          title: 'Private Living Area',
          description: 'Relax in your own living space with family and friends',
          icon: Home,
          color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-accent))]/10'
        },
        {
          title: 'Mountain View Balcony',
          description: 'Enjoy stunning views from your private balcony',
          icon: Mountain,
          color: 'from-[hsl(var(--brand-secondary))]/10 to-[hsl(var(--brand-accent))]/10'
        }
      ]
    },
    tent: {
      title: 'Adventure Tents',
      subtitle: 'Glamping Experience',
      description: 'Experience the thrill of camping with the comfort of a hotel. Our premium tents offer a unique glamping experience.',
      image: '/images/Tents/IMG_3632.JPEG',
      specs: {
        capacity: '20+ guests',
        perTent: '2-3 guests'
      },
      highlights: [
        {
          title: 'Weather-Resistant',
          description: 'High-quality tents designed for all weather conditions',
          icon: Shield,
          color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-accent))]/10'
        },
        {
          title: 'Comfortable Bedding',
          description: 'Quality mattresses and bedding for a good night\'s sleep',
          icon: Bed,
          color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-secondary))]/10'
        },
        {
          title: 'Shared Facilities',
          description: 'Clean washrooms and common areas nearby',
          icon: Users,
          color: 'from-[hsl(var(--brand-secondary))]/10 to-[hsl(var(--brand-primary))]/10'
        },
        {
          title: 'Campfire Area',
          description: 'Enjoy evening campfires and stargazing',
          icon: Sun,
          color: 'from-[hsl(var(--brand-secondary))]/10 to-[hsl(var(--brand-accent))]/10'
        }
      ]
    }
  }), []);

  // Memoize common experiences
  const commonExperiences = useMemo(() => [
    {
      icon: Mountain,
      title: 'Breathtaking Mountain Views',
      description: 'Wake up to stunning panoramic views of the Western Ghats',
      color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-secondary))]/10'
    },
    {
      icon: TreePine,
      title: 'Nature Walks & Trekking',
      description: 'Explore scenic trails and discover hidden waterfalls',
      color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-accent))]/10'
    },
    {
      icon: Camera,
      title: 'Photography Paradise',
      description: 'Capture Instagram-worthy shots at every corner',
      color: 'from-[hsl(var(--brand-secondary))]/10 to-[hsl(var(--brand-primary))]/10'
    },
    {
      icon: Coffee,
      title: 'Tea Plantation Visits',
      description: 'Experience the famous tea gardens of Vattavada',
      color: 'from-[hsl(var(--brand-secondary))]/10 to-[hsl(var(--brand-accent))]/10'
    },
    {
      icon: Star,
      title: 'Stargazing Nights',
      description: 'Clear mountain skies perfect for astronomy enthusiasts',
      color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-secondary))]/10'
    },
    {
      icon: Wind,
      title: 'Fresh Mountain Air',
      description: 'Breathe in the pure, unpolluted air of the hills',
      color: 'from-[hsl(var(--brand-accent))]/10 to-[hsl(var(--brand-primary))]/10'
    },
    {
      icon: Utensils,
      title: 'Local Kerala Cuisine',
      description: 'Taste authentic flavors prepared with local ingredients',
      color: 'from-[hsl(var(--brand-secondary))]/10 to-[hsl(var(--brand-primary))]/10',
      extra: true
    },
    {
      icon: ChefHat,
      title: 'BBQ Set with Coal',
      description: 'Complete BBQ setup for delicious outdoor cooking experiences',
      color: 'from-[hsl(var(--brand-secondary))]/10 to-[hsl(var(--brand-primary))]/10',
      extra: true
    },
    {
      icon: Car,
      title: 'Jeep Trekking Adventures',
      description: 'Guided off-road adventures through scenic mountain trails',
      color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-secondary))]/10',
      extra: true
    },
    {
      icon: Wifi,
      title: 'Free WiFi & Hot Water',
      description: 'Stay connected with complimentary WiFi and 24/7 hot water supply',
      color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-secondary))]/10'
    }
  ], []);

  // Optimized tab change handler
  const handleTabChange = useCallback(
    debounce((tabId) => {
      scheduleIdleTask(() => {
        setActiveTab(tabId);
      });
    }, 100),
    [debounce, scheduleIdleTask]
  );

  // Render only active tab content to reduce DOM size
  const renderActiveTabContent = useCallback(() => {
    const currentOption = accommodationOptions[activeTab];

    if (activeTab === 'resort') {
      return (
        <div className="space-y-8">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-[4/3] lg:aspect-auto">
                  <YouTubeFacade
                    videoId="UwGLRFeFBOk"
                    title="Paradise Resort Vattavada - Premium Resort Rooms Tour"
                    className="w-full h-full"
                    aspectRatio="aspect-[4/3] lg:aspect-auto"
                    startTime={6}
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[hsl(var(--primary))] flex items-center justify-center rounded-xl">
                      <Home size={24} className="text-[hsl(var(--primary-foreground))]" />
                    </div>
                    <div>
                      <h2 className="display-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">🏨 {currentOption.title}</h2>
                      <h3 className="heading-3 text-gray-200 font-semibold">{currentOption.subtitle}</h3>
                    </div>
                  </div>
                  <p className="body-large text-gray-100 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {currentOption.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Types Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {currentOption.rooms.map((room, index) => {
              const IconComponent = room.icon;
              return (
                <div key={index} className="p-6 bg-gradient-to-br from-[hsl(var(--brand-primary))]/5 to-[hsl(var(--brand-secondary))]/5 border border-[hsl(var(--border))] rounded-lg hover:border-[hsl(var(--primary))] group transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[hsl(var(--primary)_/_0.2)] flex items-center justify-center rounded-lg group-hover:bg-[hsl(var(--primary)_/_0.3)] transition-colors">
                      <IconComponent size={20} className="text-[hsl(var(--primary))]" />
                    </div>
                    <h3 className="heading-3 text-white font-bold">{room.type}</h3>
                  </div>

                  <div className="mb-4">
                    <p className="body-medium text-[hsl(var(--primary))] font-medium mb-1">{room.capacity}</p>
                    <p className="body-small text-[hsl(var(--muted-foreground))]">{room.beds}</p>
                  </div>

                  <div className="space-y-2">
                    {room.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[hsl(var(--primary))] rounded-full" />
                        <span className="body-small text-[hsl(var(--muted-foreground))]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeTab === 'cottage') {
      return (
        <div className="space-y-8">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-[4/3] lg:aspect-auto">
                  <LazyImage
                    src="/images/Cottages/IMG_20250208_122711.webp"
                    alt="Private cottages in Vattavada - 3 bedroom family accommodation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[hsl(var(--primary))] flex items-center justify-center rounded-xl">
                      <Home size={24} className="text-[hsl(var(--primary-foreground))]" />
                    </div>
                    <div>
                      <h3 className="display-medium text-[hsl(var(--primary))]">🏡 {currentOption.title}</h3>
                      <p className="heading-3 text-[hsl(var(--muted-foreground))]">{currentOption.subtitle}</p>
                    </div>
                  </div>
                  <p className="body-large text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {currentOption.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cottage Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {currentOption.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className={`bg-gradient-to-br ${feature.color} border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] group`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[hsl(var(--primary)_/_0.2)] flex items-center justify-center rounded-xl group-hover:bg-[hsl(var(--primary)_/_0.3)] transition-colors">
                        <IconComponent size={24} className="text-[hsl(var(--primary))]" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="heading-3 text-[hsl(var(--foreground))]">{feature.title}</h4>
                        <p className="body-medium text-[hsl(var(--muted-foreground))]">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeTab === 'tent') {
      return (
        <div className="space-y-8">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-[4/3] lg:aspect-auto">
                  <LazyImage
                    src={currentOption.image}
                    alt="Camping in Vattavada - premium tent accommodation for adventure lovers"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    enableSharing={true}
                    shareTitle="Premium Tent Stay - Paradise Resort Vattavada"
                    shareDescription="Adventure camping experience at Paradise Resort Vattavada - Premium tent accommodation with mountain views for nature lovers"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[hsl(var(--primary))] flex items-center justify-center rounded-xl">
                      <Tent size={24} className="text-[hsl(var(--primary-foreground))]" />
                    </div>
                    <div>
                      <h3 className="display-medium text-[hsl(var(--primary))]">⛺ {currentOption.title}</h3>
                      <p className="heading-3 text-[hsl(var(--muted-foreground))]">{currentOption.subtitle}</p>
                    </div>
                  </div>
                  <p className="body-large text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                    {currentOption.description}
                  </p>

                  {/* Tent Specs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="body-small text-[hsl(var(--muted-foreground))]">Total Capacity</p>
                      <p className="body-medium text-[hsl(var(--primary))] font-medium">{currentOption.specs.capacity}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="body-small text-[hsl(var(--muted-foreground))]">Per Tent</p>
                      <p className="body-medium text-[hsl(var(--primary))] font-medium">{currentOption.specs.perTent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tent Highlights Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {currentOption.highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className={`bg-gradient-to-br ${highlight.color} border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] group`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[hsl(var(--primary)_/_0.2)] flex items-center justify-center rounded-xl group-hover:bg-[hsl(var(--primary)_/_0.3)] transition-colors">
                        <IconComponent size={24} className="text-[hsl(var(--primary))]" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="heading-3 text-[hsl(var(--foreground))]">{highlight.title}</h4>
                        <p className="body-medium text-[hsl(var(--muted-foreground))]">{highlight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  }, [activeTab, accommodationOptions]);

  return (
    <section
      id="room-details"
      className="section-padding bg-black"
    >
      <div className="max-width-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large text-[hsl(var(--primary))] mb-6">
            Homestay in Vattavada - Stay Options at Paradise Resort
          </h2>
          <p className="heading-3 text-[hsl(var(--muted-foreground))] max-w-4xl mx-auto leading-relaxed">
            Discover the perfect homestay in Vattavada for your trip! Our family friendly resort in Vattavada offers
            tent stay in Vattavada, budget stay options, and Vattavada trekking stay accommodations for families,
            couples, and adventure seekers. All stays include Free WiFi in this peaceful resort near Vattavada.
          </p>
        </div>

        {/* Optimized Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-[hsl(var(--card)_/_0.5)] backdrop-blur-sm border border-[hsl(var(--border))] rounded-2xl p-2 inline-flex gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    relative px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3
                    ${activeTab === tab.id
                      ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary)_/_0.25)]'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card)_/_0.5)]'
                    }
                  `}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-primary/20 to-transparent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area - Only Active Tab Rendered */}
        <PerformanceOptimizer>
          <div className="space-y-12">
            {/* Active Tab Content Only */}
            <div className="min-h-[600px]">
              {renderActiveTabContent()}
            </div>

            {/* Common Experiences Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="display-medium text-[hsl(var(--primary))] mb-4">✨ Common Experiences for All Guests</h3>
                <p className="heading-3 text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
                  Every stay includes these amazing experiences that make Paradise Resort Vattavada truly special
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commonExperiences.map((experience, index) => {
                  const IconComponent = experience.icon;
                  return (
                    <Card key={index} className={`bg-gradient-to-br ${experience.color} border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] group relative overflow-hidden`}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[hsl(var(--primary)_/_0.2)] flex items-center justify-center rounded-xl group-hover:bg-[hsl(var(--primary)_/_0.3)] transition-colors">
                              <IconComponent size={24} className="text-[hsl(var(--primary))]" />
                            </div>
                            {experience.extra && (
                              <div className="px-2 py-1 bg-[hsl(var(--primary)_/_0.2)] rounded-full">
                                <span className="body-small text-[hsl(var(--primary))] font-medium">Extra Charge</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h4 className="heading-3 text-[hsl(var(--foreground))]">{experience.title}</h4>
                            <p className="body-medium text-[hsl(var(--muted-foreground))] leading-relaxed">{experience.description}</p>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)_/_0.05)] to-transparent opacity-0 group-hover:opacity-100" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <Card className="bg-gradient-to-r from-[hsl(var(--primary)_/_0.1)] to-transparent border-[hsl(var(--primary)_/_0.3)] max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="display-medium text-[hsl(var(--primary))] mb-4">Ready to Book Your Perfect Stay?</h3>
                  <p className="body-large text-[hsl(var(--muted-foreground))] mb-6">
                    Choose your ideal accommodation and create unforgettable memories at Paradise Resort Vattavada
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                      Book Now
                      <ArrowRight size={18} />
                    </a>
                    <button
                      onClick={() => {
                        const message = encodeURIComponent('Hi! I would like to know more about the room options at Paradise Resort Vattavada.');
                        window.open(`https://wa.me/919074902424?text=${message}`, '_blank');
                      }}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <MessageCircle size={18} />
                      Ask Questions
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </PerformanceOptimizer>
      </div>
    </section>
  );
};

export default OptimizedRoomDetails;
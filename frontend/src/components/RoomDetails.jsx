import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import {
  Home,
  Mountain,
  Tent,
  Users,
  Bed,
  Wifi,
  Car,
  Music,
  Flame,
  ChefHat,
  Eye,
  Star,
  ArrowRight,
  MessageCircle,
  Droplets
} from 'lucide-react';
import LazyImage from './ui/LazyImage';
import YouTubeFacade from './facades/YouTubeFacade';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';
import { useWorkerManager } from '../utils/workerManager';
import PerformanceOptimizer from './PerformanceOptimizer';

const RoomDetails = ({ initialTab = 'resort' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [processedData, setProcessedData] = useState(null);
  const [isProcessingData, setIsProcessingData] = useState(false);
  const { batchDOMUpdates, scheduleIdleTask } = usePerformanceOptimization();
  const workerManager = useWorkerManager();

  // Raw tabs data
  const tabsRaw = useMemo(() => [
    { id: 'resort', label: 'Resort Rooms', icon: Home },
    { id: 'cottage', label: 'Private Cottage', icon: Home },
    { id: 'tent', label: 'Tent Stay', icon: Tent }
  ], []);

  // Optimized tab change handler
  const handleTabChange = useCallback((tabId) => {
    batchDOMUpdates(() => {
      setActiveTab(tabId);
    });
  }, [batchDOMUpdates]);

  // Process accommodation data with web worker
  useEffect(() => {
    if (workerManager && !processedData) {
      setIsProcessingData(true);

      const rawData = {
        accommodations: accommodationOptionsRaw,
        experiences: commonExperiencesRaw,
        tabs: tabsRaw
      };

      workerManager.filterData(rawData, { optimize: true }, 'accommodation')
        .then(result => {
          setProcessedData(result.results);
          setIsProcessingData(false);
        })
        .catch(error => {
          console.warn('Data processing failed, using fallback:', error);
          setProcessedData(rawData);
          setIsProcessingData(false);
        });
    }
  }, [workerManager, processedData]);

  // Raw accommodation options data
  const accommodationOptionsRaw = useMemo(() => ({
    resort: {
      id: 'resort',
      title: 'Premium Resort Rooms - Best Vattavada Stay Accommodation in Kerala',
      subtitle: 'Perfect Stay in Vattavada - Family-Friendly Mountain Resort Near Munnar',
      image: '/images/Views/IMG_1701_optimized.webp',
      description: 'Experience premium hospitality at our family friendly resort offering the perfect vattavada stay with well-appointed rooms featuring modern amenities and stunning mountain views. The ideal stay in vattavada for families and couples.',
      rooms: [
        {
          type: 'Deluxe Room',
          icon: Bed,
          capacity: 'Max 6 guests',
          beds: '1 Queen size + 1 Double size cot',
          features: ['Extra bed available for extra charges', 'Non AC room', 'Private bathroom', 'Free WiFi', 'Hot water'],
          color: 'from-[hsl(var(--brand-primary))]/20 to-[hsl(var(--brand-secondary))]/20'
        },
        {
          type: 'Double Room',
          icon: Bed,
          capacity: '2–3 guests',
          beds: '1 Double cot',
          features: ['Cozy atmosphere', '1 extra bed only', 'Garden view', 'Private bathroom'],
          color: 'from-[hsl(var(--brand-accent))]/20 to-[hsl(var(--brand-primary))]/20'
        },
        {
          type: 'Dormitory',
          icon: Users,
          capacity: 'Max 16 pax',
          beds: 'Bunk beds',
          features: ['Not private bathroom', 'Free WiFi', 'Hot water', 'Rs. 500 per head min. 8 pax'],
          color: 'from-[hsl(var(--brand-secondary))]/20 to-[hsl(var(--brand-primary))]/20'
        }
      ]
    },
    cottage: {
      id: 'cottage',
      title: 'Private Cottages - Homestay in Vattavada',
      subtitle: 'Ultimate Privacy for Families',
      image: `/images/Cottages/IMG_20250208_122711.jpg?v=${Date.now()}`,
      description: 'Enjoy complete privacy in our spacious 3-bedroom homestay in Vattavada cottage, perfect for large families seeking comfort at this family friendly resort in Vattavada.',
      features: [
        {
          icon: Home,
          title: '3 Bedrooms',
          description: 'Each with 2 double cots (total 6 double cots)',
          color: 'from-[hsl(var(--brand-primary))]/20 to-[hsl(var(--brand-accent))]/20'
        },
        {
          icon: Users,
          title: 'Up to 18 Guests',
          description: 'Spacious accommodation with extra bed options',
          color: 'from-[hsl(var(--brand-secondary))]/20 to-[hsl(var(--brand-primary))]/20'
        },
        {
          icon: ChefHat,
          title: 'Full Kitchen',
          description: 'Complete kitchen with dining area for self-catering',
          color: 'from-[hsl(var(--brand-secondary))]/20 to-[hsl(var(--brand-accent))]/20'
        },
        {
          icon: Home,
          title: 'Living Spaces',
          description: 'Includes hall, dining area, and private spaces',
          color: 'from-[hsl(var(--brand-primary))]/20 to-[hsl(var(--brand-secondary))]/20'
        },
        {
          icon: Droplets,
          title: 'Shared Bathroom',
          description: 'Common bathroom facilities for guests',
          color: 'from-[hsl(var(--brand-accent))]/20 to-[hsl(var(--brand-primary))]/20'
        }
      ]
    },
    tent: {
      id: 'tent',
      title: 'Tent Stay in Vattavada',
      subtitle: 'Adventure & Vattavada Trekking Stay',
      image: '/images/Tents/tent-new-1.jpg',
      description: 'Embrace the wilderness with our premium tent stay in Vattavada experience, perfect for Vattavada trekking stay with comfort under the stars and breathtaking mountain views.',
      specs: {
        totalTents: 8,
        capacity: '24 guests total',
        perTent: '2 + 1 guests (2 adults + 1 child OR 3 adults)',
        experience: 'Perfect for camping enthusiasts and adventure seekers'
      },
      highlights: [
        {
          icon: Tent,
          title: 'Premium Tents',
          description: '8 well-equipped tents with comfortable bedding',
          color: 'from-[hsl(var(--brand-primary))]/20 to-[hsl(var(--brand-accent))]/20'
        },
        {
          icon: Mountain,
          title: 'Mountain Views',
          description: 'Wake up to stunning valley and mountain vistas',
          color: 'from-[hsl(var(--brand-secondary))]/20 to-[hsl(var(--brand-primary))]/20'
        },
        {
          icon: Star,
          title: 'Stargazing',
          description: 'Clear night skies perfect for astronomical observations',
          color: 'from-[hsl(var(--brand-secondary))]/20 to-[hsl(var(--brand-accent))]/20'
        },
        {
          icon: Droplets,
          title: 'Shared Bathrooms',
          description: 'Clean shared bathroom facilities near the campsite',
          color: 'from-[hsl(var(--brand-primary))]/20 to-[hsl(var(--brand-secondary))]/20'
        }
      ]
    }
  }), []);

  // Use processed data or fallback to raw data
  const accommodationOptions = processedData?.accommodations || accommodationOptionsRaw;

  // Raw common experiences data
  const commonExperiencesRaw = useMemo(() => [
    {
      icon: Eye,
      title: 'Breathtaking Valley Views',
      description: 'Up to 5 km visibility on clear days with panoramic mountain vistas',
      color: 'from-[hsl(var(--brand-primary))]/10 to-[hsl(var(--brand-accent))]/10'
    },
    {
      icon: Flame,
      title: 'Campfire with Music',
      description: 'Magical evenings around the fire with music and storytelling',
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

  // Use processed data or fallback to raw data
  const tabs = processedData?.tabs || tabsRaw;

  // Use processed data or fallback to raw data
  const commonExperiences = processedData?.experiences || commonExperiencesRaw;

  return (
    <section
      id="room-details"
      className="section-padding bg-transparent"
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

        {/* Futuristic Tab Navigation */}
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

        {/* Content Area */}
        <div className="space-y-12">
          {/* Active Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'resort' && (
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
                            <h3 className="display-medium text-[hsl(var(--primary))]">🏨 {accommodationOptions.resort.title}</h3>
                            <p className="heading-3 text-[hsl(var(--muted-foreground))]">{accommodationOptions.resort.subtitle}</p>
                          </div>
                        </div>
                        <p className="body-large text-[hsl(var(--muted-foreground))] leading-relaxed">
                          {accommodationOptions.resort.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Room Types Grid - Optimized DOM Structure */}
                <PerformanceOptimizer>
                  <div className="grid md:grid-cols-3 gap-6">
                    {accommodationOptions.resort.rooms.map((room, index) => {
                      const IconComponent = room.icon;
                      return (
                        <div key={index} className={`p-6 bg-gradient-to-br ${room.color} border border-[hsl(var(--border))] rounded-lg hover:border-[hsl(var(--primary))] group transition-colors`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[hsl(var(--primary)_/_0.2)] flex items-center justify-center rounded-lg group-hover:bg-[hsl(var(--primary)_/_0.3)] transition-colors">
                              <IconComponent size={20} className="text-[hsl(var(--primary))]" />
                            </div>
                            <h4 className="heading-3 text-[hsl(var(--foreground))]">{room.type}</h4>
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
                </PerformanceOptimizer>
              </div>
            )}

            {activeTab === 'cottage' && (
              <div className="space-y-8">
                {/* Header Card */}
                <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="aspect-[4/3] lg:aspect-auto">
                        <img
                          src={accommodationOptions.cottage.image}
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
                            <h3 className="display-medium text-[hsl(var(--primary))]">🏡 {accommodationOptions.cottage.title}</h3>
                            <p className="heading-3 text-[hsl(var(--muted-foreground))]">{accommodationOptions.cottage.subtitle}</p>
                          </div>
                        </div>
                        <p className="body-large text-[hsl(var(--muted-foreground))] leading-relaxed">
                          {accommodationOptions.cottage.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cottage Features Grid with Time Slicing */}
                <PerformanceOptimizer>
                  <div className="grid md:grid-cols-2 gap-6">
                    {accommodationOptions.cottage.features.map((feature, index) => {
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
                </PerformanceOptimizer>
              </div>
            )}

            {activeTab === 'tent' && (
              <div className="space-y-8">
                {/* Header Card */}
                <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="aspect-[4/3] lg:aspect-auto">
                        <LazyImage
                          src={accommodationOptions.tent.image}
                          alt="Camping in Vattavada - premium tent accommodation for adventure lovers"
                          className="w-full h-full"
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
                            <h3 className="display-medium text-[hsl(var(--primary))]">⛺ {accommodationOptions.tent.title}</h3>
                            <p className="heading-3 text-[hsl(var(--muted-foreground))]">{accommodationOptions.tent.subtitle}</p>
                          </div>
                        </div>
                        <p className="body-large text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                          {accommodationOptions.tent.description}
                        </p>

                        {/* Tent Specs */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="body-small text-[hsl(var(--muted-foreground))]">Total Capacity</p>
                            <p className="body-medium text-[hsl(var(--primary))] font-medium">{accommodationOptions.tent.specs.capacity}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="body-small text-[hsl(var(--muted-foreground))]">Per Tent</p>
                            <p className="body-medium text-[hsl(var(--primary))] font-medium">{accommodationOptions.tent.specs.perTent}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tent Highlights Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {accommodationOptions.tent.highlights.map((highlight, index) => {
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
            )}
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
      </div>
    </section>
  );
};

export default RoomDetails;
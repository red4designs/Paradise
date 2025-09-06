import React from 'react';
import { Card, CardContent } from './ui/card';
import { MapPin, Clock, Star, Camera, Mountain, Car, Coffee, Users } from 'lucide-react';
import PerformanceOptimizer from './PerformanceOptimizer';

const TravelGuide = () => {
  const attractions = [
    {
      id: 1,
      name: "Top Station",
      distance: "7 km from Paradise Resort",
      time: "15 minutes drive",
      description: "Famous viewpoint offering panoramic views of the Western Ghats and Tamil Nadu plains. Best visited during sunrise for breathtaking mountain vistas.",
      highlights: ["Sunrise views", "Photography", "Mountain scenery", "Cool climate"],
      icon: Mountain
    },
    {
      id: 2,
      name: "Vattavada Village",
      distance: "1.5 km from Paradise Resort",
      time: "5 minutes walk",
      description: "Charming hill station village known for vegetable farming and pleasant weather. Perfect for experiencing local Kerala mountain culture.",
      highlights: ["Local culture", "Vegetable farms", "Village walks", "Local cuisine"],
      icon: Users
    },
    {
      id: 3,
      name: "Munnar Tea Gardens",
      distance: "25 km from Paradise Resort",
      time: "45 minutes drive",
      description: "World-famous tea plantations with rolling green hills. Visit tea factories and learn about tea processing while enjoying scenic drives.",
      highlights: ["Tea plantations", "Factory tours", "Scenic drives", "Shopping"],
      icon: Coffee
    },
    {
      id: 4,
      name: "Eravikulam National Park",
      distance: "30 km from Paradise Resort",
      time: "1 hour drive",
      description: "Home to the endangered Nilgiri Tahr and beautiful Neelakurinji flowers. Excellent for wildlife photography and nature walks.",
      highlights: ["Wildlife viewing", "Trekking trails", "Photography", "Neelakurinji flowers"],
      icon: Camera
    }
  ];

  const travelTips = [
    {
      title: "🌿 Best Time to Visit Vattavada",
      content: "Vattavada is perfect to visit all 365 days. 🌧️ Monsoon: lush green hills ❄️ Dec–Feb: coldest days 🌞 Rest of the year: pleasant & cool. With an average 16°C, it's an all-season paradise.",
      icon: Clock
    },
    {
      title: "Getting to Paradise Resort",
      content: "Nearest airport is Cochin (130 km). We can arrange pickup services from Munnar or provide detailed driving directions to our family friendly resort in Vattavada.",
      icon: Car
    },
    {
      title: "What to Pack",
      content: "Bring warm clothes for evenings, comfortable trekking shoes, camera for scenic views, and light cotton clothes for daytime at our budget stay in Vattavada.",
      icon: Star
    },
    {
      title: "Local Experiences",
      content: "Try local Kerala cuisine, visit spice gardens, enjoy campfire nights at our tent stay in Vattavada, and experience authentic mountain hospitality.",
      icon: MapPin
    }
  ];

  const activities = [
    {
      name: "Mountain Trekking",
      description: "Explore scenic trails around Vattavada with guided treks. Perfect for adventure enthusiasts staying at our Vattavada trekking stay.",
      duration: "2-4 hours",
      difficulty: "Moderate"
    },
    {
      name: "Photography Tours",
      description: "Capture stunning landscapes, tea gardens, and wildlife. Best spots accessible from our budget resort accommodation.",
      duration: "Half day",
      difficulty: "Easy"
    },
    {
      name: "Village Walks",
      description: "Experience local culture and farming practices. Learn about sustainable agriculture in the Western Ghats region.",
      duration: "1-2 hours",
      difficulty: "Easy"
    },
    {
      name: "Campfire Evenings",
      description: "Enjoy traditional music, local stories, and stargazing. Available for guests at our family friendly resort in Vattavada.",
      duration: "2-3 hours",
      difficulty: "Easy"
    }
  ];

  return (
    <section className="section-padding bg-black">
      <div className="max-width-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-large mb-6">🗺️ Vattavada Travel Guide</h2>
          <p className="body-large text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            Discover the beauty of Vattavada and surrounding attractions. Your complete guide to exploring 
            the Western Ghats from our <strong>homestay in Vattavada</strong>.
          </p>
        </div>



        {/* Nearby Attractions */}
        <div className="mb-20">
          <h3 className="display-medium text-center mb-12 text-[hsl(var(--primary))]">🏔️ Nearby Attractions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <PerformanceOptimizer
              data={attractions}
              chunkSize={2}
              renderItem={(attraction) => {
                const IconComponent = attraction.icon;
                return (
                  <Card key={attraction.id} className="bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[hsl(var(--primary)_/_0.1)] flex items-center justify-center rounded-lg flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-[hsl(var(--primary))]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="heading-3 mb-2">{attraction.name}</h4>
                          <div className="flex flex-wrap gap-4 mb-3 text-sm text-[hsl(var(--muted-foreground))]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {attraction.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {attraction.time}
                            </span>
                          </div>
                          <p className="body-medium text-[hsl(var(--muted-foreground))] mb-4">
                            {attraction.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {attraction.highlights.map((highlight, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-[hsl(var(--primary)_/_0.1)] text-[hsl(var(--primary))] text-sm rounded-full"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }}
            />
          </div>
        </div>

        {/* Travel Tips */}
        <div className="mb-20">
          <h3 className="display-medium text-center mb-12 text-[hsl(var(--primary))]">💡 Travel Tips</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PerformanceOptimizer
              data={travelTips}
              chunkSize={2}
              renderItem={(tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <Card key={index} className="bg-[hsl(var(--card))] border-[hsl(var(--border))] text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-[hsl(var(--primary)_/_0.1)] flex items-center justify-center rounded-lg mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-[hsl(var(--primary))]" />
                      </div>
                      <h4 className="heading-4 mb-3">{tip.title}</h4>
                      <p className="body-small text-[hsl(var(--muted-foreground))]">{tip.content}</p>
                    </CardContent>
                  </Card>
                );
              }}
            />
          </div>
        </div>

        {/* Activities */}
        <div className="mb-20">
          <h3 className="display-medium text-center mb-12 text-[hsl(var(--primary))]">🎯 Activities & Experiences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <PerformanceOptimizer
              data={activities}
              chunkSize={2}
              renderItem={(activity, index) => (
                <Card key={index} className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
                  <CardContent className="p-6">
                    <h4 className="heading-4 mb-3">{activity.name}</h4>
                    <p className="body-medium text-[hsl(var(--muted-foreground))] mb-4">{activity.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-[hsl(var(--primary))]">
                        <strong>Duration:</strong> {activity.duration}
                      </span>
                      <span className="text-[hsl(var(--primary))]">
                        <strong>Difficulty:</strong> {activity.difficulty}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            />
          </div>
        </div>

        {/* Related Links Section */}
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-8">
          <h3 className="heading-2 mb-6 text-center">Plan Your Perfect Stay</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-[hsl(var(--foreground))]">Accommodation Options</h4>
              <div className="space-y-2">
                <a href="/cottages" className="block text-[hsl(var(--primary))] hover:underline">
                  Private Cottages →
                </a>
                <a href="/tents" className="block text-[hsl(var(--primary))] hover:underline">
                  Adventure Tents →
                </a>
                <a href="/dormitory" className="block text-[hsl(var(--primary))] hover:underline">
                  Budget Dormitory →
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-[hsl(var(--foreground))]">Explore More</h4>
              <div className="space-y-2">
                <a href="/#gallery" className="block text-[hsl(var(--primary))] hover:underline">
                  Photo Gallery →
                </a>
                <a href="/#amenities" className="block text-[hsl(var(--primary))] hover:underline">
                  Resort Amenities →
                </a>
                <a href="/#packages" className="block text-[hsl(var(--primary))] hover:underline">
                  Special Packages →
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-[hsl(var(--foreground))]">Get in Touch</h4>
              <div className="space-y-2">
                <a href="/contact" className="block text-[hsl(var(--primary))] hover:underline">
                  Contact Information →
                </a>
                <a href="#contact" className="block text-[hsl(var(--primary))] hover:underline">
                  Make Reservation →
                </a>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Call: +91 9074902424
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="#contact" className="px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)_/_0.9)] transition-colors font-medium">
              Plan Your Adventure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelGuide;
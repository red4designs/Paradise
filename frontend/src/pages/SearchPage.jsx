import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, Users, Bed, Wifi, Car, Coffee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Home } from 'lucide-react';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);

  // Mock search data - in a real app, this would come from an API
  const searchableContent = [
    {
      id: 1,
      title: 'Private Cottages',
      description: 'Luxury 3-bedroom cottages with mountain views, perfect for families and groups',
      url: '/cottages',
      type: 'accommodation',
      features: ['3 Bedrooms', 'Mountain View', 'Private Kitchen', 'WiFi'],
      price: '₹4,500/night',
      image: '/images/Cottages/IMG_20250208_122711.webp'
    },
    {
      id: 2,
      title: 'Premium Tents',
      description: 'Adventure camping experience with modern amenities in scenic Vattavada',
      url: '/tents',
      type: 'accommodation',
      features: ['Adventure Camping', 'Modern Amenities', 'Scenic Views', 'WiFi'],
      price: '₹2,500/night',
      image: '/images/Tents/IMG_3632.JPEG'
    },
    {
      id: 3,
      title: 'Budget Dormitory',
      description: 'Affordable shared accommodation for backpackers and budget travelers',
      url: '/dormitory',
      type: 'accommodation',
      features: ['Shared Stay', 'Budget Friendly', 'Clean Facilities', 'WiFi'],
      price: '₹800/night',
      image: '/images/Dormitory/DJI_20231022_090731_99.webp'
    },
    {
      id: 4,
      title: 'Photo Gallery',
      description: 'Explore stunning photos of our resort, accommodations, and scenic mountain views',
      url: '/gallery',
      type: 'page',
      features: ['Resort Photos', 'Mountain Views', 'Accommodation Images'],
      image: '/images/resort-social-share.jpg'
    },
    {
      id: 5,
      title: 'Contact & Location',
      description: 'Get in touch with us and find directions to Paradise Resort Vattavada',
      url: '/contact',
      type: 'page',
      features: ['Contact Info', 'Location Map', 'Booking Assistance'],
      image: '/images/resort-social-share.jpg'
    },
    {
      id: 6,
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our resort, booking, and amenities',
      url: '/faq',
      type: 'page',
      features: ['Booking FAQ', 'Resort Policies', 'Amenities Info'],
      image: '/images/resort-social-share.jpg'
    }
  ];

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);

    if (query.trim()) {
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Search Results - Paradise Resort Vattavada | Find Your Perfect Stay</title>
        <meta name="description" content="Search for accommodations, amenities, and information at Paradise Resort Vattavada. Find cottages, tents, dormitory, and more in scenic Munnar." />
        <meta name="keywords" content="Paradise Resort search, Vattavada accommodation search, Munnar resort search, cottage booking, tent booking" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Search Results - Paradise Resort Vattavada" />
        <meta property="og:description" content="Search for accommodations and information at Paradise Resort Vattavada." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.paradisevattavada.com/search" />
        <meta property="og:image" content="https://www.paradisevattavada.com/images/resort-social-share.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Search Results - Paradise Resort Vattavada" />
        <meta name="twitter:description" content="Search for accommodations and information at Paradise Resort Vattavada." />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.paradisevattavada.com/search" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            "name": "Search Results - Paradise Resort Vattavada",
            "description": "Search for accommodations and information at Paradise Resort Vattavada",
            "url": "https://www.paradisevattavada.com/search",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Paradise Resort Vattavada",
              "url": "https://www.paradisevattavada.com"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-transparent">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <Home size={16} />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Search</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Search Header */}
        <div className="bg-gradient-to-r from-brand-primary/10 to-transparent py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="heading-1 mb-4">Search Paradise Resort</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find the perfect accommodation and information for your stay
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type="text"
                    placeholder="Search accommodations, amenities..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="px-6">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="container mx-auto px-4 py-12">
          {searchQuery && (
            <div className="mb-8">
              <h2 className="heading-2 mb-2">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-muted-foreground">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </p>
            </div>
          )}

          {searchResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result) => (
                <Card key={result.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{result.title}</CardTitle>
                      {result.price && (
                        <span className="text-brand-primary font-semibold text-sm">
                          {result.price}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {result.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {result.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{result.features.length - 3} more
                        </span>
                      )}
                    </div>

                    <Button asChild className="w-full">
                      <a href={result.url}>
                        View Details
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <Search size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="heading-3 mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try searching with different keywords or browse our accommodations below.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="outline">
                  <a href="/cottages">View Cottages</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/tents">View Tents</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/dormitory">View Dormitory</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="heading-3 mb-2">Start Your Search</h3>
              <p className="text-muted-foreground mb-6">
                Enter keywords above to find accommodations, amenities, and information.
              </p>
              <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
                <div className="text-center">
                  <Bed className="mx-auto mb-2 text-brand-primary" size={32} />
                  <p className="font-medium">Accommodations</p>
                  <p className="text-sm text-muted-foreground">Cottages, Tents, Dormitory</p>
                </div>
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 text-brand-primary" size={32} />
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Vattavada, Near Munnar</p>
                </div>
                <div className="text-center">
                  <Star className="mx-auto mb-2 text-brand-primary" size={32} />
                  <p className="font-medium">Amenities</p>
                  <p className="text-sm text-muted-foreground">WiFi, Parking, Restaurant</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
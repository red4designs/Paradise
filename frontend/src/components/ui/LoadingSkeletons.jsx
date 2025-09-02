import React from 'react';

// Generic section skeleton
export const SectionSkeleton = ({ className = '' }) => (
  <div className={`animate-pulse space-y-6 py-16 px-[7.6923%] ${className}`}>
    <div className="max-w-[1400px] mx-auto">
      {/* Title skeleton */}
      <div className="text-center space-y-4 mb-12">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

// Gallery skeleton with grid layout
export const GallerySkeleton = ({ className = '' }) => (
  <div className={`animate-pulse space-y-6 py-16 px-[7.6923%] bg-black ${className}`}>
    <div className="max-w-[1400px] mx-auto">
      {/* Title skeleton */}
      <div className="text-center space-y-4 mb-12">
        <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
      </div>
      
      {/* Gallery grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

// Packages skeleton with cards
export const PackagesSkeleton = ({ className = '' }) => (
  <div className={`animate-pulse space-y-6 py-16 px-[7.6923%] bg-black ${className}`}>
    <div className="max-w-[1400px] mx-auto">
      {/* Title skeleton */}
      <div className="text-center space-y-4 mb-12">
        <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
      </div>
      
      {/* Package cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-video bg-gray-700 rounded"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Amenities skeleton with icons
export const AmenitiesSkeleton = ({ className = '' }) => (
  <div className={`animate-pulse space-y-6 py-16 px-[7.6923%] bg-black ${className}`}>
    <div className="max-w-[1400px] mx-auto">
      {/* Title skeleton */}
      <div className="text-center space-y-4 mb-12">
        <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
      </div>
      
      {/* Amenities grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="text-center space-y-3">
            <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// FAQ skeleton
export const FAQSkeleton = ({ className = '' }) => (
  <div className={`animate-pulse space-y-6 py-16 px-[7.6923%] bg-black ${className}`}>
    <div className="max-w-[1400px] mx-auto">
      {/* Title skeleton */}
      <div className="text-center space-y-4 mb-12">
        <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
      </div>
      
      {/* FAQ items skeleton */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border border-gray-700 rounded p-4 space-y-3">
            <div className="h-5 bg-gray-700 rounded w-4/5"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Contact skeleton
export const ContactSkeleton = ({ className = '' }) => (
  <div className={`animate-pulse space-y-6 py-16 px-[7.6923%] bg-black ${className}`}>
    <div className="max-w-[1400px] mx-auto">
      {/* Title skeleton */}
      <div className="text-center space-y-4 mb-12">
        <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
      </div>
      
      {/* Contact content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact info */}
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded flex-1"></div>
            </div>
          ))}
        </div>
        
        {/* Contact form */}
        <div className="space-y-4">
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-24 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  </div>
);
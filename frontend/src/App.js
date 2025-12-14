import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
// Background3D is lazy loaded below
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import GoogleAnalyticsFacade from "./components/facades/GoogleAnalyticsFacade";
import initResourceOptimizer from "./utils/resourceOptimizer";
import { PerformanceProvider } from "./hooks/usePerformanceOptimization";
import { LayoutOptimizer } from "./utils/layoutOptimizer";
import { initWebVitals, optimizeImages, preloadCriticalResources } from "./utils/webVitals";

// Lazy load Background3D to avoid blocking initial render
const Background3D = React.lazy(() => import("./components/Background3D"));

// Lazy load page components with preloading for better performance
const HomePage = React.lazy(() => import(/* webpackChunkName: "home" */ "./pages/HomePage.jsx"));
const CottagesPage = React.lazy(() => import(/* webpackChunkName: "cottages" */ "./pages/CottagesPage.jsx"));
const TentsPage = React.lazy(() => import(/* webpackChunkName: "tents" */ "./pages/TentsPage.jsx"));
const DormitoryPage = React.lazy(() => import(/* webpackChunkName: "dormitory" */ "./pages/DormitoryPage.jsx"));
const GalleryPage = React.lazy(() => import(/* webpackChunkName: "gallery" */ "./pages/GalleryPage.jsx"));
const FAQPage = React.lazy(() => import(/* webpackChunkName: "faq" */ "./pages/FAQPage.jsx"));
const ContactPage = React.lazy(() => import(/* webpackChunkName: "contact" */ "./pages/ContactPage.jsx"));
const SearchPage = React.lazy(() => import(/* webpackChunkName: "search" */ "./pages/SearchPage.jsx"));
const ArrivalGuidePage = React.lazy(() => import(/* webpackChunkName: "arrival-guide" */ "./pages/ArrivalGuidePage.jsx"));

// Preload critical routes on idle
const preloadRoutes = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import("./pages/CottagesPage.jsx");
      import("./pages/GalleryPage.jsx");
      import("./pages/ContactPage.jsx");
      import("./pages/SearchPage.jsx");
    });
  }
};

// Enhanced loading component with skeleton
const LoadingSpinner = () => null;

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
          <div className="text-center glass-panel p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  // Initialize critical optimizations immediately, defer non-critical ones
  useEffect(() => {
    // Critical: Initialize Core Web Vitals monitoring immediately
    initWebVitals();

    // Critical: Preload critical resources for better LCP
    preloadCriticalResources();

    // Critical: Initialize layout optimizer globally
    window.layoutOptimizer = new LayoutOptimizer();

    // Defer non-critical optimizations to improve INP
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Non-critical: General resource optimizations
        initResourceOptimizer();

        // Non-critical: Image optimization
        setTimeout(() => {
          optimizeImages();
        }, 100);

        // Non-critical: Route preloading
        preloadRoutes();
      }, { timeout: 3000 });
    } else {
      // Fallback: Defer with setTimeout
      setTimeout(() => {
        initResourceOptimizer();
        optimizeImages();
        preloadRoutes();
      }, 2000);
    }

    // Defer service worker registration to avoid blocking main thread
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      }, 1000);
    }

    // Cleanup on unmount
    return () => {
      if (window.layoutOptimizer) {
        window.layoutOptimizer = null;
      }
    };
  }, []);

  // React-snap compatibility: Use hydrate instead of render for prerendered content
  const isPrerendered = typeof window !== 'undefined' && window.__PRERENDERED__;

  return (
    <HelmetProvider>
      <PerformanceProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Router>
              <Suspense fallback={null}>
                <Background3D />
              </Suspense>
              <div className="App min-h-screen text-foreground transition-colors duration-300 relative">
                <Header />
                <main>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/cottages" element={<CottagesPage />} />
                      <Route path="/tents" element={<TentsPage />} />
                      <Route path="/dormitory" element={<DormitoryPage />} />
                      <Route path="/gallery" element={<GalleryPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/arrival-guide" element={<ArrivalGuidePage />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <BackToTop />
                {/* Lazy load Google Analytics to improve initial page performance */}
                {!isPrerendered && (
                  <GoogleAnalyticsFacade
                    measurementId="AW-615136649"
                    loadDelay={2000}
                    loadOnInteraction={true}
                  />
                )}
              </div>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </PerformanceProvider>
    </HelmetProvider>
  );
}

export default App;
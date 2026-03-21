import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import GoogleAnalyticsFacade from "./components/facades/GoogleAnalyticsFacade";
import { PerformanceProvider } from "./hooks/usePerformanceOptimization";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load page components
const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));
const RoomDetailsPage = React.lazy(() => import("./pages/RoomDetailsPage.jsx"));
const FAQPage = React.lazy(() => import("./pages/FAQPage.jsx"));
const ContactPage = React.lazy(() => import("./pages/ContactPage.jsx"));
const ArrivalGuidePage = React.lazy(() => import("./pages/ArrivalGuidePage.jsx"));
const GalleryPage = React.lazy(() => import("./pages/GalleryPage.jsx"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-sand text-forest">
          <div className="text-center p-8 border border-forest/10 shadow-sm rounded-sm">
            <h2 className="text-2xl font-serif mb-4">Something went wrong</h2>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-forest text-sand text-sm uppercase tracking-widest hover:bg-forest/90 transition-colors"
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
  useEffect(() => {
    // Basic service worker registration
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
      }, 1000);
    }
  }, []);

  const isPrerendered = typeof window !== 'undefined' && window.__PRERENDERED__;

  return (
    <HelmetProvider>
      <PerformanceProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Router>
              <div className="App app-container min-h-screen relative bg-sand text-forest transition-colors duration-300">
                <Header />
                <main>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/rooms" element={<RoomDetailsPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/gallery" element={<GalleryPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/guide" element={<ArrivalGuidePage />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <BackToTop />
                
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
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import initResourceOptimizer from "./utils/resourceOptimizer";
import { PerformanceProvider } from "./hooks/usePerformanceOptimization";

// Lazy load page components for better performance
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CottagesPage = React.lazy(() => import("./pages/CottagesPage"));
const TentsPage = React.lazy(() => import("./pages/TentsPage"));
const DormitoryPage = React.lazy(() => import("./pages/DormitoryPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));

// Loading component
const LoadingSpinner = () => (
  <div className="loading">
    <div></div>
  </div>
);

function App() {
  // Initialize resource optimizations
  useEffect(() => {
    initResourceOptimizer();
  }, []);

  return (
    <HelmetProvider>
      <PerformanceProvider>
        <ThemeProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <div className="App min-h-screen bg-background text-foreground transition-colors duration-300">
              <Header />
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cottages" element={<CottagesPage />} />
                  <Route path="/tents" element={<TentsPage />} />
                  <Route path="/dormitory" element={<DormitoryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </Suspense>
              <Footer />
              <BackToTop />
            </div>
          </Router>
        </ThemeProvider>
      </PerformanceProvider>
    </HelmetProvider>
  );
}

export default App;
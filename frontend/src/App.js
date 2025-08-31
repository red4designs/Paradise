import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

// Page components
import HomePage from "./pages/HomePage";
import CottagesPage from "./pages/CottagesPage";
import TentsPage from "./pages/TentsPage";
import DormitoryPage from "./pages/DormitoryPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="App min-h-screen bg-background text-foreground transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cottages" element={<CottagesPage />} />
              <Route path="/tents" element={<TentsPage />} />
              <Route path="/dormitory" element={<DormitoryPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
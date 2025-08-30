import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Amenities from "./components/Amenities";
import RoomDetails from "./components/RoomDetails";
import Packages from "./components/Packages";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header />
        <Hero />
        <RoomDetails />
        <About />
        <Amenities />
        <Packages />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
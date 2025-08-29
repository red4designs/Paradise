import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Amenities from "./components/Amenities";
import Packages from "./components/Packages";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Amenities />
      <Packages />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
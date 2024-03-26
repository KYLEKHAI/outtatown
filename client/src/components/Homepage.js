import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Import CSS
import "./Homepage.css";

// Import React Router Link component
import { Link } from "react-router-dom";

// Initial homepage component on first entry to site

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Navbar />

      <div className="title-container">
        <h1 className="title">OuttaTown</h1>
        <p>Get Out And See The Fun That Awaits!</p>

        <div className="icon-button-container">
          {/* icon imported from https://lordicon.com/ */}
          <lord-icon
            src="https://cdn.lordicon.com/fhtvjpba.json"
            trigger="loop"
            delay="1000"
            colors="primary:#ebe6ef,secondary:#836fff"
            style={{ width: "200px", height: "200px" }}
          ></lord-icon>
          <Link to="/client-view">
            <button class="book-hotel">Book A Hotel</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;

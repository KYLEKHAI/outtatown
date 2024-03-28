// Initial homepage component on first entry to site
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomepageModal from "./HomepageModal";

// Import CSS
import "./Homepage.css";

const Homepage = () => {
  const [showHomepageModal, setShowHomepageModal] = useState(false);

  const openHomepageModal = () => {
    setShowHomepageModal(true);
  };

  const closeHomepageModal = () => {
    setShowHomepageModal(false);
  };

  const handleContinue = () => {
    // Logic for continue button
  };

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
          <button className="book-hotel" onClick={openHomepageModal}>
            Find Hotels
          </button>
        </div>
      </div>
      <Footer />

      <HomepageModal
        isOpen={showHomepageModal}
        onClose={closeHomepageModal}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default Homepage;

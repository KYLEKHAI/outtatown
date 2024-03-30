// View for the client to search hotel

import React, { useState } from "react";
import NavbarHotel from "./NavbarHotel";
import Footer from "./Footer";
import HotelResults from "./HotelResults";
import Help from "./Help";

// Import CSS
import "./ClientView.css";

const ClientView = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("view1");
  const [searchCriteria, setSearchCriteria] = useState({
    hotelChain: "",
    area: "",
    category: "",
    roomCapacity: "",
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
  });

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  const handleViewSelection = (viewName) => {
    setSelectedView(viewName);
  };

  const handleRatingChange = (e) => {
    const { value, checked } = e.target;
    setSearchCriteria((prevState) => {
      if (checked) {
        return {
          ...prevState,
          category: [...prevState.category, value],
        };
      } else {
        return {
          ...prevState,
          category: prevState.category.filter((rating) => rating !== value),
        };
      }
    });
  };

  // Validate the input fields if user displays invalid information
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "minPrice" || name === "maxPrice") {
      if (!isNaN(value) || value === "") {
        setSearchCriteria((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else if (name === "startDate" || name === "endDate") {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(value) || value === "") {
        setSearchCriteria((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setSearchCriteria((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    console.log("Search criteria:", searchCriteria);
  };

  return (
    <div>
      <NavbarHotel />

      <div className="views-container">
        <h2 className="client-view-title">Client Views</h2>

        <div className="view-buttons">
          <div
            className={`view ${selectedView === "view1" ? "active" : ""}`}
            onClick={() => handleViewSelection("view1")}
          >
            No View
          </div>
          <div
            className={`view ${selectedView === "view2" ? "active" : ""}`}
            onClick={() => handleViewSelection("view2")}
          >
            View #1
          </div>
          <div
            className={`view ${selectedView === "view3" ? "active" : ""}`}
            onClick={() => handleViewSelection("view3")}
          >
            View #2
          </div>
        </div>

        <div className="filter-menu">
          <div className="filter-menu-title-container">
            <button className="help-button" onClick={openHelpModal}>
              Help
            </button>

            <div className="filter-paragraph-container">
              <p className="filter-title-paragraph">
                Find the perfect stay by filtering the options below!
              </p>
            </div>
            <div className="search-icon-container">
              <lord-icon
                src="https://cdn.lordicon.com/ybaojceo.json"
                trigger="hover"
                colors="primary:#ebe6ef,secondary:#836fff,tertiary:#6e65a6"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
            </div>
          </div>
          <div className="filter-elements-container">
            <div className="search-options">
              <input
                className="input-field"
                type="text"
                name="hotelChain"
                placeholder="Hotel Chain"
                value={searchCriteria.hotelChain}
                onChange={handleInputChange}
              />
              <input
                className="input-field"
                type="text"
                name="area"
                placeholder="Province/City"
                value={searchCriteria.area}
                onChange={handleInputChange}
              />

              <input
                className="input-field"
                type="text"
                name="roomCapacity"
                placeholder="Room Capacity"
                value={searchCriteria.roomCapacity}
                onChange={handleInputChange}
              />
              <input
                className="input-field"
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={searchCriteria.startDate}
                onChange={handleInputChange}
              />
              <input
                className="input-field"
                type="text"
                name="endDate"
                placeholder="End Date"
                value={searchCriteria.endDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="rating-price-container">
              <div className="rating">
                <label className="filter-subtitle">Rating Category</label>
                <div>
                  <input
                    type="checkbox"
                    name="category"
                    value="1"
                    checked={searchCriteria.category.includes("1")}
                    onChange={handleRatingChange}
                  />
                  <label>1 Star ★</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="category"
                    value="2"
                    checked={searchCriteria.category.includes("2")}
                    onChange={handleRatingChange}
                  />
                  <label>2 Stars ★★</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="category"
                    value="3"
                    checked={searchCriteria.category.includes("3")}
                    onChange={handleRatingChange}
                  />
                  <label>3 Stars ★★★</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="category"
                    value="4"
                    checked={searchCriteria.category.includes("4")}
                    onChange={handleRatingChange}
                  />
                  <label>4 Stars ★★★★</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="category"
                    value="5"
                    checked={searchCriteria.category.includes("5")}
                    onChange={handleRatingChange}
                  />
                  <label>5 Stars ★★★★★</label>
                </div>
              </div>

              <div className="price-range">
                <label className="filter-subtitle">Price Range:</label>
                <input
                  className="input-field"
                  type="number"
                  name="minPrice"
                  placeholder="Minimum Price"
                  value={searchCriteria.minPrice}
                  onChange={handleInputChange}
                />
                <input
                  className="input-field"
                  type="number"
                  name="maxPrice"
                  placeholder="Maximum Price"
                  value={searchCriteria.maxPrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="filter-search">
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <Help isOpen={isHelpModalOpen} onClose={closeHelpModal} />
      <HotelResults />
      <Footer />
    </div>
  );
};

export default ClientView;

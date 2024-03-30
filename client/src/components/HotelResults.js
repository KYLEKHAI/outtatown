// Displays the hotels that match the user's search criteria
import React from "react";

// Import CSS
import "./HotelResults.css";

const HotelResults = () => {
  return (
    <div className="card-container">
      <div className="card">
        <img
          src={process.env.PUBLIC_URL + "/images/hotel-image-placeholder.jpg"}
          alt="Hotel"
        />
        <div className="card-content">
          <h3>Hotel 1</h3>
          <p>
            Description Description Description Description Description
            Description Description Description Description Description
            Description
          </p>
          <a href="#" className="see-more-button">
            Read More
          </a>
        </div>
      </div>
      <div className="card">
        <img src="/images/hotel-image-placeholder.jpg" alt="Hotel" />
        <div className="card-content">
          <h3>Hotel 2</h3>
          <p>
            Description Description Description Description Description
            Description Description Description Description Description
            Description
          </p>
          <a href="#" className="see-more-button">
            Read More
          </a>
        </div>
      </div>
      <div className="card">
        <img
          src={process.env.PUBLIC_URL + "/images/hotel-image-placeholder.jpg"}
          alt="Hotel"
        />
        <div className="card-content">
          <h3>Hotel 3</h3>
          <p>
            Description Description Description Description Description
            Description Description Description Description Description
            Description
          </p>
          <a href="#" className="see-more-button">
            Read More
          </a>
        </div>
      </div>
      <div className="card">
        <img
          src={process.env.PUBLIC_URL + "/images/hotel-image-placeholder.jpg"}
          alt="Hotel"
        />
        <div className="card-content">
          <h3>Hotel 4</h3>
          <p>
            Description Description Description Description Description
            Description Description Description Description Description
            Description
          </p>
          <a href="#" className="see-more-button">
            Read More
          </a>
        </div>
      </div>
      <div className="card">
        <img
          src={process.env.PUBLIC_URL + "/images/hotel-image-placeholder.jpg"}
          alt="Hotel"
        />
        <div className="card-content">
          <h3>Hotel 5</h3>
          <p>
            Description Description Description Description Description
            Description Description Description Description Description
            Description
          </p>
          <a href="#" className="see-more-button">
            Read More
          </a>
        </div>
      </div>
      <div className="card">
        <img
          src={process.env.PUBLIC_URL + "/images/hotel-image-placeholder.jpg"}
          alt="Hotel"
        />
        <div className="card-content">
          <h3>Hotel 6</h3>
          <p>
            Description Description Description Description Description
            Description Description Description Description Description
            Description
          </p>
          <a href="#" className="see-more-button">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotelResults;

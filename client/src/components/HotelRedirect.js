// Render results of hotels in selected city based on view 2

import React, { useState, useEffect } from "react";

// Import CSS
import "./HotelResults.css";

// Import Components
import HotelBooking from "./HotelBooking";

// Set States
const HotelRedirect = ({ selectedCity, customerId }) => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [error, setError] = useState(null);
  const [showHotels, setShowHotels] = useState(true);

  useEffect(() => {
    console.log("Selected city:", selectedCity);
    fetch(`http://localhost:3001/hotels?city=${selectedCity}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched hotels:", data);
        setHotels(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, [selectedCity]);

  useEffect(() => {
    console.log("Selected hotel ID:", selectedHotelId);
    if (selectedHotelId) {
      fetch(`http://localhost:3001/hotel_rooms/${selectedHotelId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched hotel rooms:", data);
          setHotelRooms(data);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching hotel rooms:", error);
          setError(error.message);
        });
    }
  }, [selectedHotelId]);

  useEffect(() => {
    console.log("Hotels:", hotels);
  }, [hotels]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModal = (hotelId, roomNumber) => {
    setSelectedHotelId(hotelId);
    setSelectedRoomNumber(roomNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewRooms = (hotelId) => {
    setSelectedHotelId(hotelId);
    setShowHotels(false);
  };

  return (
    <div>
      {showHotels && (
        <div className="card-container">
          {hotels.map((hotel, index) => (
            <div className="card" key={index}>
              <img
                src={process.env.PUBLIC_URL + "/images/hotel-building.jpg"}
                alt="Hotel"
              />
              <div className="card-content">
                <h3>{hotel.Name}</h3>
                <p>
                  <strong>Street Name:</strong> {hotel.StreetName}
                </p>
                <p>
                  <strong>Hotel ID:</strong> {hotel.HotelID}
                </p>
                <p>
                  <strong>City:</strong> {hotel.City}
                </p>
                <p>
                  <strong>Province:</strong> {hotel.Province}
                </p>
                <p>
                  <strong>Postal Code:</strong> {hotel.PostalCode}
                </p>
                <p>
                  <strong>Email:</strong> {hotel.Email}
                </p>
                <p>
                  <strong>Rating:</strong> {hotel.Rating}
                </p>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {hotel.PhoneNumber ? hotel.PhoneNumber.join(", ") : "N/A"}
                </p>
                <button
                  className="see-more-button"
                  onClick={() => handleViewRooms(hotel.HotelID)}
                >
                  See Rooms
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="card-container">
        {hotelRooms.map((room, index) => (
          <div className="card" key={index}>
            <img
              src={
                process.env.PUBLIC_URL + "/images/hotel-image-placeholder.jpg"
              }
              alt="Hotel"
            />
            <div className="card-content">
              <h3>Room {room.RoomNumber}</h3>
              <p>
                <strong>Hotel ID:</strong> {room.HotelID}
              </p>
              {room.Amenities && (
                <p>
                  <strong>Amenities: </strong>
                  {room.Amenities.join(", ")}
                </p>
              )}
              <p>
                <strong>Price:</strong> {room.Price}
              </p>
              <p>
                <strong>Extendable:</strong> {room.Extendable ? "Yes" : "No"}
              </p>
              <p>
                <strong>View Type:</strong> {room.ViewType}
              </p>
              <p>
                <strong>Amenities:</strong> {room.Amenities.join(", ")}
              </p>
              <p>
                <strong>Problems:</strong> {room.Problems.join(", ")}
              </p>
              <button
                className="see-more-button"
                onClick={() => openModal(room.HotelID, room.RoomNumber)}
              >
                Book Room
              </button>
            </div>
          </div>
        ))}
        <HotelBooking
          isOpen={isModalOpen}
          onClose={closeModal}
          customerId={customerId}
          hotelId={selectedHotelId}
          roomNumber={selectedRoomNumber}
        />
      </div>
    </div>
  );
};

export default HotelRedirect;

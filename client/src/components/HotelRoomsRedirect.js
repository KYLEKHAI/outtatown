// Renders data based on the hotelID selected in view 3

import React, { useState, useEffect } from "react";

// Import CSS
import "./HotelResults.css";

// Import Components
import HotelBooking from "./HotelBooking";

// Set States
const HotelRoomsRedirect = ({ hotelId, customerId }) => {
  const [hotelRooms, setHotelRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/hotel_rooms/${hotelId}`)
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
  }, [hotelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModal = (roomNumber) => {
    setSelectedRoomNumber(roomNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card-container">
      {hotelRooms.map((room, index) => (
        <div className="card" key={index}>
          <img
            src={process.env.PUBLIC_URL + "/images/hotel-image-placeholder.jpg"}
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
              onClick={() => openModal(room.RoomNumber)}
            >
              Book Room
            </button>
          </div>
        </div>
      ))}
      {selectedRoomNumber && (
        <HotelBooking
          isOpen={isModalOpen}
          onClose={closeModal}
          hotelId={hotelId}
          customerId={customerId}
          roomNumber={selectedRoomNumber}
        />
      )}
    </div>
  );
};

export default HotelRoomsRedirect;

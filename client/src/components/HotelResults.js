// Renders data of the hotel data from the database and filters according to selected criteria
import React, { useState, useEffect } from "react";

// Import CSS
import "./HotelResults.css";

// Import Components
import HotelBooking from "./HotelBooking";
import HotelRedirect from "./HotelRedirect";
import HotelRoomsRedirect from "./HotelRoomsRedirect";

// Set States
const HotelResults = ({ selectedView, customerId }) => {
  const [hotelRooms, setHotelRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showHotels, setShowHotels] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);

  const handleCityClick = (city) => {
    setSelectedCity(city);

    fetch(`http://localhost:3001/hotels?city=${city}`)
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
        setShowHotels(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleViewRooms = (hotelId) => {
    console.log("Selected Hotel ID:", hotelId);
    setSelectedHotelId(hotelId);
    setShowHotels(false);
    setHotels([]);
  };

  const openModal = (hotelId, roomNumber) => {
    setIsModalOpen(true);
    setSelectedHotelId(hotelId);
    setSelectedRoomNumber(roomNumber);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Reset the data depending on the selected view
  const handleReset = () => {
    let resetUrl = "http://localhost:3001/hotel_rooms";

    switch (selectedView) {
      case "view1":
        resetUrl = "http://localhost:3001/hotel_rooms";
        break;
      case "view2":
        resetUrl = "http://localhost:3001/available_rooms_per_city";
        break;
      case "view3":
        resetUrl = "http://localhost:3001/capacity_per_hotel";
        break;
      default:
        break;
    }

    console.log(`Resetting data for selected view: ${selectedView}`);
    console.log(`URL: ${resetUrl}`);

    fetch(resetUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error resetting data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Reset data:", data);
        if (selectedView === "view1") {
          setHotelRooms(data);
          setHotels([]);
        } else if (selectedView === "view2") {
          setHotels(data);
          setHotelRooms([]);
        } else if (selectedView === "view3") {
          setHotels(data);
          setHotelRooms([]);
        }
        setError(null);
      })
      .catch((error) => {
        console.error("Error resetting data:", error);
        setError(error.message);
      });

    setSelectedCity(null);
    setShowHotels(false);
    setSelectedHotelId(null);
  };

  useEffect(() => {
    let url = "http://localhost:3001/hotel_rooms";

    switch (selectedView) {
      case "view1":
        url = "http://localhost:3001/hotel_rooms";
        break;
      case "view2":
        url = "http://localhost:3001/available_rooms_per_city";
        break;
      case "view3":
        url = "http://localhost:3001/capacity_per_hotel";
        break;
      default:
        break;
    }

    console.log(`Fetching data for selected view: ${selectedView}`);
    console.log(`URL: ${url}`);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (selectedView === "view1") {
          setHotelRooms(data);
          setHotels([]);
        } else if (selectedView === "view2") {
          setHotels(data);
          setHotelRooms([]);
        } else if (selectedView === "view3") {
          setHotels(data);
          setHotelRooms([]);
        }
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, [selectedView]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="reset-button-container">
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      {selectedView === "view1" && (
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
        </div>
      )}

      {selectedView === "view2" && !showHotels && (
        <div className="card-container">
          {hotels.map((hotel, index) => (
            <div className="card" key={index}>
              <img
                src={process.env.PUBLIC_URL + "/images/city.jpg"}
                alt="Hotel"
              />
              <div className="card-content">
                <h3>{hotel.City}</h3>
                <p>
                  <strong>Total Number Of Rooms: </strong>
                  {hotel.totalnumberofrooms}
                </p>
                <button
                  className="see-more-button"
                  onClick={() => handleCityClick(hotel.City)}
                >
                  View Hotels
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedView === "view3" && (
        <div className="card-container">
          {hotels.map((hotel, index) => (
            <div className="card" key={index}>
              <img
                src={process.env.PUBLIC_URL + "/images/hotel-building.jpg"}
                alt="Hotel"
              />
              <div className="card-content">
                <h3>{hotel.HotelName}</h3>
                <p>
                  <strong>Hotel ID: </strong> {hotel.HotelID}
                </p>
                <p>
                  <strong>Total Capacity: </strong> {hotel.TotalCapacity}
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
      <HotelBooking
        isOpen={isModalOpen}
        onClose={closeModal}
        customerId={customerId}
        hotelId={selectedHotelId}
        roomNumber={selectedRoomNumber}
      />
      {showHotels && (
        <HotelRedirect selectedCity={selectedCity} customerId={customerId} />
      )}
      {selectedView === "view3" && selectedHotelId && (
        <HotelRoomsRedirect hotelId={selectedHotelId} customerId={customerId} />
      )}
    </div>
  );
};

export default HotelResults;

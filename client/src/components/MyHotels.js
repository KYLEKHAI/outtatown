import React, { useState, useEffect } from "react";

// Import Components
import NavbarHotel from "./NavbarHotel";
import Footer from "./Footer";

// Import CSS
import "./HotelPayment.css";

const MyHotels = () => {
  // States and retreive variables
  const params = new URLSearchParams(window.location.search);
  const customerId = params.get("customerId");
  const hotelId = params.get("hotelId");
  const roomNumber = params.get("roomNumber");
  const paymentNumber = params.get("paymentNumber");

  console.log("HotelID", hotelId);
  console.log("Room Number:", roomNumber);
  console.log("CustomerID:", customerId);
  console.log("paymentNumber", paymentNumber);

  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoomData();
  }, []);

  const fetchRoomData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/hotel_rooms/${hotelId}?roomNumber=${roomNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched room data:", data);
        setRoomData(data[0]);
      } else {
        console.error("Failed to fetch room data");
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Blur payment info
  const blurPaymentNumber = (paymentNumber) => {
    const visibleDigits = paymentNumber.slice(-4);
    const blurredDigits = "*".repeat(paymentNumber.length - 4);
    return blurredDigits + visibleDigits;
  };

  return (
    <div>
      <NavbarHotel />
      <div className="payment-container">
        <h2 className="payment-title">My Hotels</h2>
        {loading ? (
          <p>Loading...</p>
        ) : roomData ? (
          <div className="payment-details">
            <div className="room-details">
              <div className="card">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/hotel-image-placeholder.jpg"
                  }
                  alt="Hotel Room"
                />
                <div className="card-content">
                  <h3>Room {roomData.RoomNumber}</h3>
                  <p>
                    <strong>Hotel ID: </strong>
                    {roomData.HotelID}
                  </p>
                  {roomData.Amenities && roomData.Amenities.length > 0 && (
                    <p>
                      <strong>Amenities:</strong>{" "}
                      {roomData.Amenities.join(", ")}
                    </p>
                  )}
                  <p>
                    <strong>Price: </strong>
                    {roomData.Price}
                  </p>
                  <p>
                    <strong>Extendable: </strong>
                    {roomData.Extendable ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>View Type:</strong> {roomData.ViewType}
                  </p>
                  {roomData.Problems && roomData.Problems.length > 0 && (
                    <p>
                      <strong>Problems:</strong> {roomData.Problems.join(", ")}
                    </p>
                  )}
                  <p>
                    <strong>Payment Number:</strong>{" "}
                    {blurPaymentNumber(paymentNumber)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No hotels are booked yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyHotels;

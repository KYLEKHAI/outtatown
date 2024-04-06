import React, { useState, useEffect } from "react";

import "./HotelPayment.css";

import NavbarHotel from "./NavbarHotel";
import Footer from "./Footer";

// Import React Router Link component
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const HotelPayment = () => {
  const location = useLocation();
  const [bookingId, setBookingId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const hotelId = searchParams.get("hotelId");
  const roomNumber = searchParams.get("roomNumber");
  const customerId = searchParams.get("customerId");

  console.log("HotelID", hotelId);
  console.log("Room Number:", roomNumber);
  console.log("CustomerID:", customerId);

  const [roomData, setRoomData] = useState(null);
  const [paymentNumber, setPaymentNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState(null);
  const [existingPaymentNumber, setExistingPaymentNumber] = useState("");
  const [loadingCustomer, setLoadingCustomer] = useState(true);

  useEffect(() => {
    fetchRoomData();
    fetchCustomerData();
  }, [hotelId, roomNumber, customerId]);

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

      await fetch(`http://localhost:3001/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BookingID: bookingId,
          BookingDate: bookingDate,
          HotelID: hotelId,
          RoomNumber: roomNumber,
          CustomerID: customerId,
        }),
      });
    } catch (error) {
      console.error("Error fetching room data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/customers/${customerId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched customer data:", data);
        setCustomerData(data);
        setExistingPaymentNumber(data.PaymentCardNumber);
      } else {
        console.error("Failed to fetch customer data");
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoadingCustomer(false);
    }
  };

  const handleConfirm = async () => {
    if (!paymentNumber || isNaN(paymentNumber) || paymentNumber.length !== 16) {
      alert("Please enter a valid 16-digit payment number.");
      return;
    }

    if (
      !bookingId ||
      isNaN(bookingId) ||
      parseInt(bookingId) < 1000000000 ||
      parseInt(bookingId) >= 2000000000
    ) {
      alert(
        "Booking ID must be a valid integer within the range of 1000000000 and 1999999999."
      );
      return;
    }

    const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegex.test(bookingDate)) {
      alert("Please enter a valid booking date (yyyy-mm-dd)");
      return;
    }

    try {
      await fetch(`http://localhost:3001/customers/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PaymentCardNumber: paymentNumber,
        }),
      });
      console.log(
        "Request Payload:",
        JSON.stringify({ CustomerID: customerId })
      );

      await fetch(
        `http://localhost:3001/hotel_rooms/${hotelId}/${roomNumber}/customer/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            CustomerID: customerId,
          }),
        }
      );

      await fetch(`http://localhost:3001/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingDate: bookingDate,
          hotelId: hotelId,
          roomNumber: roomNumber,
          customerId: customerId,
        }),
      });

      alert("Payment information is valid and you have booked a room!");

      window.location.href = `/my-hotels?customerId=${customerId}&hotelId=${hotelId}&roomNumber=${roomNumber}&paymentNumber=${paymentNumber}`;
    } catch (error) {
      console.error("Error updating payment information:", error);
      alert("Failed to update payment information. Please try again later.");
    }
  };

  return (
    <div>
      <NavbarHotel />
      <div className="payment-container">
        <h2 className="payment-title">Hotel Payment</h2>
        <p className="payment-paragraph">
          Enter your payment information to rent the room!
        </p>
        {loading && <p>Loading...</p>}
        {roomData && (
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
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="input-button-container">
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter payment number"
              value={paymentNumber}
              onChange={(e) => setPaymentNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
            />

            <input
              type="text"
              placeholder="Booking Date (yyyy-mm-dd)"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>
          <div className="button-container">
            <Link to="/client-view">
              <button className="no-button1">Back</button>
            </Link>
            <button className="continue-button1" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelPayment;

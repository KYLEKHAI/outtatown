import React from "react";

// Import Modal from React Modal
import Modal from "react-modal";

// Import Link from  React Router
import { Link } from "react-router-dom";

// Import CSS
import "./HomepageModal.css";

const HotelBooking = ({ isOpen, onClose, customerId, hotelId, roomNumber }) => {
  console.log("HotelID", hotelId);
  console.log("Room Number:", roomNumber);

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className={"homepageModal"}
      contentLabel="Hotel Booking Modal"
    >
      <div className="modal-container">
        <h2 className="modal-title">Book this room?</h2>
        <p className="modal-text">
          Do you want to book this room? If yes, proceed with your booking.
        </p>
        <div className="button-container">
          <button className="no-button" onClick={handleCloseModal}>
            No
          </button>
          <Link
            to={
              customerId
                ? `/hotel-payment?customerId=${customerId}&hotelId=${hotelId}&roomNumber=${roomNumber}`
                : "#"
            }
            onClick={() => {
              if (!customerId) {
                alert(
                  "You need an account to book a hotel. Return to the homepage and sign in."
                );
              }
            }}
          >
            <button className="continue-button">Yes</button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default HotelBooking;

import React from "react";
import Modal from "react-modal";
import "./HomepageModal.css";

const HotelBooking = ({ isOpen, onClose }) => {
  const handleCloseModal = () => {
    onClose();
  };

  const handleYesButtonClick = () => {
    console.log("Yes button clicked");
    // Implement your logic here
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
          <button className="continue-button" onClick={handleYesButtonClick}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default HotelBooking;

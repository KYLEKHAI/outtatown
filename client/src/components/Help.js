// Help modal to help users understand the format of the input fields in ClientView.js
import React from "react";
import Modal from "react-modal";

// Import CSS
import "./Help.css";

const Help = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="helpModal"
      contentLabel="Help Modal"
    >
      <div className="modal-container">
        <h2 className="modal-title">Need Help Searching?</h2>
        <div className="modal-text">
          <p>Province format: XX </p>
          <p>Start and End date format: yyyy/mm/dd</p>
          <p>Price in CAD dollars</p>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default Help;

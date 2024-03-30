// Modal to ask user if they want to return to homepage
import React from "react";
import Modal from "react-modal";

// Import React Router Link
import { Link } from "react-router-dom";

// Use same styles as HomepageModal.css
import "./HomepageModal.css";

const BackHomeModal = ({ isOpen, onClose, onContinue }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={"homepageModal"}
      contentLabel="Homepage Modal"
    >
      <div className="modal-container">
        <h2 className="modal-title">Return to Home?</h2>
        <p className="modal-text">
          Are you sure you want to return to the home screen?
        </p>
        <div className="button-container">
          <button className="no-button" onClick={onClose}>
            No
          </button>
          <button className="continue-button" onClick={onContinue}>
            <Link to="/" className="continue-text">
              Yes
            </Link>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BackHomeModal;

import React from "react";
import Modal from "react-modal";
import "./HomepageModal.css";

// Import React Router Link component
import { Link } from "react-router-dom";

const HomepageModal = ({ isOpen, onClose, onContinue }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={"homepageModal"}
      contentLabel="Homepage Modal"
    >
      <div className="modal-container">
        <h2 className="modal-title">Disclaimer!</h2>
        <p className="modal-text">
          Are you sure you want to find hotels without signing in? You will not
          be able to book or rent a hotel room without an account.
        </p>
        <div className="button-container">
          <button className="no-button" onClick={onClose}>
            No
          </button>
          <button className="continue-button" onClick={onContinue}>
            <Link to="/client-view" className="continue-text">
              Continue
            </Link>
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default HomepageModal;

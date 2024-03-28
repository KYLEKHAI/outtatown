// Popup window for users to sign in
import React, { useState } from "react";

// Import React Modal
import Modal from "react-modal";

//Import CSS
import "./SignInModal.css";

// States
const SignInModal = ({ isOpen, onClose, onOpenSignUp }) => {
  const [sinNumber, setSinNumber] = useState("");

  const openSignUpModal = () => {
    onOpenSignUp();
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    // Check if input field is empty
    if (sinNumber === "") {
      alert("Please fill in all the fields");
      return;
    }

    // Validate SIN Number here (required to have 9 numbers)
    if (sinNumber.length === 9 && !isNaN(sinNumber)) {
      console.log("Signing in with SIN Number:", sinNumber);

      // Go to ClientView.js on successful sign in
      window.location.href = "/client-view";
    } else {
      alert("Please enter a valid SIN Number (9 digits)");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={"signInModal"}
      contentLabel="Sign In Modal"
    >
      <div className="sign-in-container">
        <h2 className="modal-title">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={sinNumber}
                onChange={(e) => setSinNumber(e.target.value)}
                placeholder="SIN Number"
                maxLength={9}
              />
            </label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>

        <div className="create-account-text" onClick={openSignUpModal}>
          Don't have an account? <span>Create an account</span>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;

// Popup window for users to sign in
import React, { useState } from "react";

// Import React Modal
import Modal from "react-modal";

//Import CSS
import "./SignInModal.css";

// States
const SignInModal = ({ isOpen, onClose, onOpenSignUp }) => {
  const [sinNumber, setSinNumber] = useState("");
  const [error, setError] = useState(null);

  const openSignUpModal = () => {
    onOpenSignUp();
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    // Check if input field is empty
    if (sinNumber === "") {
      alert("Please fill in all the fields");
      return;
    }

    // Validate SIN Number here (required to have 9 numbers)
    if (sinNumber.length === 9 && !isNaN(sinNumber)) {
      console.log("Signing in with SIN Number:", sinNumber);

      try {
        const response = await fetch(`http://localhost:3001/customers`);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Data received:", data);

        const customer = data.find(
          (customer) => customer.CustomerID === sinNumber
        );
        if (customer) {
          // Go to ClientView.js on successful sign in
          window.location.href = `/client-view?customerId=${customer.CustomerID}`;
        } else {
          alert("Account not found. Please create an account");
          setError("Account not found");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Error occurred. Please try again later.");
      }
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
                placeholder="SIN Number (XXXXXXXXX)"
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

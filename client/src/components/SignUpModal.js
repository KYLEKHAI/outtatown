// Popup window for users to sign up and create an account
import React, { useState } from "react";

// Import React Modal
import Modal from "react-modal";

// Import CSS
import "./SignUpModal.css";

const SignUpModal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sinNumber, setSinNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Validation for input fields
  const handleSignUp = (e) => {
    e.preventDefault();

    // Check if any input field is empty
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      sinNumber.trim() === "" ||
      registrationDate.trim() === "" ||
      city.trim() === "" ||
      province.trim() === "" ||
      streetName.trim() === "" ||
      houseNumber.trim() === "" ||
      postalCode.trim() === ""
    ) {
      alert("Please fill in all the fields");
      return;
    }

    // Validation for SIN Number (required to have 9 numbers)
    if (sinNumber.length !== 9 || isNaN(sinNumber)) {
      alert("Please enter a valid SIN Number (9 digits)");
      return;
    }

    // Validation for registration date (required to be format: yyyy-mm-dd)
    const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegex.test(registrationDate)) {
      alert("Please enter a valid registration date (yyyy-mm-dd)");
      return;
    }

    // Validation for postal code (required to have length of 6)
    if (postalCode.length !== 6) {
      alert("Please enter a valid postal code (6 characters)");
      return;
    }

    // Validation for province (required to have length of 2)
    if (province.length !== 2) {
      alert("Please enter a valid province code (2 characters)");
      return;
    }

    console.log("Signing up with:", {
      firstName,
      lastName,
      sinNumber,
      registrationDate,
      city,
      province,
      streetName,
      postalCode,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={"signUpModal"}
      contentLabel="Sign Up Modal"
    >
      <div className="sign-up-container">
        <h2 className="modal-title">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={sinNumber}
                onChange={(e) => setSinNumber(e.target.value)}
                placeholder="SIN Number (XXXXXXXXX"
                maxLength={9}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
                placeholder="Registration Date (yyyy-mm-dd)"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Province (XX)"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                placeholder="Street Name"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="House Number"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal Code (XXXXXX)"
              />
            </label>
          </div>
          <button type="submit" className="sign-up-button">
            Create account
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SignUpModal;

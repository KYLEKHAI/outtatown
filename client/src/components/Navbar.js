import React, { useState } from "react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

// Import React Router Link component
import { NavLink } from "react-router-dom";

// Import CSS
import "./Navbar.css";

export default function Navbar() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setSignInModalOpen(false);
    setSignUpModalOpen(true);
  };

  return (
    <nav className="nav">
      <NavLink to="/" className="site-title">
        OuttaTown
        <lord-icon
          className="site-icon"
          src="https://cdn.lordicon.com/iikoxwld.json"
          trigger="hover"
          colors="primary:#836fff"
          style={{ width: "80px", height: "70px" }}
        ></lord-icon>
      </NavLink>

      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About Us
          </NavLink>
        </li>
        <li
          className="sign-in nav-button"
          onClick={() => setSignInModalOpen(true)}
        >
          Sign In
        </li>

        <SignInModal
          isOpen={signInModalOpen}
          onClose={() => setSignInModalOpen(false)}
          onOpenSignUp={openSignUpModal}
        />
        <li
          className="sign-up nav-button"
          onClick={() => setSignUpModalOpen(true)}
        >
          Sign Up
        </li>

        <SignUpModal
          isOpen={signUpModalOpen}
          onClose={() => setSignUpModalOpen(false)}
        />
      </ul>
    </nav>
  );
}

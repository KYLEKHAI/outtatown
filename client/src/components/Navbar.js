import React from "react";

// Import React Router Link component
import { Link } from "react-router-dom";

// Import CSS
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        OuttaTown
        <lord-icon
          className="site-icon"
          src="https://cdn.lordicon.com/iikoxwld.json"
          trigger="hover"
          colors="primary:#836fff"
          style={{ width: "80px", height: "70px" }}
        ></lord-icon>
      </Link>

      <ul>
        <li className="active">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li className="sign-in">
          <Link to="/signin" className="nav-button">
            Sign In
          </Link>
        </li>
        <li className="sign-up">
          <Link to="/signup" className="nav-button">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

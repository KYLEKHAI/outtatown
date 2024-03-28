// Navbar for the hotel views
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarHotel.css";

export default function NavbarHotel() {
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
          <NavLink to="/views" activeClassName="active">
            Views
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-hotels" activeClassName="active">
            My Hotels
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

// Navbar for the hotel views
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavbarHotel.css";
import BackHomeModal from "./BackHome";

export default function NavbarHotel() {
  // Open return home modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="nav">
      <div onClick={openModal} className="site-title">
        OuttaTown
        <lord-icon
          className="site-icon"
          src="https://cdn.lordicon.com/iikoxwld.json"
          trigger="hover"
          colors="primary:#836fff"
          style={{ width: "80px", height: "70px" }}
        ></lord-icon>
      </div>

      <ul>
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
      <BackHomeModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
}

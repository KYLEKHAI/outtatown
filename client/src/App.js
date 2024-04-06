import React from "react";

// Import React Router components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import React Modal (get rid of screen reader warnings)
import Modal from "react-modal";

// Import Components
import Homepage from "./components/Homepage";
import AboutUs from "./components/AboutUs";
import ClientView from "./components/ClientView";
import HotelBooking from "./components/HotelBooking";
import HotelPayment from "./components/HotelPayment";
import MyHotels from "./components/MyHotels";

function App() {
  Modal.setAppElement("#root");

  return (
    <Router>
      <Routes>
        {/* Default Route is the Homepage*/}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/client-view" element={<ClientView />} />
        <Route path="/hotel-booking" component={HotelBooking} />
        <Route path="/hotel-payment" element={<HotelPayment />} />
        <Route path="/my-hotels" element={<MyHotels />} />
      </Routes>
    </Router>
  );
}

export default App;

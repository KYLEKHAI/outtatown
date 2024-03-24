import React from "react";

// Import React Router components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Components
import Homepage from "./components/Homepage";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route is the Homepage*/}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;

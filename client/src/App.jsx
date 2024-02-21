import React, { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;

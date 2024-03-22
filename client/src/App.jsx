import React, { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Clothes from "./pages/Clothes/Clothes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route exact path={"/clothes"} component={Clothes} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

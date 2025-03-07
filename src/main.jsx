import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing Router, Routes, and Route
import './index.css';
import App from './App.jsx';
import AboutUs from "./Pages/Aboutus.jsx";
import ContactUs from "./Pages/Contactus.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

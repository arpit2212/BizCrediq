import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing Router, Routes, and Route
import './index.css';
import App from './App.jsx';
import AboutUs from "./Pages/Aboutus.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

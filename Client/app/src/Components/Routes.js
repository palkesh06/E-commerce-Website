import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Slider from "./Image-Silder";

const routes = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slider/>} />
      </Routes>
    </Router>
  );
};

export default routes;

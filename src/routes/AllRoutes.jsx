import MockmanEs from "mockman-js";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home/Home";
Home;
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mock" element={<MockmanEs />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;

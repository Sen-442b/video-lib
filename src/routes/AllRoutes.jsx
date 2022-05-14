import MockmanEs from "mockman-js";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home/Home";
import VideoListingPage from "../screens/VideoList/VideoListingPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mock" element={<MockmanEs />} />
      <Route path="/videoListing" element={<VideoListingPage />} />
    </Routes>
  );
};

export default AllRoutes;

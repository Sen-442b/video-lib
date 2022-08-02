import MockmanEs from "mockman-js";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
//import { useAuthContext } from "../context/AuthContext";
import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";
import Logout from "../screens/Logout/Logout";
import Signup from "../screens/Signup/Signup";
import VideoListingPage from "../screens/VideoList/VideoListingPage";
import WatchLater from "../screens/WatchLater/WatchLater";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mock" element={<MockmanEs />} />
        <Route path="/videoListing" element={<VideoListingPage />} />

        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/logout"
          element={
            <PrivateRoutes>
              <Logout />
            </PrivateRoutes>
          }
        />
        <Route
          path="/watchLater"
          element={
            <PrivateRoutes>
              <WatchLater />
            </PrivateRoutes>
          }
        />

        {/* <ToastContainer />*/}
      </Routes>
    </>
  );
};

export default AllRoutes;

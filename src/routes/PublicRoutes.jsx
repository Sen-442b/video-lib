import React from "react";
import { Navigate } from "react-router-dom";
//import { useAuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const PublicRoutes = ({ children }) => {
  const auth = useSelector((storeState) => storeState.auth);

  return auth.authToken ? <Navigate to={-1} /> : children;
};

export default PublicRoutes;

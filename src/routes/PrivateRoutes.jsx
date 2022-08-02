import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const auth = useSelector((storeState) => storeState.auth);

  return auth.authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;

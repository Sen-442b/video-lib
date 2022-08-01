import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthAction } from "../../redux/features/authSlice";

const AlertBox = ({ alertContent }) => {
  const authDispatch = useDispatch();
  const authStoreState = useSelector((storeState) => storeState.auth);
  const { hasError } = authStoreState;
  const { message, type } = alertContent;

  // const [toggleDisplay, setToggleDisplay] = useState("");
  const getIcon = (actionType) => {
    if (actionType === "success") return "fa-check-circle";
    else if (actionType === "danger") return "fa-exclamation-circle";
    else return "fa-radiation-alt";
  };

  return (
    <div className={`alert alert-${type} text-align-justify`}>
      <i className={`fas ${getIcon(type)}`}></i> {message}
    </div>
  );
};

export default AlertBox;

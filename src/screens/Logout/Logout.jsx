import React from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/features/authSlice";
import Star from "../../components/Animations/StarAnim/Star";

const starAnimationArr = [
  { animationDuration: "4s", animationDelay: "2s", top: "5rem" },
  { animationDuration: "5s", animationDelay: "4s", top: "10rem" },
  { animationDuration: "6s", animationDelay: "6s", top: "15rem" },
  { animationDuration: "4s", animationDelay: "8s", top: "20rem" },
  { animationDuration: "6s", animationDelay: "10s", top: "25rem" },
  { animationDuration: "5s", animationDelay: "12s", top: "30rem" },
  { animationDuration: "6s", animationDelay: "14s", top: "35rem" },
];
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const logoutHandler = () => {
    localStorage.removeItem("encToken") ||
      sessionStorage.removeItem("encToken");
    localStorage.removeItem("currentUser") ||
      sessionStorage.removeItem("currentUser");
    dispatch(logoutAction());
    navigate(location.state?.form?.pathname || "/", {
      replace: true,
    });
  };
  return (
    <div className="primary-background">
      <div className="logout">
        <h1 className="login-heading ">Logout</h1>

        <h2>Are you Sure?</h2>

        <div className="flex-justify-spc-btwn">
          <button
            className="btn-outline"
            onClick={() =>
              navigate(location.state?.form?.pathname || "/", {
                replace: true,
              })
            }
          >
            Cancel
          </button>
          <button className="btn-primary" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      {starAnimationArr.map(
        ({ animationDuration, animationDelay, top }, index) => (
          <Star
            animationDuration={animationDuration}
            animationDelay={animationDelay}
            top={top}
            key={index}
          />
        )
      )}
    </div>
  );
};

export default Logout;

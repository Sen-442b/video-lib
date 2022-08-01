import React, { useState } from "react";
import Guide from "../Guide/Guide";
import { useSelector } from "react-redux";
//import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Nav = () => {
  const navigate = useNavigate();
  const [guideIsActive, setGuideIsActive] = useState(false);

  const auth = useSelector((storeState) => storeState.auth);
  const { authToken } = auth;
  return (
    <nav className="nav-container">
      <button
        className="unset-all"
        onClick={() => setGuideIsActive((prevBool) => !prevBool)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <div>Logo</div>
      <div>
        {!authToken && (
          <button className="btn-outline" onClick={() => navigate("/signup")}>
            Signup
          </button>
        )}
        <button
          className={authToken ? "btn-link" : "btn-primary"}
          onClick={() => navigate(authToken ? "/logout" : "/login")}
        >
          {authToken ? "Logout" : "Login"}
        </button>
      </div>
      {guideIsActive && <Guide />}
    </nav>
  );
};

export default Nav;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
//import { useAuthContext } from "../../context/AuthContext";
import { loginService } from "../../services/AuthServices";
import AlertBox from "../../components/AlertBox/AlertBox";
import { useSelector, useDispatch } from "react-redux";
import { login, resetAuthAction } from "../../redux/features/authSlice";
import { useLocation } from "react-router-dom";
const Login = () => {
  const [userCred, setUserCred] = useState({ email: "", password: "" });
  const [persistUser, setPersistUser] = useState(true);
  const { email, password } = userCred;
  //const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((storeState) => storeState.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const { hasError, message, isLoading } = auth;

  // const { authObj, setAuthObj } = useAuthContext();
  // const { loginError } = authObj;
  const navigate = useNavigate();
  const [backgroundIsBlurred, setBackgroundIsBlurred] = useState(true);
  const emailInputRef = useRef();
  useEffect(() => emailInputRef.current.focus(), []);
  useEffect(() => {
    let timeoutId;
    if (hasError) {
      timeoutId = setTimeout(() => dispatch(resetAuthAction()), 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [hasError]);

  const loginHandler = async (userCredentials, persistUser) => {
    const response = await dispatch(login(userCredentials));

    if (response.payload.encodedToken) {
      if (persistUser) {
        localStorage.setItem("encToken", response.payload.encodedToken);

        localStorage.setItem(
          "currentUser",
          JSON.stringify(response.payload.foundUser)
        );
      } else {
        sessionStorage.setItem("encToken", response.payload.encodedToken);
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(response.payload.foundUser)
        );
      }

      // navigate(location.state?.from || "/", { replace: true });
      // CROSS CHECK THE AVAILABILITY OF ENCODED TOKEN1
    }
  };

  return (
    <div className="login-page" onClick={() => setBackgroundIsBlurred(false)}>
      <div
        className={`background-gif-wrapper ${
          backgroundIsBlurred
            ? "mdm-blur mdm-transition-all"
            : "mdm-transition-all"
        }`}
      >
        <img
          className="background-gif"
          src="https://i.pinimg.com/originals/93/b9/c3/93b9c34a3009c61a0748e67eab1f7976.gif"
          alt="spinning planet"
        />
      </div>

      <div
        className="login"
        onClick={(e) => {
          e.stopPropagation();
          setBackgroundIsBlurred(true);
        }}
      >
        <h1 className="login-heading ">Login</h1>
        <form
          className="login-content"
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler(userCred, persistUser);
          }}
        >
          <input
            type="email"
            placeholder="Email"
            title="Email"
            className="input-txt"
            ref={emailInputRef}
            value={email}
            onChange={(e) =>
              setUserCred((prevObj) => ({ ...prevObj, email: e.target.value }))
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            title="Password"
            className="input-txt"
            value={password}
            onChange={(e) =>
              setUserCred((prevObj) => ({
                ...prevObj,
                password: e.target.value,
              }))
            }
            required
          />
          <div className="remember-me-wrapper">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={persistUser}
              onChange={() => setPersistUser((prevBool) => !prevBool)}
            />
            <label htmlFor="remember-me" className="user-select-none">
              Remember Me
            </label>
          </div>
          {hasError && <AlertBox alertContent={{ type: "danger", message }} />}
          <button
            disabled={isLoading || !email || !password}
            className={`btn btn-cta ${
              (isLoading || !email || !password) && "disabled"
            }`}
            type="submit"
          >
            <span>Login</span>
          </button>
          <button
            disabled={isLoading}
            className={`btn btn-secondary ${isLoading && "disabled"}`}
            onClick={() =>
              setUserCred((prevObj) => ({
                ...prevObj,
                email: "johndoe@gmail.com",
                password: "johnDoe@#123",
              }))
            }
          >
            Guest Mode
          </button>
        </form>
        <div className="flex-justify-spc-btwn">
          <button
            className="btn-link fs-sml"
            onClick={() => navigate("/signup")}
          >
            Sign up instead
          </button>
          <button className="btn-link fs-sml">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

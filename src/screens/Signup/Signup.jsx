import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAllUsersHandler } from "../../backend/controllers/UsersController";
import AlertBox from "../../components/AlertBox/AlertBox";
//import { useAuthContext } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
//import { toast } from "react-toastify";
import {
  getAllUsersService,
  signupService,
  verifyEmailService,
} from "../../services/AuthServices";
import {
  resetAuthAction,
  setAuthMessageAction,
  setHasErrorAction,
  setIsLoadingAction,
  signup,
} from "../../redux/features/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  //const { authObj, setAuthObj } = useAuthContext();
  const auth = useSelector((storeState) => storeState.auth);
  const { hasError, message, isLoading } = auth;

  const [userDetails, setUserDetails] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [clientSideAuth, setClientSideAuth] = useState({
    takenUserNames: [],
    registeredEmails: [],
    matchPassword: "",
    emailVerificationMessage: "",
    authenticateUser: false,
    emailVerificationErrorCount: 0,
  });
  const [backgroundIsBlurred, setBackgroundIsBlurred] = useState(false);
  const userNameInputRef = useRef();
  useEffect(() => userNameInputRef.current.focus(), []);
  const { userName, firstName, lastName, email, password } = userDetails;
  const {
    takenUserNames,
    registeredEmails,
    matchPassword,
    emailVerificationMessage,
    authenticateUser,
    emailVerificationErrorCount,
  } = clientSideAuth;
  const STRONG_PASSWORD_REGEX = new RegExp(
    /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?=.*?[#?!@$%^&*-])).{8,}/
  );

  const getAllUsersHandler = async () => {
    try {
      const resp = await getAllUsersService();

      const takenUserNames = resp.data.users.map((user) => user.userName);
      const registeredEmails = resp.data.users.map((user) => user.email);
      setClientSideAuth((prevObj) => ({
        ...prevObj,
        takenUserNames,
        registeredEmails,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => dispatch(resetAuthAction());
  }, []);

  useEffect(() => {
    getAllUsersHandler();
  }, []);

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      if (hasError) {
        dispatch(resetAuthAction());
      }
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [hasError]);

  /* To implement:- custom  alert on insufficient password input
  const analyzePassword = (passwordInput) => {
    /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?=.*?[#?!@$%^&*-])).{8,}/
  };
  */

  const signupHandler = async (userDetails) => {
    const resp = await dispatch(signup(userDetails));
    if (resp.payload.encodedToken) {
      navigate(location.state?.form?.pathname || "/");
    }
  };

  useEffect(() => {
    if (authenticateUser) {
      (async () => {
        await signupHandler(userDetails);
      })();
    }
  }, [authenticateUser]);

  const verifyEmailInputHandler = async (emailInput) => {
    try {
      const response = await verifyEmailService(emailInput);
      const {
        autocorrect,
        deliverability,
        is_valid_format: isValidFormat,
      } = response;
      //setClientSideAuth((prevObj) => ({ ...prevObj, isLoading: false }));
      dispatch(setIsLoadingAction(false));

      if (autocorrect) {
        setClientSideAuth((prevObj) => ({
          ...prevObj,
          emailVerificationMessage: `Invalid email, did you mean '${autocorrect}' ?`,
        }));
        return;
      } else if (deliverability === "DELIVERABLE") {
        setClientSideAuth((prevObj) => ({
          ...prevObj,
          authenticateUser: true,
          emailVerificationMessage: "",
        }));
        return;
      } else if (!isValidFormat.value) {
        setClientSideAuth((prevObj) => ({
          ...prevObj,
          emailVerificationMessage: "Invalid format",
        }));
        return;
      } else if (deliverability === "UNDELIVERABLE") {
        setClientSideAuth((prevObj) => ({
          ...prevObj,
          emailVerificationMessage: "Email Not Found",
        }));
        return;
      }
      setClientSideAuth((prevObj) => ({
        ...prevObj,
        emailVerificationMessage: "",
        authenticateUser: true,
      }));
      return;
    } catch (error) {
      setClientSideAuth((prevObj) => ({
        ...prevObj,
        emailVerificationErrorCount: prevObj.emailVerificationErrorCount + 1,
      }));

      if (emailVerificationErrorCount >= 1) {
        setClientSideAuth((prevObj) => ({
          ...prevObj,
          emailVerificationMessage: "",
          authenticateUser: true,
        }));
        return;
      }
      /*
      setAuthObj((prevObj) => ({
        ...prevObj,
        signupError: "Couldn't verify email, please try again",
      }));
      */
      dispatch(setAuthMessageAction("Couldn't verify email, please try again"));
      dispatch(setIsLoadingAction(false));
      dispatch(setHasErrorAction(true));
    }
  };
  const syncSetTimeout = (execFunc, funcInput, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        execFunc(funcInput);
        resolve();
      }, delay);
    });
  };

  const submitBtnHandler = async (clientDetails) => {
    const { email } = clientDetails;
    /* setClientSideAuth((prevObj) => ({ ...prevObj, isLoading: true })); */
    dispatch(setIsLoadingAction(true));

    await syncSetTimeout(verifyEmailInputHandler, email, 1400);
  };

  const setSubmitBtnState = (userDetails, auth) => {
    const { userName, password, email } = userDetails;
    const { takenUserNames, registeredEmails, matchPassword } = auth;

    if (
      userName &&
      !takenUserNames.includes(userName) &&
      email &&
      !registeredEmails.includes(email) &&
      password &&
      STRONG_PASSWORD_REGEX.test(password) &&
      password === matchPassword &&
      !emailVerificationMessage
    ) {
      return false;
    }
    return true;
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
        className="signup"
        onClick={(e) => {
          e.stopPropagation();
          setBackgroundIsBlurred(true);
        }}
      >
        <h1 className="login-heading ">Signup</h1>
        <form
          className="login-content"
          onSubmit={(e) => {
            e.preventDefault();
            submitBtnHandler(userDetails);
          }}
        >
          <input
            type="text"
            placeholder="Username"
            title="Username"
            className="input-txt"
            onChange={(e) =>
              setUserDetails((prevObj) => ({
                ...prevObj,
                userName: e.target.value,
              }))
            }
            value={userName}
            required
            ref={userNameInputRef}
          />
          {takenUserNames.includes(userName) && (
            <AlertBox
              alertContent={{
                type: "danger",
                message: "Username already taken",
              }}
            />
          )}
          <input
            type="text"
            placeholder="First name"
            title="First name"
            className="input-txt"
            onChange={(e) =>
              setUserDetails((prevObj) => ({
                ...prevObj,
                firstName: e.target.value,
              }))
            }
            value={firstName}
            required
          />

          <input
            type="text"
            placeholder="Last name"
            title="Last name"
            className="input-txt"
            onChange={(e) =>
              setUserDetails((prevObj) => ({
                ...prevObj,
                lastName: e.target.value,
              }))
            }
            value={lastName}
            required
          />

          <input
            type="email"
            placeholder="Email"
            title="Email"
            className="input-txt"
            required
            onChange={(e) => {
              setUserDetails((prevObj) => ({
                ...prevObj,
                email: e.target.value,
              }));

              setClientSideAuth((prevObj) => ({
                ...prevObj,
                emailVerificationMessage: "",
              }));
            }}
            value={email}
          />

          {emailVerificationMessage && (
            <AlertBox
              alertContent={{
                type: "danger",
                message: emailVerificationMessage,
              }}
            />
          )}
          {registeredEmails.includes(email) && (
            <AlertBox
              alertContent={{
                type: "danger",
                message: "email already exists",
              }}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            title="Password"
            className="input-txt"
            onChange={(e) => {
              setClientSideAuth((prevObj) => ({
                ...prevObj,
                matchPassword: e.target.value,
              }));
            }}
            required
            pattern="^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?=.*?[#?!@$%^&*-])).{8,}"
          />
          {matchPassword && !STRONG_PASSWORD_REGEX.test(matchPassword) && (
            <AlertBox
              alertContent={{
                type: "danger",
                message:
                  "Your password must be at least 8 characters long, contain at least one number, one special character and have a mixture of uppercase and lowercase letters.",
              }}
            />
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            title="Confirm Password"
            className="input-txt"
            onChange={(e) => {
              setUserDetails((prevObj) => ({
                ...prevObj,
                password: e.target.value,
              }));
            }}
            required
          />
          {password && password !== matchPassword && (
            <AlertBox
              alertContent={{
                type: "danger",
                message: "Password didn't match",
              }}
            />
          )}
          {hasError && <AlertBox alertContent={{ type: "danger", message }} />}

          <button
            // onClick={() => submitBtnHandler(userDetails)}
            className={`btn btn-cta ${
              isLoading || setSubmitBtnState(userDetails, clientSideAuth)
                ? "disabled"
                : ""
            }`}
            disabled={
              isLoading || setSubmitBtnState(userDetails, clientSideAuth)
            }
          >
            <span>{isLoading ? "Loading" : "Signup"}</span>
          </button>
        </form>
        <div className="flex-center">
          <div className="fs-sml">
            Have an account? <Link to="/login">login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

//TODO
//Ditch Mockbee
//Ditch FireBase
// Use Express + Mogoose

//Set up tutorial

// ENSURE EVERYTHING WORKS PROPERLY IN AUTH

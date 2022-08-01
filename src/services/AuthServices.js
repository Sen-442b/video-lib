import axios from "axios";

export const signupService = async (userDetails) => {
  const resp = await axios.post("/api/auth/signup", userDetails);
  if (resp.data) {
    localStorage.setItem("encToken", resp.data.encodedToken);
    localStorage.setItem("currentUser", JSON.stringify(resp.data.createdUser));
  }
  return resp;
};

export const verifyEmailService = async (emailInput) => {
  const resp = await fetch(
    `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_EMAIL_VRFY_KEY}&email=${emailInput}`
  );
  const data = await resp.json();
  return data;
};

export const getAllUsersService = async () => {
  const resp = await axios.get("/api/users");
  return resp;
};

export const loginService = async (email, password) => {
  const resp = await axios.post("/api/auth/login", { email, password });

  return resp;
};

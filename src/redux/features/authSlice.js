import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService, signupService } from "../../services/AuthServices";

const initialState = {
  authToken:
    localStorage.getItem("encToken") ||
    sessionStorage.getItem("encToken") ||
    "",
  currentUserDetails:
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(sessionStorage.getItem("currentUser")) ||
    "",
  hasError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const signup = createAsyncThunk(
  "auth/signup",
  async (userDetails, thunkAPI) => {
    try {
      const response = await signupService(userDetails);
      return response.data;
    } catch (error) {
      console.log(error);
      const { rejectWithValue } = thunkAPI;
      if (error.response.status !== 500) {
        return rejectWithValue(error.response.data.errors[0]);
      } else {
        return rejectWithValue("An error occurred. please try again");
      }
    }
  }
);
const login = createAsyncThunk(
  "auth/login",
  async (userCredentials, thunkAPI) => {
    try {
      const { email, password } = userCredentials;

      const response = await loginService(email, password);
      return response.data;
    } catch (error) {
      console.log(error);
      const { rejectWithValue } = thunkAPI;
      if (error.response.status !== 500) {
        return rejectWithValue(error.response.data.errors[0]);
      } else {
        return rejectWithValue("An error occurred. please try again");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthAction: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.hasError = false;
      state.message = "";
    },

    logoutAction: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.hasError = false;
      state.message = "";
      (state.authToken = ""), (state.currentUserDetails = "");
    },
    setAuthMessageAction: (state, action) => {
      state.message = action.payload;
    },
    setIsLoadingAction: (state, action) => {
      state.isLoading = action.payload;
    },
    setHasErrorAction: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.authToken = action.payload.encodedToken;
      state.currentUserDetails = action.payload.foundUser;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [signup.rejected]: (state, action) => {
      state.hasError = true;
      state.message = action.payload; //ensure proper error handling
      state.isLoading = false;
      state.isSuccess = false;

      state.isLoading = false;
      state.user = "";
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.authToken = action.payload.encodedToken;
      state.currentUserDetails = action.payload.foundUser;
    },
    [login.rejected]: (state, action) => {
      state.hasError = true;
      state.message = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
});

const {
  resetAuthAction,
  setAuthMessageAction,
  setIsLoadingAction,
  setHasErrorAction,
  logoutAction,
} = authSlice.actions;
const authSliceReducer = authSlice.reducer;

export {
  authSliceReducer,
  resetAuthAction,
  setAuthMessageAction,
  setIsLoadingAction,
  setHasErrorAction,
  signup,
  login,
  logoutAction,
};

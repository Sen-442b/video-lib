import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import {
  deleteWatchLaterVideoService,
  getWatchLaterVideosService,
  postWatchLaterVideoService,
} from "../../services/WatchLaterServices";

const initialState = {
  watchLater: [],
  isLoading: false,
  hasError: false,
  message: "",
};

const getWatchLaterVideosAction = createAsyncThunk(
  "watchLater/getWatchLater",
  async (encodedToken, thunkAPI) => {
    try {
      const response = await getWatchLaterVideosService(encodedToken);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const postWatchLaterVideoAction = createAsyncThunk(
  "watchLater/postWatchLater",
  async (data, thunkAPI) => {
    try {
      const { encodedToken, video } = data;

      const response = await postWatchLaterVideoService(encodedToken, video);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteWatchLaterVideoAction = createAsyncThunk(
  "watchLater/deleteWatchLater",
  async (data, thunkAPI) => {
    try {
      const { encodedToken, videoId } = data;
      const response = await deleteWatchLaterVideoService(
        encodedToken,
        videoId
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

//Async Callbacks
const pendingStateCallBack = (state) => {
  state.isLoading = true;
};

const fulfilledStateCallback = (state, action) => {
  state.isLoading = false;
  state.hasError = false;
  state.message = "";
  state.watchLater = action.payload.watchlater;
};
const rejectedStateCallBack = (state, action) => {
  state.isLoading = false;
  state.hasError = true;
  state.message = action.payload;
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {},
  extraReducers: {
    [getWatchLaterVideosAction.loading]: pendingStateCallBack,
    [getWatchLaterVideosAction.fulfilled]: fulfilledStateCallback,
    [getWatchLaterVideosAction.rejected]: rejectedStateCallBack,
    [postWatchLaterVideoAction.loading]: pendingStateCallBack,

    [postWatchLaterVideoAction.fulfilled]: fulfilledStateCallback,
    [postWatchLaterVideoAction.rejected]: rejectedStateCallBack,
    [deleteWatchLaterVideoAction.pending]: pendingStateCallBack,
    [deleteWatchLaterVideoAction.fulfilled]: fulfilledStateCallback,
    [deleteWatchLaterVideoAction.rejected]: pendingStateCallBack,
  },
});

const watchLaterSliceReducer = watchLaterSlice.reducer;

export {
  watchLaterSliceReducer,
  getWatchLaterVideosAction,
  postWatchLaterVideoAction,
  deleteWatchLaterVideoAction,
};

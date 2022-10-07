import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import {
  deleteWatchLaterVideoService,
  getWatchLaterVideosService,
  postWatchLaterVideoService,
  replaceWatchLaterVideosService,
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
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);
const replaceWatchLaterVideosAction = createAsyncThunk(
  "watchLater/replaceWatchLater",
  async (data, thunkAPI) => {
    try {
      const { encodedToken, updatedWatchLater } = data;
      const response = await replaceWatchLaterVideosService(
        encodedToken,
        updatedWatchLater
      );
      return response.data;
    } catch (error) {
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

const fulfilledStateCallBack = (state, action) => {
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
  reducers: {
    updateLocalWatchLaterAction: (state, action) => {
      state.watchLater = action.payload;
    },
  },
  extraReducers: {
    [getWatchLaterVideosAction.loading]: pendingStateCallBack,
    [getWatchLaterVideosAction.fulfilled]: fulfilledStateCallBack,
    [getWatchLaterVideosAction.rejected]: rejectedStateCallBack,
    [postWatchLaterVideoAction.loading]: pendingStateCallBack,

    [postWatchLaterVideoAction.fulfilled]: fulfilledStateCallBack,
    [postWatchLaterVideoAction.rejected]: rejectedStateCallBack,

    [replaceWatchLaterVideosAction.loading]: pendingStateCallBack,
    [replaceWatchLaterVideosAction.fulfilled]: fulfilledStateCallBack,
    [replaceWatchLaterVideosAction.rejected]: rejectedStateCallBack,

    [deleteWatchLaterVideoAction.pending]: pendingStateCallBack,
    [deleteWatchLaterVideoAction.fulfilled]: fulfilledStateCallBack,
    [deleteWatchLaterVideoAction.rejected]: pendingStateCallBack,
  },
});

const watchLaterSliceReducer = watchLaterSlice.reducer;
const { updateLocalWatchLaterAction } = watchLaterSlice.actions;
export {
  watchLaterSliceReducer,
  getWatchLaterVideosAction,
  postWatchLaterVideoAction,
  replaceWatchLaterVideosAction,
  deleteWatchLaterVideoAction,
  updateLocalWatchLaterAction,
};

//TODO

//Figure out how to add/remove video from a playlist using the mock api also make sure that you are implementing debouncing for this feature

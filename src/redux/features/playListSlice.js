import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createPlayListService,
  deleteVideoFromPlayListService,
  getPlayListsVideosService,
  postVideoToPlayListService,
} from "../../services/PlayListsServices";

const initialState = {
  playListsArr: [],
  isLoading: false,
  message: "",
  hasError: false,
};

const getPlayListsVideosAction = createAsyncThunk(
  "playLists/getPlayLists",
  async (encodedToken, thunkAPI) => {
    try {
      const response = await getPlayListsVideosService(encodedToken);

      return response.playlists;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const createPlayListAction = createAsyncThunk(
  "playLists/createPlayList",
  async (data, thunkAPI) => {
    try {
      const { encodedToken, playList } = data;
      const response = await createPlayListService(encodedToken, playList);

      return response.data.playlists;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const postVideoToPlayListAction = createAsyncThunk(
  "playLists/addVideoToPlayList",
  async (data, thunkAPI) => {
    try {
      const { encodedToken, playlistId, video } = data;
      console.log(video);

      const response = await postVideoToPlayListService(
        encodedToken,
        playlistId,
        video
      );
      console.log(response);

      return response.data.playlist;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);
const deleteVideoFromPlayListAction = createAsyncThunk(
  "playLists/deleteVideoFromPlayList",
  async (data, thunkAPI) => {
    try {
      const { encodedToken, playlistId, videoId } = data;
      console.log(data);
      const response = await deleteVideoFromPlayListService(
        encodedToken,
        playlistId,
        videoId
      );
      console.dir(response);
      return response.data.playlist;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const pendingStateCallBack = (state) => {
  state.isLoading = true;
};
const fulfilledStateCallBack = (state, action) => {
  state.isLoading = false;
  state.hasError = false;
  state.message = "";
  state.playListsArr = action.payload;
};

const rejectedStateCallBack = (state, action) => {
  state.isLoading = false;
  state.hasError = true;
  state.message = action.payload;
};

const updatePlayListCallBack = (state, action) => {
  state.isLoading = false;
  state.hasError = false;
  state.message = "";

  state.playListsArr = state.playListsArr.map((playList) =>
    playList._id === action.payload._id ? action.payload : playList
  );
};

const playListsSlice = createSlice({
  name: "playLists",
  initialState,
  reducers: {
    toggleHasErrorAction: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: {
    [getPlayListsVideosAction.pending]: pendingStateCallBack,
    [getPlayListsVideosAction.fulfilled]: fulfilledStateCallBack,
    [getPlayListsVideosAction.rejected]: rejectedStateCallBack,
    [createPlayListAction.pending]: pendingStateCallBack,
    [createPlayListAction.fulfilled]: fulfilledStateCallBack,
    [createPlayListAction.rejected]: rejectedStateCallBack,
    [postVideoToPlayListAction.pending]: pendingStateCallBack,
    [postVideoToPlayListAction.fulfilled]: updatePlayListCallBack,
    [postVideoToPlayListAction.rejected]: rejectedStateCallBack,
    [deleteVideoFromPlayListAction.pending]: pendingStateCallBack,
    [deleteVideoFromPlayListAction.fulfilled]: updatePlayListCallBack,
    [deleteVideoFromPlayListAction.rejected]: rejectedStateCallBack,
  },
});

export const playListsReducer = playListsSlice.reducer;
const { toggleHasErrorAction } = playListsSlice.actions;
export {
  toggleHasErrorAction,
  getPlayListsVideosAction,
  createPlayListAction,
  postVideoToPlayListAction,
  deleteVideoFromPlayListAction,
};

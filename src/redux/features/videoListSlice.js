import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getVideoListService } from "../../services/VideoListServices";

const initialState = {
  videoList: [],
  filter: "",
  isLoading: false,
  hasError: false,
  message: "",
};

const getVideoListAction = createAsyncThunk(
  "videoList/getVideoListAction",
  async (_, thunkAPI) => {
    try {
      const response = await getVideoListService();

      if (response.status === 200) {
        console.log(response.data.videos);
        return response.data.videos;
      }
      throw response;
    } catch (error) {
      console.log("triggered");
      thunkAPI.rejectWithValue(error); //ensure proper budget handling
    }
  }
);

const videoListSlice = createSlice({
  name: "videoList",
  initialState,
  reducers: {
    filterSelectedCategoryAction: (state, action) => {
      state.filter = state.filter === action.payload ? "" : action.payload;
    },
  },

  extraReducers: {
    [getVideoListAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideoListAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.hasError = false;
      state.videoList = action.payload;
    },
    [getVideoListAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.message = action.payload;
    },
  },
});

const { filterSelectedCategoryAction } = videoListSlice.actions;
const videoListSliceReducer = videoListSlice.reducer;

export {
  videoListSliceReducer,
  filterSelectedCategoryAction,
  getVideoListAction,
};

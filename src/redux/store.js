import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./features/authSlice";
import { videoListSliceReducer } from "./features/videoListSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    videoList: videoListSliceReducer,
  },
});

export { store };

import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./features/authSlice";
import { playListsReducer } from "./features/playListSlice";
import { videoListSliceReducer } from "./features/videoListSlice";
import { watchLaterSliceReducer } from "./features/watchLaterSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    videoList: videoListSliceReducer,
    watchLater: watchLaterSliceReducer,
    playLists: playListsReducer,
  },
});

export { store };

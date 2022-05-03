import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getVideoListService } from "../services/VideoListServices";

const VideoListContext = createContext(null);

const videoListReducer = (state, action) => {
  switch (action.type) {
    case "GET_VIDEO_LIST":
      return { ...state, videoList: action.payload };
      break;

    default:
      break;
  }
};
const initObj = {
  videoList: [],
};
const VideoListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoListReducer, initObj);
  const getVideoListHandler = async () => {
    try {
      const { status, data } = await getVideoListService();

      if (status === 200) {
        console.log(data.videos);
        dispatch({ type: "GET_VIDEO_LIST", payload: data.videos });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getVideoListHandler(), []);
  return (
    <VideoListContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoListContext.Provider>
  );
};

const useVideoListContext = () => useContext(VideoListContext);

export { VideoListContextProvider, useVideoListContext };
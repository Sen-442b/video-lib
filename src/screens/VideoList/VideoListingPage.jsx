import React, { useEffect } from "react";
//import { useVideoListContext } from "../../context/VideoListContext";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import {
  filterSelectedCategoryAction,
  getVideoListAction,
} from "../../redux/features/videoListSlice";

const VideoListingPage = () => {
  //const { state, dispatch } = useVideoListContext();

  const dispatch = useDispatch();
  const videoListState = useSelector((storeState) => storeState.videoList);
  const { videoList, filter } = videoListState;

  useEffect(() => {
    return () => dispatch(filterSelectedCategoryAction(""));
  }, []);
  useEffect(() => dispatch(getVideoListAction()), []);

  const getFilteredCategory = (videoList, filter) => {
    const filteredVideoList = videoList.filter(
      (video) => video.category === filter
    );
    return filteredVideoList.length !== 0 ? filteredVideoList : videoList;
  };

  return (
    <div>
      <div className="chips-wrapper">
        {videoList.length !== 0 &&
          videoList
            .reduce(
              (acc, cv) =>
                !acc.includes(cv.category) ? [...acc, cv.category] : acc,
              []
            )
            .map((category, index) => (
              <div
                key={index}
                className={
                  category === filter
                    ? "chip fs-sml chip-active "
                    : "chip fs-sml"
                }
                onClick={() => dispatch(filterSelectedCategoryAction(category))}
              >
                {category}
              </div>
            ))}
      </div>
      <div className="video-card-wrapper">
        {videoList.length !== 0 &&
          getFilteredCategory(videoList, filter).map((videoObj) => (
            <VideoCard key={videoObj._id} videoObj={videoObj} />
          ))}
      </div>
    </div>
  );
};

export default VideoListingPage;

import React, { useEffect } from "react";
import { useVideoListContext } from "../../context/VideoListContext";
import VideoCard from "./VideoCard";

const VideoListingPage = () => {
  const { state, dispatch } = useVideoListContext();
  const { videoList, filter } = state;
  useEffect(() => {
    return () => dispatch({ type: "FILTER_SELECTED_CATEGORY", payload: "" });
  }, []);

  const getFilteredCategory = (videoList) => {
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
                onClick={() =>
                  dispatch({
                    type: "FILTER_SELECTED_CATEGORY",
                    payload: category,
                  })
                }
              >
                {category}
              </div>
            ))}
      </div>
      <div className="video-card-wrapper">
        {videoList.length !== 0 &&
          getFilteredCategory(videoList).map((videoObj) => (
            <VideoCard key={videoObj._id} videoObj={videoObj} />
          ))}
      </div>
    </div>
  );
};

export default VideoListingPage;

import React, { useRef } from "react";
import getViewsUnit from "../../utils/getViewsUnit";
import { useState, useEffect } from "react";
/*
const useIsDocumentClicked = (ref) => {
  const [isOutsideComponentClicked, setIsOutsideComponentClicked] =
    useState(false);
  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOutsideComponentClicked(true);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  return isOutsideComponentClicked;
};
*/
const VideoCard = ({ videoObj }) => {
  const { _id, title, description, creator, views, uploadDate } = videoObj;
  const [displayEllipsis, setDisplayEllipsis] = useState(false);
  const [displayMenuItems, setDisplayMenuItems] = useState(false);
  const videoCardRef = useRef(null);
  // const isParentClicked = useIsDocumentClicked(videoCardRef);
  // console.log(isParentClicked);
  //PROJECT ON HOLD, START FROM COMPONENT OUTSIDE CLICK
  return (
    <div
      className="video-card"
      onMouseOver={() => setDisplayEllipsis(true)}
      onMouseLeave={() => {
        !displayMenuItems && setDisplayEllipsis(false);
      }}
      ref={videoCardRef}
    >
      <img
        src={`https://i.ytimg.com/vi/${_id}/maxresdefault.jpg`}
        alt={title + " thumbnail"}
        className="channel-avatar"
      />
      <div className="video-desc">
        <img
          src="https://yt3.ggpht.com/ytc/AKedOLQX01z9397d0IgR7uW_Spo6odKET6mPUe0ChNb5cg=s176-c-k-c0x00ffffff-no-rj"
          alt=""
          title={creator}
          className="video-desc-avatar"
        />
        <div className="video-content">
          <div>{title}</div>
          <div className="light-text-color">{creator}</div>
          <div className="fs-sml light-text-color">
            <span>{getViewsUnit(views)} </span>•<span> {uploadDate}</span>
          </div>
        </div>
        <div>
          <button
            className="unset-all btn-ellipsis cursor-pointer"
            style={{ visibility: displayEllipsis ? "visible" : "hidden" }}
            onClick={() => setDisplayMenuItems((prevBool) => !prevBool)}
            onBlur={() => setDisplayMenuItems(false)}
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
            {displayMenuItems && (
              <div className="menu-wrapper">
                <div className="menu-item">
                  <span>
                    <i className="fas fa-clock"></i>
                  </span>
                  <p>Save to Watch Later</p>
                </div>
                <div className="menu-item">
                  <span>
                    <i className="fas fa-list"></i>
                  </span>
                  <p>Save to Playlist</p>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

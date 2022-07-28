import React from "react";
import getViewsUnit from "../../utils/getViewsUnit";

const VideoCard = ({ videoObj }) => {
  const { _id, title, description, creator, views, uploadDate } = videoObj;

  return (
    <div className="video-card">
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
        <button className="unset-all">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>
    </div>
  );
};

export default VideoCard;

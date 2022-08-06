import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteWatchLaterVideoAction } from "../../redux/features/watchLaterSlice";
import { getVideoThumbnail } from "../../utils/getVideoThumbnail";

const WatchLaterCard = ({ watchLaterObj }) => {
  const [displayEllipsis, setDisplayEllipsis] = useState(false);
  const [displayMenuItems, setDisplayMenuItems] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((storeState) => storeState.auth);
  const { _id, title, creator } = watchLaterObj;

  return (
    <div
      className="content-main"
      onMouseOver={() => setDisplayEllipsis(true)}
      onMouseLeave={() => !displayMenuItems && setDisplayEllipsis(false)}
    >
      <i className="fas fa-grip-lines cursor-grab"></i>
      <div className="content-thumbnail-wrapper">
        <img
          src={getVideoThumbnail(_id)}
          alt={title}
          className="content-thumbnail"
        />
        <span className="content-duration">3:31</span>
      </div>
      <div className="content-details">
        <div>
          <p className="typography-para">{title}</p>
          <p className="typography-para-light">{creator}</p>
        </div>
        <div>
          <button
            className={`unset-all btn-ellipsis cursor-pointer ${
              displayEllipsis ? "vis-visible cursor-pointer" : "vis-hidden"
            }`}
            title="Menu"
            onClick={() => {
              setDisplayMenuItems((prevBool) => !prevBool);
            }}
            onBlur={() => {
              setDisplayMenuItems(false);
            }}
          >
            <i className="fas fa-ellipsis-v"></i>

            {displayMenuItems && (
              <div className="menu-wrapper">
                <div
                  className="menu-item"
                  role="button"
                  onClick={() => {
                    dispatch(
                      deleteWatchLaterVideoAction({
                        encodedToken: authState.authToken,
                        videoId: _id,
                      })
                    );
                  }}
                >
                  <span>
                    <i className="fas fa-trash"></i>
                  </span>
                  <p>Remove From Watch Later</p>
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

export default WatchLaterCard;

//TODO
//Remove From Playlist
//Sort Functionality
//Draggable Video Cards

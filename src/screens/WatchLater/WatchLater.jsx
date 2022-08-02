import React, { useState } from "react";

const WatchLater = () => {
  const [displayEllipsis, setDisplayEllipsis] = useState(false);
  const [displayMenuItems, setDisplayMenuItems] = useState(false);
  return (
    <div
      className="watch-later-wrapper"
      onMouseOver={() => setDisplayEllipsis(true)}
      onMouseLeave={() => !displayMenuItems && setDisplayEllipsis(false)}
    >
      <div className="watch-later-overview">
        <div className="overview-thumbnail-wrapper">
          <img
            className="overview-thumbnail"
            src="https://pub-static.fotor.com/assets/projects/export/jpg/72db1df4-cdc9-443f-93d7-ae4aa1ffcc36.jpg"
            alt=""
          />
          <p className="overview-thumbnail-overlay">Play All</p>
        </div>
        <div className="overview-content">
          <h3 className="typography-heading-3">Watch Later</h3>
          <div className="overview-content-actions">
            <p>230 videos</p>
            <i className="fas fa-random" title="Shuffle"></i>
            <i className="fas fa-plus" title="Add Videos"></i>
          </div>
        </div>
      </div>

      <div className="watch-later-content">
        <div className="content-sort">
          <i
            className="fas fa-sort-amount-up"
            id="watch-later-sort"
            role="button"
          ></i>
          <label htmlFor="watch-later-sort" className="fw-heavy">
            SORT
          </label>
        </div>
        <div className="content-main">
          <i className="fas fa-grip-lines cursor-grab"></i>
          <div className="content-thumbnail-wrapper">
            <img
              src="https://pub-static.fotor.com/assets/projects/export/jpg/72db1df4-cdc9-443f-93d7-ae4aa1ffcc36.jpg"
              alt=""
              className="content-thumbnail"
            />
            <span className="content-duration">3:31</span>
          </div>
          <div className="content-details">
            <div>
              <p className="typography-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="typography-para-light">Creator's Name</p>
            </div>
            <div
              className={
                displayEllipsis ? "vis-visible cursor-pointer" : "vis-hidden"
              }
              role="button"
            >
              <button
                className="unset-all"
                title="Menu"
                onClick={() => {
                  setDisplayMenuItems((prevBool) => !prevBool);
                }}
                onBlur={() => {
                  console.log("triggered");
                  setDisplayMenuItems(false);
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              {displayMenuItems && (
                <div className="menu-wrapper">
                  <div className="menu-item">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchLater;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWatchLaterVideosAction,
  postWatchLaterVideoAction,
} from "../../redux/features/watchLaterSlice";
import WatchLaterCard from "./WatchLaterCard";

const WatchLater = () => {
  const dispatch = useDispatch();
  const watchLaterState = useSelector((storeState) => storeState.watchLater);
  const { watchLater } = watchLaterState;
  return (
    <div className="watch-later-wrapper">
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
        {watchLater.length !== 0 &&
          watchLater.map((watchLaterObj) => {
            return (
              <WatchLaterCard
                key={watchLaterObj._id}
                watchLaterObj={watchLaterObj}
              />
            );
          })}
      </div>
    </div>
  );
};

export default WatchLater;

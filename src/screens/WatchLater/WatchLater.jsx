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
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [dateSortType, setDateSortType] = useState("");
  const { watchLater } = watchLaterState;
  ["2", "3"];
  const sortByDate = (dataArr, type) => {
    if (type === "newToOld") {
      return [...dataArr].sort((videoCardOne, videoCardTwo) => {
        return (
          new Date(videoCardTwo.uploadDate) - new Date(videoCardOne.uploadDate)
        );
      });
    } else if (type === "oldToNew") {
      return [...dataArr].sort((videoCardOne, videoCardTwo) => {
        return (
          new Date(videoCardOne.uploadDate) - new Date(videoCardTwo.uploadDate)
        );
      });
    }
    return dataArr;
  };

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
            <p>{watchLater.length} videos</p>
            <i className="fas fa-random" title="Shuffle"></i>
            <i className="fas fa-plus" title="Add Videos"></i>
          </div>
        </div>
      </div>

      <div className="watch-later-content">
        <div className="content-sort">
          <span
            style={{ backgroundColor: "red" }}
            role="button"
            onClick={() => setIsSortMenuOpen((prevBool) => !prevBool)}
            onBlur={() => {
              console.log("blur event triggered");
              setIsSortMenuOpen(false);
            }}
            tabIndex="0"
          >
            <i className="fas fa-sort-amount-up" id="watch-later-sort"></i>
            <label htmlFor="watch-later-sort" className="fw-heavy">
              SORT
            </label>
            {isSortMenuOpen && (
              <div className="menu-wrapper-sort">
                <div
                  className="menu-item"
                  role="button"
                  onClick={() => setDateSortType("newToOld")}
                >
                  <p>Date added (newest)</p>
                </div>
                <div
                  className="menu-item"
                  role="button"
                  onClick={() => setDateSortType("oldToNew")}
                >
                  <p>Date added (oldest)</p>
                </div>
              </div>
            )}
          </span>
        </div>
        {watchLater.length !== 0 &&
          sortByDate(watchLater, dateSortType).map((watchLaterObj) => {
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

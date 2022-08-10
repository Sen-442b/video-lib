import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWatchLaterVideosAction,
  postWatchLaterVideoAction,
  replaceWatchLaterVideosAction,
  updateLocalWatchLaterAction,
} from "../../redux/features/watchLaterSlice";
import { replaceWatchLaterVideosService } from "../../services/WatchLaterServices";
import WatchLaterCard from "./WatchLaterCard";

const WatchLater = () => {
  const dispatch = useDispatch();
  const watchLaterState = useSelector((storeState) => storeState.watchLater);
  const authState = useSelector((storeState) => storeState.auth);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [dateSortType, setDateSortType] = useState("");
  const { watchLater } = watchLaterState;

  useEffect(() => {
    return () =>
      replaceWatchLaterVideosService(authState.authToken, watchLater);
  }, []);
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

  /*TO BE USED FOR BUILDING ADVANCE FEATURES
  const sortBySerialNumber = (dataArr) => {
    return [...dataArr].sort(
      (itemOne, itemTwo) => itemOne.srNum - itemTwo.srNum
    );
  };
  */

  /* TO BE USED WITH ADVANCE FEATURES
  const swapSerialNumbers = (watchLater, srNumOne, srNumTwo) => {
    if ((srNumOne || srNumOne === 0) && (srNumTwo || srNumTwo === 0)) {
      const updatedWatchLaterArr = watchLater.map((watchLaterObj) => {
        if (watchLaterObj.srNum === srNumOne) {
          return { ...watchLaterObj, srNum: srNumTwo };
        } else if (watchLaterObj.srNum === srNumTwo) {
          return { ...watchLaterObj, srNum: srNumOne };
        } else {
          return watchLaterObj;
        }
      });
      dispatch(updateLocalWatchLaterAction(updatedWatchLaterArr));
    }
  };
*/
  const swapArrIndex = (arr, dragData = "", dropData = "") => {
    setDateSortType("");
    if (dragData && dropData) {
      console.log(dragData);
      console.log(dropData);
      let updatedArr = [...arr];
      const { dragIndex, dragObj } = dragData;
      const { dropIndex, dropObj } = dropData;
      console.log(dropObj);
      updatedArr[dragIndex] = dropObj;
      updatedArr[dropIndex] = dragObj;

      dispatch(updateLocalWatchLaterAction(updatedArr));
    }
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
          sortByDate(watchLater, dateSortType).map(
            (watchLaterObj, index, array) => {
              return (
                <WatchLaterCard
                  key={watchLaterObj._id}
                  watchLaterObj={watchLaterObj}
                  watchLaterArr={array}
                  swapArrIndex={swapArrIndex}
                  index={index}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default WatchLater;

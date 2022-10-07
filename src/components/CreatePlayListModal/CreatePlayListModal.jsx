import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlayListAction,
  getPlayListsVideosAction,
  postVideoToPlayListAction,
} from "../../redux/features/playListSlice";

import Message from "../Message/Message";
import PlayListCheckboxes from "./PlayListCheckboxes";

const CreatePlayListModal = ({ setIsCreatePlayListModalOpen, video }) => {
  const [isAddNewPlayListOpen, setIsAddNewPlayListOpen] = useState(false);
  const [playListObj, setPlayListObj] = useState({ title: "" });
  const [recentPlayListTitle, setRecentPlayListTitle] = useState("");
  const [hasPlayListFormSubmitError, setHasPlayListFormSubmitError] =
    useState(false);

  const { title } = playListObj;
  const dispatch = useDispatch();
  const authState = useSelector((storeState) => storeState.auth);
  const playListsState = useSelector((storeState) => storeState.playLists);
  const { playListsArr, isLoading, hasError, message } = playListsState;

  console.log(playListsArr);

  useEffect(() => {
    dispatch(getPlayListsVideosAction(authState.authToken));
  }, []);

  useEffect(() => {
    if (recentPlayListTitle) {
      const recentPlayListId = playListsArr.find(
        (playList) => playList.title === recentPlayListTitle
      )._id;

      dispatch(
        postVideoToPlayListAction({
          encodedToken: authState.authToken,
          playlistId: recentPlayListId,
          video,
        })
      );
      setRecentPlayListTitle(false);
      setIsCreatePlayListModalOpen(false);
    }
  }, [playListsArr]);

  const handlePlayListInputChange = (e, hasPlayListError) => {
    if (hasPlayListError) {
      setHasPlayListFormSubmitError(false);
    }
    setPlayListObj((prevObj) => ({
      ...prevObj,
      title: e.target.value,
    }));
  };
  const playListFormHandler = (e, playListsArr, playListObj, encodedToken) => {
    e.preventDefault();

    const playListObjLowerCase = {
      ...playListObj,
      title: playListObj.title.trim().toLowerCase(),
    };

    const hasPlayList = playListsArr.some(
      (playList) => playList.title === playListObjLowerCase.title
    );
    if (hasPlayList) {
      setHasPlayListFormSubmitError(true);
    } else {
      dispatch(
        createPlayListAction({
          playList: playListObjLowerCase,
          encodedToken,
        })
      );
      setPlayListObj((prevObj) => ({ ...prevObj, title: "" }));
      setRecentPlayListTitle(playListObjLowerCase.title);
    }
  };

  return (
    <div
      className="modal-wrapper"
      onClick={() => {
        setIsCreatePlayListModalOpen(false);
      }}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Save to...</h3>
          <span
            role="button"
            onClick={() => setIsCreatePlayListModalOpen(false)}
          >
            <i className="fas fa-times cursor-pointer"></i>
          </span>
        </div>
        <div className="flex-gap-sml flex-column">
          {playListsArr.length !== 0 &&
            playListsArr.map(({ title, _id, videos }) => {
              return (
                <PlayListCheckboxes
                  title={title}
                  videos={videos}
                  video={video}
                  videoId={video._id}
                  key={_id}
                  playlistId={_id}
                />
              );
            })}
        </div>
        {isAddNewPlayListOpen ? (
          <>
            <form
              className="create-playlist-form"
              onSubmit={(e) =>
                playListFormHandler(
                  e,
                  playListsArr,
                  playListObj,
                  authState.authToken
                )
              }
            >
              <div className="app-input-wrapper">
                <input
                  type="text"
                  id="add-playlist"
                  placeholder="Enter Playlist Name"
                  className={`app-input ${
                    hasPlayListFormSubmitError ? "border-bottom-error" : ""
                  }`}
                  value={title}
                  onChange={(e) =>
                    handlePlayListInputChange(e, hasPlayListFormSubmitError)
                  }
                />
                <label htmlFor="add-playlist" className="app-input-label">
                  Enter Playlist Name...
                </label>

                <Message
                  text="Playlist already exists"
                  type="error"
                  size="small"
                  isHidden={hasPlayListFormSubmitError}
                />
              </div>
              <div className="playlist-btn-wrapper">
                <button
                  className={`btn btn-cta ${
                    title && !hasPlayListFormSubmitError && !isLoading
                      ? ""
                      : "disabled"
                  }`}
                >
                  <span>{isLoading ? "Loading" : "Create"}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div
            className="flex-gap-sml flex-center cursor-pointer modal-footer"
            role="button"
            onClick={() => setIsAddNewPlayListOpen(true)}
          >
            <span className="fs-lrg">
              <i className="far fa-plus"></i>
            </span>
            <p className="margin-0"> Create New Playlist</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePlayListModal;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVideoFromPlayListAction,
  postVideoToPlayListAction,
} from "../../redux/features/playListSlice";

const PlayListCheckboxes = ({ title, videos, video, videoId, playlistId }) => {
  const playListContainsVideo = videos.some(
    (videoObj) => videoObj._id === videoId
  );

  const [isChecked, setIsChecked] = useState(playListContainsVideo);
  const playListsState = useSelector((storeState) => storeState.playlists);
  const authState = useSelector((storeState) => storeState.auth);
  const { authToken: encodedToken } = authState;
  const dispatch = useDispatch();
  const toggleVideoInPlayList = (e) => {
    if (e.target.checked) {
      console.log("add to playList");
      if (!playListContainsVideo) {
        dispatch(
          postVideoToPlayListAction({ encodedToken, playlistId, video })
        );
      }
    } else {
      console.log("delete the video from playlist");
      //encodedToken playlistId videoId
      dispatch(
        deleteVideoFromPlayListAction({ encodedToken, playlistId, videoId })
      );
    }
  };

  const debounceFunc = (func, delay = 1000) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  const checkBoxChangeHandler = debounceFunc(toggleVideoInPlayList, 1000);

  return (
    <div>
      <input
        type="checkbox"
        name={title}
        id={title}
        className="app-checkbox"
        value={title}
        defaultChecked={isChecked}
        onChange={checkBoxChangeHandler}
      />

      <label htmlFor={title}>{title}</label>
    </div>
  );
};

export default PlayListCheckboxes;

//SOLVE THE CHECKBOX FEATURE ISSUE WHETHER TO DEBOUNCE IT OR DO IT ON COMPONENT UNMOUNT

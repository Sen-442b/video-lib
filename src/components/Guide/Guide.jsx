import React from "react";
import { useNavigate } from "react-router-dom";

const Guide = ({ setGuideIsActive }) => {
  const navigate = useNavigate();
  return (
    <>
      <aside className="guide">
        <div className="guide-select-wrapper">
          <div role="button" className="guide-select">
            Explore
          </div>
          <div role="button" className="guide-select">
            Playlists
          </div>
          <div
            role="button"
            className="guide-select"
            onClick={() => navigate("/watchLater")}
          >
            Watch Later
          </div>
          <div role="button"></div>
        </div>
      </aside>

      <div
        className="overlay-main"
        onClick={() => setGuideIsActive(false)}
      ></div>
    </>
  );
};

export default Guide;

import React from "react";

const Guide = ({ setGuideIsActive }) => {
  console.log(setGuideIsActive);
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
          <div role="button" className="guide-select">
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

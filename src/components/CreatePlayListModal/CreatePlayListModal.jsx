import React, { useState } from "react";

const CreatePlayListModal = ({ setIsCreatePlayListModalOpen }) => {
  const [isAddNewPlayListOpen, setIsAddNewPlayListOpen] = useState(false);
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
          <div>
            <input
              type="checkbox"
              name="spider"
              id="spider"
              className="app-checkbox"
            />
            <label htmlFor="spider">Spider</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="spider"
              id="spider"
              className="app-checkbox"
            />
            <label htmlFor="spider">Spider</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="spider"
              id="spider"
              className="app-checkbox"
            />
            <label htmlFor="spider">Spider</label>
          </div>
        </div>
        {isAddNewPlayListOpen ? (
          <>
            <div className="app-input-wrapper">
              <input
                type="text"
                id="add-playlist"
                placeholder="Enter Playlist Name"
                className="app-input"
              />
              <label htmlFor="add-playlist" className="app-input-label">
                Enter Playlist Name...
              </label>
            </div>
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

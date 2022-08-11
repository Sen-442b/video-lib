import React from "react";

const CreatePlayListModal = ({ setIsCreatePlayListModalOpen }) => {
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
            <i class="fas fa-times cursor-pointer"></i>
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
        <div
          className="flex-gap-sml flex-center cursor-pointer modal-footer"
          role="button"
        >
          <span className="fs-lrg">
            <i className="far fa-plus"></i>
          </span>
          <p className="margin-0"> Create New Playlist</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePlayListModal;

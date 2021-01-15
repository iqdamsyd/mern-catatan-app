import React from "react";
const xs_devices = 575.98;

function NoteSearch(props) {
  return (
    <div className="NoteSearch">
      <div
        className={
          window.innerWidth <= xs_devices ? "container xs" : "container"
        }
      >
        <form onSubmit={props.handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search notes..."
            autoFocus
            value={props.search.keyword}
            onChange={props.handleSearchChange}
          />
        </form>
        {window.innerWidth <= xs_devices ? (
          <img
            className="btn"
            src={process.env.PUBLIC_URL + "/xs_topbar.png"}
            width="20px"
            alt="img"
            onClick={props.handleToggleSidebar}
          />
        ) : null}
      </div>
    </div>
  );
}

export default NoteSearch;

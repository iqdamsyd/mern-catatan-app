import React from "react";
function NoteSearch(props) {
  return (
    <div className="NoteSearch">
      <div className="container">
        <form onSubmit={props.handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search notes..."
            autoFocus
            value={props.search.keyword}
            onChange={props.handleSearchChange}
          />
        </form>
      </div>
    </div>
  );
}

export default NoteSearch;

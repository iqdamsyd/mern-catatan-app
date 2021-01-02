import React from "react";
import "../css/NoteSearch.css";

function NoteSearch() {
  return (
    <div className="NoteSearch">
      <div className="container">
        <input type="text" placeholder="Search notes..." autoFocus />
      </div>
    </div>
  );
}

export default NoteSearch;

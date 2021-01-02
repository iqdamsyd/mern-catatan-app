import React from "react";
import "../css/NoteItem.css";

function NoteItem(props) {
  return (
    <div className="NoteItem">
      <div className="container">
        <h1>{props.note.title}</h1>
        <h2>{props.note.createdAt}</h2>
      </div>
    </div>
  );
}

export default NoteItem;

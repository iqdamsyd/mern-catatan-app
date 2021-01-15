import React from "react";

function NoteItem(props) {
  const title = props.note.title;
  const titleToShow = title.length > 24 ? title.slice(0, 24) + "..." : title;
  return (
    <div className="NoteItem">
      <div
        className={
          props.note._id === props.selectedNote._id
            ? "container selected"
            : "container"
        }
        onClick={() => props.handleChangeSelectedItem(props.note)}
      >
        <p className="title">{titleToShow}</p>
        <p className="updatedAt">
          {new Date(props.note.updatedAt).toLocaleDateString("en-GB")}
        </p>
      </div>
    </div>
  );
}

export default NoteItem;

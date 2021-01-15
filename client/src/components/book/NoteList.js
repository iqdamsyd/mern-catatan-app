import React from "react";
import NoteItem from "./NoteItem";

function NoteList(props) {
  const handleChangeSelectedItem = props.handleChangeSelectedItem;
  const selectedNote = props.selectedNote;
  return (
    <div className="NoteList">
      <div className="container">
        {props.noteList
          .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
          .map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              handleChangeSelectedItem={handleChangeSelectedItem}
              selectedNote={selectedNote}
            />
          ))}
      </div>
    </div>
  );
}

export default NoteList;

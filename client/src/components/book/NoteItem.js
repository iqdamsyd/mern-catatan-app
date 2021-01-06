import React, { useContext } from "react";
import NoteContext from "../../hooks/NoteContext";

function NoteItem(props) {
  const { note, setNote } = useContext(NoteContext);

  const clickNote = (e) => {
    e.preventDefault();
    setNote({
      _id: props.note._id,
      title: props.note.title,
      content: props.note.content,
    });
  };

  return (
    <div className="NoteItem">
      <div className="container" onClick={clickNote}>
        <h1>{props.note.title}</h1>
        <h2>{new Date(props.note.updatedAt).toLocaleDateString("en-GB")}</h2>
      </div>
    </div>
  );
}

export default NoteItem;

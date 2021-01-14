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
        <p className="title">{props.note.title}</p>
        <p className="updatedAt">
          {new Date(props.note.updatedAt).toLocaleDateString("en-GB")}
        </p>
      </div>
    </div>
  );
}

export default NoteItem;

import React, { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import noteService from "../../services/note.service";

function NoteList() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    noteService.getNotes().then((res) => {
      setNotes(res.data.payload.notes);
    });
  }, []);

  return (
    <div className="NoteList">
      <div className="container">
        {notes
          .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
          .map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
      </div>
    </div>
  );
}

export default NoteList;

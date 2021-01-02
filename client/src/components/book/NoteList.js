import React from "react";
import NoteItem from "./NoteItem";
import "../css/NoteList.css";

function NoteList() {
  const notes = [
    {
      id: 1,
      title: "Judul 1",
      content: "Kontennya ini..",
      createdAt: new Date(2020, 2, 5).toLocaleDateString(),
    },
    {
      id: 2,
      title: "Judul 2",
      content: "Kontennya ini..",
      createdAt: new Date(2020, 3, 23).toLocaleDateString(),
    },
    {
      id: 3,
      title: "Judul 2",
      content: "Kontennya ini..",
      createdAt: new Date(2020, 7, 16).toLocaleDateString(),
    },
  ];

  return (
    <div className="NoteList">
      <div className="container">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NoteList;

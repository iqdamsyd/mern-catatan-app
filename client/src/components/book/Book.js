import React, { useEffect, useState } from "react";
import NoteSearch from "./NoteSearch";
import NoteBar from "./NoteBar";
import NoteList from "./NoteList";
import Paper from "./Paper";
import "./~Book.css";

import NoteContext from "../../hooks/NoteContext";

function Book(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const onUserLoggedOut = props.onUserLoggedOut;

  return (
    <div className="Book">
      <div className="container grid">
        <NoteSearch />
        <NoteBar onUserLoggedOut={onUserLoggedOut} />
        <NoteContext.Provider value={{ note, setNote }}>
          <NoteList />
          <Paper />
        </NoteContext.Provider>
      </div>
    </div>
  );
}

export default Book;

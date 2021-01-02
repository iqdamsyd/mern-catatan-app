import React from "react";
import NoteSearch from "./NoteSearch";
import NoteBar from "./NoteBar";
import NoteList from "./NoteList";
import Paper from "./Paper";
import "../css/Book.css";

function Book() {
  return (
    <div className="Book">
      <div className="container grid">
        <NoteSearch />
        <NoteBar />
        <NoteList />
        <Paper />
      </div>
    </div>
  );
}

export default Book;

import React, { useState } from "react";
import NoteSearch from "./NoteSearch";
import NoteBar from "./NoteBar";
import NoteList from "./NoteList";
import Paper from "./Paper";

import NoteContext from "../../hooks/NoteContext";

const xs_devices = 575.98;

function Book(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const onUserLoggedOut = props.onUserLoggedOut;
  const [isOpen, setIsOpen] = useState(
    window.innerWidth > 575.98 ? true : false
  );

  const onSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Book">
      <div className={isOpen ? "container grid" : "container"}>
        <NoteContext.Provider value={{ note, setNote }}>
          <section
            className="sidebar"
            style={{ display: !isOpen ? "none" : "" }}
          >
            <NoteSearch />
            <NoteList />
          </section>
          <section className="main">
            <NoteBar
              onUserLoggedOut={onUserLoggedOut}
              onSidebarToggle={onSidebarToggle}
            />
            <Paper />
          </section>
        </NoteContext.Provider>
      </div>
    </div>
  );
}

export default Book;

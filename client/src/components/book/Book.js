import React, { useState, useEffect } from "react";
import NoteSearch from "./NoteSearch";
import NoteBar from "./NoteBar";
import NoteList from "./NoteList";
import Paper from "./Paper";
import noteService from "../../services/note.service";
import authService from "../../services/auth.service";
import useFocus from "../../hooks/useFocus";

const noteObj = {
  _id: "",
  title: "",
  content: "",
  createdAt: "",
  updatedAt: "",
};

const initialSearch = { isSearch: false, keyword: "" };

const xs_devices = 575.98;

function Book(props) {
  const [notes, setNotes] = useState([]);
  const [searchedNotes, setSearchedNotes] = useState();
  const [selectedNote, setSelectedNote] = useState(noteObj);

  //
  const [search, setSearch] = useState(initialSearch);
  const [inputRef, setInputFocus] = useFocus();
  const [deleted, setDeleted] = useState("");
  const [saved, setSaved] = useState("");
  const [isOpen, setIsOpen] = useState(
    window.innerWidth > xs_devices ? true : false
  );

  //
  const [tokenExpError, setTokenExpError] = useState(false);
  const handleRefreshToken = () => {
    const refToken = authService.getCurrentUser().refreshToken;
    authService.refreshToken(refToken);
  };

  // note search events
  const handleSearchChange = (event) => {
    setSearch({
      isSearch: true,
      keyword: event.target.value,
    });
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchRegex = new RegExp(search.keyword.toLocaleLowerCase());
    const copy = notes.map((note) => {
      return {
        ...note,
        stringArr: note.title.split(" ").concat(note.content.split(" ")),
        textString: note.title + " " + note.content,
      };
    });
    const findIt = copy.filter(
      (note) => note.textString.toLocaleLowerCase().search(searchRegex) > -1
    );
    setSearchedNotes(findIt);
  };
  useEffect(() => {
    if (search.keyword === "") {
      setSearch(initialSearch);
      setSearchedNotes(notes);
    }
  }, [search.keyword, notes]);

  // note list events
  const handleChangeSelectedItem = (note) => {
    setSelectedNote(note);
  };

  // note bar events
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleCreateNew = () => {
    setSelectedNote(noteObj);
    setSearch(initialSearch);
    setSearchedNotes(notes);
    setTimeout(() => {
      setInputFocus();
    }, 50);
  };
  const handleDeleteNote = (note_id) => {
    noteService.deleteNote(note_id);
    noteService
      .getNotes()
      .then((res) => {
        const updatedNotes = res.data.payload.notes;
        setNotes(updatedNotes);
        setSearchedNotes(updatedNotes);

        setSelectedNote(noteObj);
        setDeleted("Deleted!");
        setTimeout(() => {
          setDeleted("");
        }, 2000);
      })
      .catch((err) => {
        setTokenExpError(true);
      });
  };
  const onUserLoggedOut = () => {
    authService.logout();
    props.onUserLoggedOut();
  };

  // paper events
  const handleChange = (event) => {
    setSelectedNote((note) => ({
      ...note,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // update
    if (selectedNote._id) {
      noteService
        .updateNote(selectedNote)
        .then((res) => {
          noteService.getNotes().then((res) => {
            const updatedNotes = res.data.payload.notes;
            setNotes(updatedNotes);
          });
          setSaved("Saved!");
          setTimeout(() => {
            setSaved("");
          }, 2000);
        })
        .catch((err) => {
          setTokenExpError(true);
        });
    }
    // create
    if (!selectedNote._id) {
      console.log("create");
      noteService
        .createNote(selectedNote)
        .then((res) => {
          const newNote = res.data.payload.notes[0];
          setSelectedNote(newNote);
          noteService.getNotes().then((res) => {
            const updatedNotes = res.data.payload.notes;
            setNotes(updatedNotes);
          });
          setSaved("Saved!");
          setTimeout(() => {
            setSaved("");
          }, 2000);
        })
        .catch((err) => {
          setTokenExpError(true);
        });
    }
  };

  useEffect(() => {
    noteService
      .getNotes()
      .then((res) => {
        setNotes(res.data.payload.notes);
      })
      .catch((err) => {
        setTokenExpError(true);
      });
  }, []);

  // notes to be displayed
  let noteList = notes;
  if (search.isSearch) {
    noteList = searchedNotes;
  }

  let username = localStorage.getItem("catatan-username");
  return (
    <div className="Book">
      <div className={isOpen ? "container grid" : "container"}>
        <section className="sidebar" style={{ display: !isOpen ? "none" : "" }}>
          <NoteSearch
            search={search}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            handleToggleSidebar={handleToggleSidebar}
          />
          <NoteList
            noteList={noteList}
            selectedNote={selectedNote}
            handleChangeSelectedItem={handleChangeSelectedItem}
          />
        </section>
        <section className="main">
          <NoteBar
            username={username}
            selectedNote={selectedNote}
            deleted={deleted}
            handleToggleSidebar={handleToggleSidebar}
            handleCreateNew={handleCreateNew}
            handleDeleteNote={handleDeleteNote}
            onUserLoggedOut={onUserLoggedOut}
          />
          {tokenExpError ? (
            <div className="alert">
              Token has been expired,{" "}
              <button onClick={handleRefreshToken}>click here</button> to
              refresh token.
            </div>
          ) : null}
          <Paper
            inputRef={inputRef}
            selectedNote={selectedNote}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            saved={saved}
          />
        </section>
      </div>
    </div>
  );
}

export default Book;

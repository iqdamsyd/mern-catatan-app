import React, { useState, useEffect } from "react";
import shortid from "shortid";
import {
  Button,
  Col,
  Collapse,
  Container,
  Form,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Navbar,
  Row,
} from "reactstrap";

const noteObj = {
  id: "",
  title: "",
  content: "",
  createdAt: "",
  updatedAt: "",
};

const mockNotes = [
  {
    id: shortid.generate(),
    title: "Judul 1",
    content: "Isi catatan 1",
    updatedAt: new Date(2020, 12, 1),
  },
  {
    id: shortid.generate(),
    title: "Judul 2",
    content: "Isi catatan 2",
    updatedAt: new Date(2020, 12, 2),
  },
  {
    id: shortid.generate(),
    title: "Judul 3",
    content: "Isi catatan 3",
    updatedAt: new Date(2020, 12, 3),
  },
];

const initialSearch = { isSearch: false, keyword: "" };

const Book = (props) => {
  const [notes, setNotes] = useState(mockNotes);
  const [selectedNote, setSelectedNote] = useState(noteObj);
  const [searchedNotes, setSearchedNotes] = useState(notes);
  const [search, setSearch] = useState(initialSearch);
  const [isOpen, setIsOpen] = useState(true);

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     const response = await fetch("/api/notes", {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${props.user.accessToken}` },
  //     });
  //     const data = await response.json();
  //     setNotes(data.payload.notes);
  //   };

  //   fetchNotes();
  // }, [props.user.accessToken]);

  const addNote = (noteToBeAdded) => {
    const newNote = {
      ...noteToBeAdded,
      id: shortid.generate(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (noteToBeUpdated) => {
    noteToBeUpdated.updatedAt = new Date(Date.now());

    // update searchedNotes
    if (search.isSearch) {
      let copy = searchedNotes;
      const updatedNotes = copy.map((note) =>
        note.id === noteToBeUpdated.id
          ? {
              ...note,
              title: noteToBeUpdated.title,
              content: noteToBeUpdated.content,
              updatedAt: noteToBeUpdated.updatedAt,
            }
          : note
      );
      setSearchedNotes(updatedNotes);
    }

    // update notes
    let copy = notes;
    const updatedNotes = copy.map((note) =>
      note.id === noteToBeUpdated.id
        ? {
            ...note,
            title: noteToBeUpdated.title,
            content: noteToBeUpdated.content,
            updatedAt: noteToBeUpdated.updatedAt,
          }
        : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const copy = [...notes];
    const updatedNotes = copy.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setSearchedNotes(updatedNotes);
  };

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    const body = {
      refreshToken: props.user.refreshToken,
    };
    await fetch("/api/users/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    props.onUserLoggedOut();
  };

  const handleChange = (event) => {
    setSelectedNote((note) => ({
      ...note,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // edit note logic
    if (selectedNote.id) {
      updateNote(selectedNote);
    }
    // add note logic
    if (!selectedNote.id) {
      addNote(selectedNote);
    }
  };

  const handleDelete = (id) => {
    deleteNote(id);
    setSelectedNote(noteObj);
  };

  // TODO: SEARCH FUNCTIONALITY
  const handleSubmitSearch = (event) => {
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

  // reset searchbox
  useEffect(() => {
    if (search.keyword === "") {
      setSearch(initialSearch);
      setSearchedNotes(notes);
    }
  }, [search.keyword, notes]);

  // notes to be displayed
  let noteList = notes;
  if (search.isSearch) {
    noteList = searchedNotes;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col style={{ display: !isOpen ? "none" : "" }} xs="4">
          <Collapse isOpen={isOpen}>
            <Form onSubmit={handleSubmitSearch}>
              {/* <FormGroup style={{ display: "flex", gap: "10px" }}> */}
              <Input
                name="search"
                type="text"
                placeholder="Search note.."
                value={search.keyword}
                onChange={(event) =>
                  setSearch({ isSearch: true, keyword: event.target.value })
                }
              />
              {/* <span
                  className="mt-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSearch({ isSearch: false, keyword: "" })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-x-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </span> */}
              {/* </FormGroup> */}
            </Form>
            <ListGroup
              style={{
                maxHeight: "80vh",
                overflowY: "auto",
              }}
              className="mt-2"
            >
              {noteList
                .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
                .map((note) => (
                  <ListGroupItem
                    key={note.id}
                    tag="button"
                    action
                    onClick={() => setSelectedNote(note)}
                    active={note.id === selectedNote.id ? true : false}
                  >
                    <ListGroupItemHeading>{note.title}</ListGroupItemHeading>
                    <span>{note.updatedAt.toLocaleDateString("en-GB")}</span>
                  </ListGroupItem>
                ))}
            </ListGroup>
          </Collapse>
        </Col>
        <Col xs={isOpen ? "" : "12"}>
          <Navbar className="px-0 pt-0 mb-3">
            <span
              className="mr-auto"
              onClick={toggle}
              style={{ cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-layout-text-sidebar-reverse"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z" />
                <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h2zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5V1z" />
              </svg>
            </span>
            <span
              className="ml-auto mr-3"
              onClick={() => setSelectedNote(noteObj)}
              style={{ cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </span>
            <span
              className="mr-3"
              onClick={() => handleDelete(selectedNote.id)}
              style={{ cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </span>
            <span style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </span>
          </Navbar>
          <Form onSubmit={handleSubmit}>
            <FormGroup style={{ display: "flex", gap: "10px" }}>
              <Input
                name="title"
                type="text"
                placeholder="Title.."
                autoFocus
                value={selectedNote.title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="content"
                type="textarea"
                placeholder="Content.."
                value={selectedNote.content}
                onChange={handleChange}
                style={{ height: "60vh" }}
              />
            </FormGroup>
            <Button color="primary" size="sm" onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Book;

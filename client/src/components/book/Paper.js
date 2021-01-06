import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../../hooks/NoteContext";
import noteService from "../../services/note.service";
import useForm from "../../hooks/useForm";

function Paper(props) {
  const { note, setNote } = useContext(NoteContext);
  const { values, setValues, handleChange, handleSubmit } = useForm(
    {
      note_id: "",
      title: "",
      content: "",
    },
    note._id ? noteService.updateNote : noteService.createNote,
    "note"
  );

  useEffect(() => {
    setValues({ note_id: note._id, title: note.title, content: note.content });
  }, [note._id, note.title, note.content, setValues]);

  return (
    <div className="Paper">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            autoFocus
          />
          <textarea
            name="content"
            value={values.content}
            onChange={handleChange}
          ></textarea>
          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
}

export default Paper;

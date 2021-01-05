import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NoteItem from "./NoteItem";
import UserContext from "../../UserContext";

function NoteList() {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const url = "/api/notes";
  useEffect(
    (
      options = {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }
    ) => {
      axios
        .get(url, options)
        .then(function (res) {
          console.log(res.data.payload.notes);
          setNotes(res.data.payload.notes);
        })
        .catch(function (error) {
          // console.log(error.response.data);
        });
    },
    [setNotes, user.accessToken]
  );

  return (
    <div className="NoteList">
      <div className="container">
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NoteList;

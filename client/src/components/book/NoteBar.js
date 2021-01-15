import React from "react";

function NoteBar(props) {
  return (
    <div className="NoteBar">
      <div className="container flex">
        <img
          className="btn"
          src={process.env.PUBLIC_URL + "/sidebar.png"}
          width="20px"
          alt="img"
          onClick={props.handleToggleSidebar}
        />
        <p>Hello, {props.username}</p>
        <img
          id="add"
          className="btn"
          style={{ marginLeft: "auto" }}
          src={process.env.PUBLIC_URL + "/add.png"}
          width="20px"
          alt="img"
          onClick={props.handleCreateNew}
        />
        <img
          className="btn"
          src={process.env.PUBLIC_URL + "/trash.png"}
          width="20px"
          alt="img"
          onClick={() => props.handleDeleteNote(props.selectedNote._id)}
        />
        {props.deleted.length ? <small>{props.deleted}</small> : null}
        <span className="btn" onClick={props.onUserLoggedOut}>
          Logout
        </span>
      </div>
    </div>
  );
}

export default NoteBar;

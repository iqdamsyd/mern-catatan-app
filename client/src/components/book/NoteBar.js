import React, { useState } from "react";
import authService from "../../services/auth.service";

function NoteBar(props) {
  const handleLogout = () => {
    authService.logout();
    props.onUserLoggedOut();
  };
  return (
    <div className="NoteBar">
      <div className="container flex">
        <img
          className="btn"
          src={process.env.PUBLIC_URL + "/sidebar.png"}
          width="20px"
          alt="img"
          onClick={props.onSidebarToggle}
        />
        <p>Hello, user</p>
        <img
          id="add"
          className="btn"
          style={{ marginLeft: "auto" }}
          src={process.env.PUBLIC_URL + "/add.png"}
          width="20px"
          alt="img"
        />
        <img
          className="btn"
          src={process.env.PUBLIC_URL + "/trash.png"}
          width="20px"
          alt="img"
        />
        <span className="btn" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </div>
  );
}

export default NoteBar;

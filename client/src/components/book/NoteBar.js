import React from "react";
import authService from "../../services/auth.service";

function NoteBar() {
  return (
    <div className="NoteBar">
      <div className="container flex">
        <span className="btn" onClick={authService.logout}>
          Logout
        </span>
      </div>
    </div>
  );
}

export default NoteBar;

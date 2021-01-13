import React from "react";
import authService from "../../services/auth.service";

function NoteBar(props) {
  const handleLogout = () => {
    authService.logout();
    props.onUserLoggedOut();
  };
  return (
    <div className="NoteBar">
      <div className="container flex">
        <span className="btn" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </div>
  );
}

export default NoteBar;

import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../../UserContext";

function NoteBar() {
  const { user, setUser } = useContext(UserContext);
  const url = "/api/users/logout";
  const options = {
    headers: { Authorization: `Bearer ${user.accessToken}` },
    data: {
      refreshToken: user.refreshToken,
    },
  };

  const logout = () => {
    axios
      .delete(url, options)
      .then(function (res) {
        setUser(null);
      })
      .catch(function (err) {
        console.log(err.response.data);
      });
  };

  return (
    <div className="NoteBar">
      <div className="container flex">
        <span className="btn" onClick={logout}>
          Logout
        </span>
      </div>
    </div>
  );
}

export default NoteBar;

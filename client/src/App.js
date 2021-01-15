import "./App.css";
import Landing from "./components/landing/Landing";
import Book from "./components/book/Book";

import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const onUserLoggedIn = (username, token) => {
    setCurrentUser(token);
    localStorage.setItem("catatan-username", username);
  };

  const onUserLoggedOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("catatan-username");
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  let toRender;
  if (currentUser) {
    toRender = <Book onUserLoggedOut={onUserLoggedOut} />;
  } else {
    toRender = <Landing onUserLoggedIn={onUserLoggedIn} />;
  }

  return <div className="App">{toRender}</div>;
};

export default App;

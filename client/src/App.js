import "./App.css";
import Landing from "./components/landing/Landing";
import Book from "./components/book/Book";

import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const onUserLoggedIn = (token) => {
    setCurrentUser(token);
  };

  const onUserLoggedOut = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  let toRender;
  if (currentUser) {
    toRender = (
      <Book
        user={currentUser}
        currentUser={currentUser}
        onUserLoggedOut={onUserLoggedOut}
      />
    );
  } else {
    toRender = <Landing onUserLoggedIn={onUserLoggedIn} />;
  }

  return <div className="App">{toRender}</div>;
};

export default App;

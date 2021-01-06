import "./App.css";
import Landing from "./components/landing/Landing";
import Book from "./components/book/Book";

import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return <div className="App">{currentUser ? <Book /> : <Landing />}</div>;
};

export default App;

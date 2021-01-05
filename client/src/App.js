import "./App.css";
import Landing from "./components/landing/Landing";
import Book from "./components/book/Book";
import UserContext from "./UserContext";

import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        {user ? <Book /> : <Landing />}
      </UserContext.Provider>
    </div>
  );
};

export default App;

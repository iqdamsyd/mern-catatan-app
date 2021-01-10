import React, { useState } from "react";
import "./App.css";
import Book from "./components/Book";
import FormLogin from "./components/FormLogin";
import FormSignup from "./components/FormSignup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  const onUserLoggedIn = (token) => {
    setUser({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  };

  const onUserLoggedOut = (token) => {
    setUser(null);
  };

  let toRender;
  if (user) {
    toRender = <FormLogin user={user} onUserLoggedIn={onUserLoggedIn} />;
  } else {
    toRender = <Book user={user} onUserLoggedOut={onUserLoggedOut} />;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={(props) => toRender} />
          <Route path="/signup" component={FormSignup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

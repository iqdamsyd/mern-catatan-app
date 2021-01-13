import React from "react";
import Brand from "./Brand";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Landing = (props) => {
  const onUserLoggedIn = props.onUserLoggedIn;
  return (
    <Router>
      <div className="Landing">
        <div className="container flex">
          <Brand />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <LoginForm onUserLoggedIn={onUserLoggedIn} />}
            />
            <Route
              path="/signup"
              render={(props) => <SignupForm onUserLoggedIn={onUserLoggedIn} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Landing;

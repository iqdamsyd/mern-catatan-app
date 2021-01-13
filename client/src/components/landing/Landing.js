import React from "react";
import Brand from "./Brand";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Landing = () => {
  return (
    <Router>
      <div className="Landing">
        <div className="container flex">
          <Brand />
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Landing;

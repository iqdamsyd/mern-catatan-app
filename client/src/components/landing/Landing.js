import React from "react";
import Brand from "./Brand";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import "./~Landing.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Landing = () => {
  return (
    <Router>
      <div className="Landing">
        <div className="container grid">
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

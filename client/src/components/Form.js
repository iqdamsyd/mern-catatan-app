import React from "react";
import "../css/Form.css";

class Form extends React.Component {
  render() {
    return (
      <div className="Form">
        <div className="container">
          <div className="form-wrapper flex">
            <h1>Sign up your account here.</h1>
            <form>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                />
              </div>
              <input type="submit" value="Sign up" className="btn" />
            </form>
            <p>
              Already have account? <a href="google.com">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;

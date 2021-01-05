import React from "react";
import { useForm } from "../../useForm";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const loginUrl = "/api/users/login";
  const [values, handleChange, handleSubmit, errorMsg] = useForm(
    { username: "", password: "" },
    loginUrl
  );

  return (
    <div className="Form">
      <div className="container">
        <div className="form-wrapper flex">
          <h1>Login your account here</h1>
          {errorMsg && <span className="error-msg">{errorMsg}</span>}
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={values.username}
                onChange={handleChange}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn" />
          </form>
          <p>
            Does not have account?
            <Link to="signup"> Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import React from "react";
import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import authService from "../../services/auth.service";

const SignupForm = (props) => {
  const { values, handleChange, handleSubmit, errorMsg } = useForm(
    {
      username: "",
      password: "",
    },
    authService.register,
    "auth"
  );

  return (
    <div className="Form">
      <div className="container">
        <div className="form-wrapper flex">
          <h1>Sign up your account here</h1>
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
            <input type="submit" value="Sign up" className="btn" />
          </form>
          <p>
            Already have account?
            <Link to="/"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

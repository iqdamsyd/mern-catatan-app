import React, { useState } from "react";

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) => setValue(e.target.value),
  };
};

const FormLogin = (props) => {
  const username = useInputValue("");
  const password = useInputValue("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { username: username.value, password: password.value };
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    props.onUserLoggedIn(data.payload);
  };

  return (
    <div>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            placeholder="username"
            autoFocus
            {...username}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="password"
            {...password}
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
      </form>
      <pre>
        <a href="/signup">Sign up instead</a>
      </pre>
    </div>
  );
};

export default FormLogin;

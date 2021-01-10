import React from "react";

const FormSignup = () => {
  return (
    <div>
      <h4>Signup</h4>
      <form>
        <div>
          <input name="username" placeholder="username" autoFocus />
        </div>
        <div>
          <input name="password" type="password" placeholder="password" />
        </div>
        <button>Signup</button>
      </form>
      <pre>
        <a href="/">Login instead</a>
      </pre>
    </div>
  );
};

export default FormSignup;

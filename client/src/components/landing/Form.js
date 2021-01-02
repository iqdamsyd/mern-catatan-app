import React from "react";
import axios from "axios";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isSignup: true,
      form: {
        title: "Sign up your account here",
        submit: "Sign up",
        url: "/api/users/register",
        desc: "Already have account?",
        aText: "Login",
        aHref: "#",
      },
      errorMessage: "",
    };
  }

  changeForm = () => {
    this.setState(
      {
        isSignup: !this.state.isSignup,
      },
      () => {
        let isSignup = this.state.isSignup;
        if (isSignup) {
          this.setState({
            form: {
              title: "Sign up your account here",
              submit: "Sign up",
              url: "/api/users/register",
              desc: "Already have account?",
              aText: "Login",
              aHref: "#",
            },
            errorMessage: "",
          });
        } else {
          this.setState({
            form: {
              title: "Login to your account",
              submit: "Login",
              url: "/api/users/login",
              desc: "Does not have account?",
              aText: "Sign up",
              aHref: "#",
            },
            errorMessage: "",
          });
        }
      }
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    let username = this.state.username;
    let password = this.state.password;
    let url = this.state.form.url;

    axios
      .post(url, {
        username,
        password,
      })
      .then((response) => {
        // Success 🎉
        console.log(response);
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.setState({
            username: "",
            password: "",
            errorMessage: error.response.data,
          });
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
        // console.log(error.config);
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className="Form">
        <div className="container">
          <div className="form-wrapper flex">
            <h1>{this.state.form.title}</h1>
            {this.state.errorMessage && (
              <p className="error-msg">
                {this.state.errorMessage.error.message}
              </p>
            )}
            <form method="POST" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <input
                type="submit"
                value={this.state.form.submit}
                className="btn"
              />
            </form>
            <p>
              {this.state.form.desc}{" "}
              <a href={this.state.form.aHref} onClick={this.changeForm}>
                {this.state.form.aText}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;

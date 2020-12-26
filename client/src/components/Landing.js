import React from "react";
import Brand from "./Brand";
import Form from "./Form";
import "../css/Landing.css";

class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <div className="container grid">
          <Brand />
          <Form />
        </div>
      </div>
    );
  }
}

export default Landing;

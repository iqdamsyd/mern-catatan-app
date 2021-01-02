import React from "react";
import Brand from "./Brand";
import Form from "./Form";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="Landing">
      <div className="container grid">
        <Brand />
        <Form />
      </div>
    </div>
  );
};

export default Landing;

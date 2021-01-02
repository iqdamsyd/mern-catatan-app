import React from "react";
import "./Brand.css";
import logo from "../../brand-logo.svg";

const Brand = () => {
  return (
    <div className="Brand">
      <div className="container flex">
        <img src={logo} alt="brand-logo" />
        <p>
          Catatan is a free simple note application that lets you manage your
          notes at ease.
        </p>
        <p className="small">
          This app was built using MERN stack.
          <br />
          The codes are available on my github pages.
        </p>
        <div className="social-media flex">
          <a href="twitter.com">
            <img
              src={process.env.PUBLIC_URL + "/twitter-logo.png"}
              alt="twitter"
            />
          </a>
          <a href="linkedin.com">
            <img
              src={process.env.PUBLIC_URL + "/linkedin-logo.png"}
              alt="twitter"
            />
          </a>
          <a href="instagram.com">
            <img
              src={process.env.PUBLIC_URL + "/instagram-logo.png"}
              alt="twitter"
            />
          </a>
          <a href="github.com">
            <img
              src={process.env.PUBLIC_URL + "/github-logo.png"}
              alt="twitter"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Brand;

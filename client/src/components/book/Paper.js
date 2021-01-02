import React from "react";
import "../css/Paper.css";

function Paper(props) {
  return (
    <div className="Paper">
      <div className="container">
        <form>
          <input type="text" name="title" />
          <textarea></textarea>
          <input type="submit" value="Save" className="btn" />
        </form>
        <button className="addNote">+</button>
      </div>
    </div>
  );
}

export default Paper;

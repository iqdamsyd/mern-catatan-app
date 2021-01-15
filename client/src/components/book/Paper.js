import React from "react";

function Paper(props) {
  return (
    <div className="Paper">
      <div className="container">
        <form onSubmit={props.handleSubmit}>
          <input
            ref={props.inputRef}
            type="text"
            name="title"
            value={props.selectedNote.title}
            onChange={props.handleChange}
            placeholder="Title.."
            autoFocus
          />
          <textarea
            name="content"
            value={props.selectedNote.content}
            onChange={props.handleChange}
            placeholder="Content.."
          ></textarea>
          <input
            type="submit"
            value="Save"
            disabled={!props.selectedNote.title}
          />
          {props.saved.length ? <small>{props.saved}</small> : null}
        </form>
      </div>
    </div>
  );
}

export default Paper;

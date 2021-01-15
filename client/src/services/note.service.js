import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/notes";

const getNotes = () => {
  return axios.get(API_URL, { headers: authHeader() }).catch((err) => {
    throw err;
  });
};

const createNote = (params) => {
  const { title, content } = params;
  return axios
    .post(API_URL, { title, content }, { headers: authHeader() })
    .catch((err) => {
      throw err;
    });
};

const updateNote = (params) => {
  const { _id: note_id, title, content } = params;
  return axios
    .put(API_URL + `/${note_id}`, { title, content }, { headers: authHeader() })
    .catch((err) => {
      throw err;
    });
};

const deleteNote = (note_id) => {
  return axios
    .delete(API_URL + `/${note_id}`, { headers: authHeader() })
    .catch((err) => {
      throw err;
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/notes";

const getNotes = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createNote = (params) => {
  const { title, content } = params;
  return axios.post(API_URL, { title, content }, { headers: authHeader() });
};

const updateNote = (params) => {
  const { note_id, title, content } = params;
  return axios.put(
    API_URL + `/${note_id}`,
    { title, content },
    { headers: authHeader() }
  );
};

const deleteNote = (note_id) => {
  return axios.delete(API_URL + `/${note_id}`, { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};

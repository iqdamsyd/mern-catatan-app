import axios from "axios";

const API_URL = "/api/users/";

const register = (body) => {
  const { username, password } = body;
  return axios
    .post(API_URL + "register", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.payload.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.payload));
      }
      return response.data.payload;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
};

const login = (body) => {
  const { username, password } = body;
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.payload.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.payload));
      }
      return response.data.payload;
    })
    .catch((error) => {
      throw error.response.data.error.message;
    });
};

const refreshToken = (refreshToken) => {
  return axios
    .post(API_URL + "refresh-token", {
      refreshToken,
    })
    .then((response) => {
      if (response.data.payload.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.payload));
      }
      window.location.reload();
    })
    .catch((error) => {
      console.log("error from service");
      console.log(error.response);
    });
};

const logout = () => {
  const { refreshToken } = JSON.parse(localStorage.getItem("user"));
  axios
    .delete(API_URL + "logout", {
      data: { refreshToken },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  refreshToken,
  logout,
  getCurrentUser,
};

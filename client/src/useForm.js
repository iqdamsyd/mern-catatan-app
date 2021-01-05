import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";

export const useForm = (initialValues, url) => {
  const [values, setValues] = useState(initialValues);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useContext(UserContext);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    (e) => {
      e.preventDefault();
      axios
        .post(url, {
          ...values,
          [e.target.name]: e.target.value,
        })
        .then(function (res) {
          const {
            accessToken: accToken,
            refreshToken: refToken,
          } = res.data.payload;
          setUser({ accessToken: accToken, refreshToken: refToken });
          console.log(res.data);
        })
        .catch(function (e) {
          setErrorMsg(e.response.data.error.message);
          console.log(e.response.data);
        });
    },
    errorMsg,
  ];
};

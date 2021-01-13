import { useState } from "react";

const useForm = (initialValues, service) => {
  const [values, setValues] = useState(initialValues);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // call service
    service(values)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    errorMsg,
  };
};

export default useForm;

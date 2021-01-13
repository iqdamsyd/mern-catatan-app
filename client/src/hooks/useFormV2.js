import { useState } from "react";

const useFormV2 = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return {
    values,
    handleChange,
  };
};

export default useFormV2;

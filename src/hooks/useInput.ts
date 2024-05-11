import { useState } from "react";

export default () => {
  const [value, setValue] = useState("");

  const clearValue = () => {
    setValue("");
  };

  return {
    value,
    clearValue,
  };
};

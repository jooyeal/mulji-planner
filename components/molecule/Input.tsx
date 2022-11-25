import React, { InputHTMLAttributes } from "react";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...rest
}) => {
  return (
    <input
      className={`bg-black w-full rounded-lg border p-1 text-white`}
      {...rest}
    />
  );
};

export default Input;

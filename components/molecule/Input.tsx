import React, { InputHTMLAttributes } from "react";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...rest
}) => {
  return (
    <input
      className={`bg-black w-full rounded-lg border p-1 text-white ${className}`}
      {...rest}
    />
  );
};

export default Input;

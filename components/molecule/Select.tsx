import React, { SelectHTMLAttributes } from "react";

const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({
  ...rest
}) => {
  return (
    <select className="bg-black w-full rounded-lg border p-2" {...rest}>
      {rest.children}
    </select>
  );
};

export default Select;

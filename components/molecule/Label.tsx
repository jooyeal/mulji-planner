import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type: "title" | "subtitle";
};

const Label: React.FC<Props> = (props) => {
  return (
    <p className={`${props.type === "title" ? "text-2xl" : "text-xl"}`}>
      {props.children}
    </p>
  );
};

export default Label;

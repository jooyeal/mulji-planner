import { Gurume } from "@prisma/client";
import Link from "next/link";
import React from "react";

const GurumeComponent: React.FC<Gurume> = ({
  id,
  title,
  mainmenu,
  writer,
  image,
}) => {
  return (
    <Link
      className="p-4 border rounded-lg w-full"
      href={`/gurume/detail/${id}`}
    >
      <p className="text-lg">{title}</p>
      <div>
        <span>주력메뉴 : </span>
        <span>{mainmenu}</span>
      </div>
      <div>
        <span>작성자 : </span>
        <span>{writer}</span>
      </div>
    </Link>
  );
};

export default GurumeComponent;

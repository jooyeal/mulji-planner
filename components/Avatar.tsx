import Image from "next/image";
import Link from "next/link";
import React from "react";
import Label from "./molecule/Label";

type Props = {
  image: string;
  name: string;
};

const Avatar: React.FC<Props> = ({ name }) => {
  return (
    <Link
      className="flex flex-col items-center gap-3 border p-4 rounded-full"
      href={`/schedule/${name}`}
    >
      <Image src="/icon-384x384.png" width={200} height={200} alt="" />
      <Label type="subtitle">{name}</Label>
    </Link>
  );
};

export default Avatar;

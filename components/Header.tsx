import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="w-full h-16 fixed text-white pl-4 pr-4 flex justify-between items-center z-30 top-0 border-b">
        <div>
          <BiMenu
            className="cursor-pointer"
            size={20}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="text-white">
          <p>물지 플래너</p>
        </div>
      </div>
      <div
        className={`${
          open ? "" : "-translate-x-full"
        } w-full h-screen fixed bg-black text-white z-50 p-10 top-0 left-0 transition-all`}
      >
        <div className="flex justify-end">
          <IoMdClose
            className="cursor-pointer"
            size={20}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

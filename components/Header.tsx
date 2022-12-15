import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  return (
    <>
      <div className="w-full h-16 fixed text-white pl-4 pr-4 flex justify-between items-center z-30 top-0 border-b bg-black opacity-90">
        <div>
          <BiMenu
            className="cursor-pointer"
            size={20}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="text-white">
          <Link href="/">
            <p>물지 플래너</p>
          </Link>
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
        <div className="flex flex-col items-center text-white gap-6 p-8">
          <Link href="/">
            <p>홈 화면</p>
          </Link>
          <Link href="/past">
            <p>과거 일정 확인</p>
          </Link>
          <Link href="/schedule">
            <p>일정 맞추기</p>
          </Link>
          <Link href="/gurume">
            <p>맛집 추천</p>
          </Link>
          <Link href="/wishlist">
            <p>장보기</p>
          </Link>
          <Link href="/guide">
            <p>이용 가이드</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;

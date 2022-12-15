import { WishList } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { BiPlus, BiRightArrowAlt } from "react-icons/bi";
import Label from "../../components/molecule/Label";

type Props = {
  data: {
    wishList: WishList[];
    message?: string;
  };
};

const WishList: React.FC<Props> = ({ data: { wishList, message } }) => {
  if (message) {
    return (
      <div className="flex justify-center items-center">
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div>
      <Link href="/wishlist/create">
        <p className="fixed bottom-4 right-4 border rounded-full w-10 h-10 flex justify-center items-center">
          <BiPlus size={30} />
        </p>
      </Link>
      <Label type="title">장보기 리스트</Label>
      <br />
      <div className="flex flex-col items-center p-6 gap-2">
        {wishList.map((list) => (
          <Link
            key={list.id}
            href={`/wishlist/detail/${list.id}`}
            className="border w-full rounded-lg p-4 flex items-center justify-between"
          >
            <p>{list.title}</p>
            <BiRightArrowAlt />
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/wishlist`
  );
  if (res.status === 200) {
    return {
      props: {
        data: {
          status: 200,
          wishList: res.data.wishList,
        },
      },
    };
  }
  return {
    props: {
      data: {
        status: res.status,
        wishList: null,
        message: res.data.message,
      },
    },
  };
};

export default WishList;

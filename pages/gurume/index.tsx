import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoIosRefresh } from "react-icons/io";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Gurume } from "@prisma/client";
import GurumeComponent from "../../components/GurumeComponent";

type Props = {
  data: {
    status: number;
    gurumes?: Gurume[] | null;
    message: string;
  };
};

const Gurume: React.FC<Props> = ({ data: { status, gurumes, message } }) => {
  const router = useRouter();
  if (status !== 200) {
    return (
      <div className="flex justify-center items-center">
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div>
      <Link href="/gurume/regist">
        <p className="fixed bottom-4 right-4 border rounded-full w-10 h-10 flex justify-center items-center">
          <BiPlus size={30} />
        </p>
      </Link>
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl">맛집 리스트</p>
        <IoIosRefresh size={25} onClick={() => router.reload()} />
      </div>
      <p>추후 사진 업로드도 추가예정</p>
      <br />
      <div className="flex flex-col items-center w-full gap-2">
        {gurumes?.length === 0 && <p>등록된 맛집이 없습니다</p>}
        {gurumes?.length !== 0 &&
          gurumes?.map((gurume) => (
            <GurumeComponent key={gurume.id} {...gurume} />
          ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/gurume/get`
  );
  if (res.status === 200) {
    return {
      props: {
        data: {
          status: 200,
          gurumes: res.data.gurumes,
          message: res.data.message,
        },
      },
    };
  }
  return {
    props: {
      data: {
        status: res.status,
        gurumes: null,
        message: res.data.message,
      },
    },
  };
};

export default Gurume;

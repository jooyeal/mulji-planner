import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import Input from "../../components/molecule/Input";
import Label from "../../components/molecule/Label";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Schedule } from "@prisma/client";

type Props = {
  data: {
    name: string;
    status: number;
    schedule: Schedule | null;
    message: string;
  };
};

export type ScheduleRegistData = {
  writer: string;
  availableDates: Date[];
};

const ScheduleRegist: React.FC<Props> = ({
  data: { name, schedule, message },
}) => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Date>();
  const [dates, setDates] = useState<string[]>(
    (schedule?.availableDates as string[] | undefined) ?? []
  );
  const [error, setError] = useState<string>();

  const onClick = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/schedule/regist`,
      {
        data: {
          writer: name,
          availableDates: dates,
        },
      }
    );
    if (res.status === 200) {
      toast.success("등록에 성공했습니다", {
        position: "bottom-center",
        autoClose: 2000,
      });
      router.push("/schedule");
    } else {
      toast.error("에러가 발생했습니다. 관리자에게 문의해주세요.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <Label type="title">안녕하십니까 {name}!</Label>
      <br />
      <Label type="subtitle">
        참가 가능한 날짜를 선택후 추가하기를 눌러주세요(여러번 가능)
      </Label>
      <Input
        type="date"
        onChange={(e) => setCurrentDate(new Date(e.target.value))}
      />
      <button
        className="p-1 border rounded-lg w-full mt-2"
        onClick={() => {
          if (!currentDate) {
            setError("날짜를 선택해주세요");
          } else if (dates.includes(new Date(currentDate).toISOString())) {
            setError("같은 날짜가 이미 추가 되어있습니다");
          } else {
            setError(undefined);
            setDates((prev) => [...prev, new Date(currentDate).toISOString()]);
          }
        }}
      >
        추가하기
      </button>
      {error && <p className="text-red-400">{error}</p>}
      <div className="flex flex-col items-center mt-5">
        <Label type="subtitle">{name}님이 추가한 참여가능한 날짜 리스트</Label>
        <div className="flex flex-col items-center gap-2 w-full">
          {dates.map((date, index) => (
            <div
              key={index}
              className="border w-full p-2 rounded-lg flex justify-between items-center"
            >
              <p>{new Date(date).toISOString().split("T")[0]}</p>
              <BiTrash
                onClick={() =>
                  setDates((prev) => prev.filter((_, i) => index !== i))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <button className="border p-1 w-full rounded-lg mt-4" onClick={onClick}>
          보존
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/schedule/get`,
    { params: { writer: ctx.params?.name } }
  );
  if (res.status === 200) {
    return {
      props: {
        data: {
          name: ctx.params?.name,
          status: 200,
          schedule: res.data.schedule,
          message: res.data.message,
        },
      },
    };
  }
  return {
    props: {
      data: {
        name: ctx.params?.name,
        status: res.status,
        schedule: null,
        message: res.data.message,
      },
    },
  };
};

export default ScheduleRegist;

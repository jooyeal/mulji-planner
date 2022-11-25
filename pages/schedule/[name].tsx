import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import Input from "../../components/molecule/Input";
import Label from "../../components/molecule/Label";
import { BiTrash } from "react-icons/bi";

type Props = {
  name: string;
};

const ScheduleRegist: React.FC<Props> = ({ name }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const [error, setError] = useState<string>();
  return (
    <div>
      <Label type="title">현재 개발중인 페이지입니다.</Label>
      <Label type="title">안녕하십니까 {name}!</Label>
      <br />
      <Label type="subtitle">
        참가 가능한 일정을 선택후 추가하기를 눌러주세요(여러번 가능)
      </Label>
      <Input
        type="date"
        onChange={(e) => setCurrentDate(new Date(e.target.value))}
      />
      <button
        className="p-1 border rounded-lg w-full mt-2"
        onClick={() => {
          if (dates.includes(currentDate)) {
            setError("같은 날짜가 이미 추가 되어있습니다.");
          } else {
            setError(undefined);
            setDates((prev) => [...prev, currentDate]);
          }
        }}
      >
        추가하기
      </button>
      {error && <p className="text-red-400">{error}</p>}
      <div className="flex flex-col items-center mt-5">
        <Label type="subtitle">추가한 날짜 리스트</Label>
        <div className="flex flex-col items-center gap-2 w-full">
          {dates.map((date, index) => (
            <div
              key={index}
              className="border w-full p-2 rounded-lg flex justify-between items-center"
            >
              <p>{date.toISOString().split("T")[0]}</p>
              <BiTrash
                onClick={() =>
                  setDates((prev) => prev.filter((_, i) => index !== i))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return {
    props: {
      name: ctx.params?.name,
    },
  };
};

export default ScheduleRegist;

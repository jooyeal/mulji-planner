import React, { ChangeEvent, useEffect, useState } from "react";
import Label from "../../components/molecule/Label";
import { BiPlus } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import Input from "../../components/molecule/Input";
import axios from "axios";
import { wait } from "../../utils/common";

type Props = {};

const Schedule = (props: Props) => {
  const [writers, setWriters] = useState<string[]>([]);
  const [month, setMonth] = useState<string>(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  );
  const [dates, setDates] = useState<string[]>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setWriters((prev) => [...prev, e.target.value]);
    } else {
      setWriters((prev) => prev.filter((v) => v !== e.target.value));
    }
  };

  useEffect(() => {
    const getCalculatedSchedules = async () => {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/schedule/calculate`,
        { data: { writers, month } }
      );
      if (res.status === 200) {
        setDates(res.data.sameDay);
      } else {
        setError(res.data.message);
      }
      await wait(1200);
      setIsLoading(false);
    };
    getCalculatedSchedules();
  }, [writers, month]);

  return (
    <>
      <div>
        <Link href="/schedule/choose">
          <p className="fixed bottom-4 right-4 border rounded-full w-10 h-10 flex justify-center items-center">
            <BiPlus size={30} />
          </p>
        </Link>
        <Label type="title">일정 맞추기</Label>
        <br />
        <Label type="subtitle">
          참가 가능 날짜를 추가하려면 우하단의 아이콘을 클릭하세요
        </Label>
        <div className="flex flex-col items-center p-6">
          <p>모임에 참여하는 멤버를 체크해주세요</p>
          <div className="flex gap-2">
            <div>
              <input type="checkbox" value="병준" onChange={onChangeWriter} />
              <label>병준</label>
            </div>
            <div>
              <input type="checkbox" value="대현" onChange={onChangeWriter} />
              <label>대현</label>
            </div>
            <div>
              <input type="checkbox" value="건" onChange={onChangeWriter} />
              <label>건</label>
            </div>
            <div>
              <input type="checkbox" value="종찬" onChange={onChangeWriter} />
              <label>종찬</label>
            </div>
            <div>
              <input type="checkbox" value="주열" onChange={onChangeWriter} />
              <label>주열</label>
            </div>
          </div>
          <p className="mt-4">월(月)을 선택해주세요</p>
          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          {error && <p className="text-red-400">{error}</p>}
          <div className="flex flex-col items-center gap-2">
            <br />
            <Label type="subtitle">선택한 조건으로 모일 수 있는 날짜</Label>
            {dates?.map((date, index) => (
              <p key={index} className="border w-full p-2 rounded-lg">
                {date.split("T")[0]}
              </p>
            ))}
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="w-screen h-screen fixed bg-slate-700 opacity-80 top-0 left-0 z-50 flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin" size={40} />
        </div>
      )}
    </>
  );
};

export default Schedule;

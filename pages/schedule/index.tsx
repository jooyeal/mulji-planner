import Image from "next/image";
import React from "react";
import Avatar from "../../components/Avatar";
import Label from "../../components/molecule/Label";

type Props = {};

const member = ["병준", "대현", "종찬", "건", "주열"];

const Schedule = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Label type="title">당신은 누구인가요?</Label>
      <Label type="title">해당하는 곳을 클릭해주세요</Label>
      {member.map((m) => (
        <Avatar key={m} image="" name={m} />
      ))}
    </div>
  );
};

export default Schedule;

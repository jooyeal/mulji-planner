import { Plan } from "@prisma/client";
import Link from "next/link";
import React from "react";

const Plan: React.FC<Plan> = ({ id, title, manager, startDate, endDate }) => {
  return (
    <Link
      className="border p-2 w-full rounded-lg cursor-pointer"
      href={`${process.env.NEXT_PUBLIC_HOST_URL}/detail/${id}`}
    >
      <p>{title}</p>
      <div className="flex justify-between">
        <div>
          {new Date(startDate).getFullYear()}-
          {new Date(startDate).getMonth() + 1}-{new Date(startDate).getDate()} ~{" "}
          {new Date(endDate).getFullYear()}-{new Date(endDate).getMonth() + 1}-
          {new Date(endDate).getDate()}
        </div>
        <div>
          <span>총무: </span>
          <span>{manager}</span>
        </div>
      </div>
    </Link>
  );
};

export default Plan;

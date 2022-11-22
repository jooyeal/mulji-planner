import { Plan } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import PlanComponent from "../components/Plan";

type Props = {
  data: {
    status: number;
    plans?: Plan[] | null;
    message: string;
  };
};

const Past: React.FC<Props> = ({ data: { status, plans, message } }) => {
  if (status !== 200) {
    return (
      <div className="flex justify-center items-center">
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <p className="text-2xl">일정 이력</p>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        {plans?.map((plan) => (
          <PlanComponent
            key={plan.id}
            id={plan.id}
            title={plan.title}
            desc={plan.desc}
            manager={plan.manager}
            participants={plan.participants}
            budget={plan.budget}
            startDate={plan.startDate}
            endDate={plan.endDate}
            isOver={plan.isOver}
          />
        ))}
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/getPastPlans`
  );
  if (res.status === 200) {
    return {
      props: {
        data: {
          status: 200,
          plans: res.data.plans,
          message: res.data.message,
        },
      },
    };
  }
  return {
    props: {
      data: {
        status: res.status,
        plans: null,
        message: res.data.message,
      },
    },
  };
};

export default Past;

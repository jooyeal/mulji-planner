import { Plan } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import PlanComponent from "../components/Plan";
import { IoIosRefresh } from "react-icons/io";

type Props = {
  data: {
    status: number;
    plans?: Plan[] | null;
    message: string;
  };
};

export const Home: React.FC<Props> = ({ data: { status, plans, message } }) => {
  const router = useRouter();
  if (status !== 200) {
    return (
      <div className="flex justify-center items-center">
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl">현재일정</p>
        <IoIosRefresh size={25} onClick={() => router.reload()} />
      </div>
      <br />
      <div className="flex flex-col items-center w-full gap-2">
        {plans?.length === 0 && <p>현재 일정이 없습니다</p>}
        {plans?.length !== 0 &&
          plans?.map((plan) => (
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

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/getPlans`
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

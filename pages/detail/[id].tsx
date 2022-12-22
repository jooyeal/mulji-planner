import { Plan } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiClient } from "../../service/apiClient";
import { convertDate } from "../../utils/handleDate";
import { RegistData } from "../regist";

type Props = {
  status: number;
  plan: Plan | null;
  message: string;
};

const Detail: React.FC<Props> = ({ status, plan, message }) => {
  const router = useRouter();

  const [update, setUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegistData>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setFormData({
      title: plan?.title,
      desc: plan?.desc,
      manager: plan?.manager,
      participants: plan?.participants,
      budget: plan?.budget,
      startData: plan?.startDate,
      endDate: plan?.endDate,
    });
  }, [plan]);

  if (status !== 200 || plan === null || plan === undefined) {
    return <div>{message}</div>;
  }

  const onOver = async () => {
    const apiClient = new ApiClient();
    await apiClient.POST<{ id: number }>({
      path: "over",
      data: {
        id: plan.id,
      },
      onSuccess: () => {
        toast.success("일정을 종료했습니다", {
          position: "bottom-center",
          autoClose: 2000,
        });
        router.push("/");
      },
      onError: () => {
        toast.error("에러가 발생했습니다. 관리자에게 문의해주세요.", {
          position: "bottom-center",
          autoClose: 2000,
        });
      },
    });
  };

  const onDelete = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/delete`,
      {
        id: plan.id,
      }
    );
    if (res.status === 200) {
      toast.success("삭제에 성공했습니다", {
        position: "bottom-center",
        autoClose: 2000,
      });
      router.push("/");
    } else {
      toast.error("에러가 발생했습니다. 관리자에게 문의해주세요.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData?.participants || formData.participants.length === 0) {
      setError("적어도 한명의 참여자를 체크해주세요");
    } else {
      setError(undefined);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/update`,
        {
          data: { id: plan.id, formData },
        }
      );
      if (res.status === 200) {
        toast.success("수정에 성공했습니다", {
          position: "bottom-center",
          autoClose: 2000,
        });
        router.push("/");
      } else {
        toast.error("에러가 발생했습니다. 관리자에게 문의해주세요.", {
          position: "bottom-center",
          autoClose: 2000,
        });
      }
    }
  };
  return (
    <div className="text-white">
      <div className="flex justify-between">
        <p className="text-2xl">일정상세</p>
        <div>
          {!plan.isOver && (
            <div>
              {update ? (
                <button
                  className="border p-1 rounded-lg"
                  onClick={() => setUpdate(false)}
                >
                  수정취소
                </button>
              ) : (
                <button
                  className="border p-1 rounded-lg"
                  onClick={() => setUpdate(true)}
                >
                  수정하기
                </button>
              )}
              <button className="border p-1 rounded-lg ml-2" onClick={onDelete}>
                일정삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <form className="p-6 flex flex-col gap-3" onSubmit={onSubmit}>
        <div>
          <p className="text-xl">일정 타이틀</p>
          <input
            className="bg-black w-full rounded-lg border p-1 text-white"
            placeholder="타이틀을 입력해주세요"
            maxLength={30}
            defaultValue={plan.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            disabled={!update}
          />
        </div>
        <div>
          <p className="text-xl">일정 내용</p>
          <textarea
            className="bg-black w-full rounded-lg border p-1 text-white resize-none"
            placeholder="일정 내용을 입력해주세요"
            rows={7}
            maxLength={400}
            defaultValue={plan.desc}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, desc: e.target.value }))
            }
            required
            disabled={!update}
          />
        </div>
        <div>
          <p className="text-xl">예정일</p>
          <div className="flex gap-2">
            <div>
              <p>시작일</p>
              <input
                className="bg-black rounded-lg border p-1 text-white"
                type="date"
                defaultValue={`${new Date(
                  plan.startDate
                ).getFullYear()}-${convertDate(
                  new Date(plan.startDate).getMonth() + 1
                )}-${convertDate(new Date(plan.startDate).getDate())}`}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startData: new Date(e.target.value),
                  }))
                }
                required
                disabled={!update}
              />
            </div>
            <div>
              <p>종료일</p>
              <input
                className="bg-black rounded-lg border p-1 text-white"
                type="date"
                defaultValue={`${new Date(
                  plan.endDate
                ).getFullYear()}-${convertDate(
                  new Date(plan.endDate).getMonth() + 1
                )}-${convertDate(new Date(plan.endDate).getDate())}`}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    endDate: new Date(e.target.value),
                  }))
                }
                required
                disabled={!update}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl">총무</p>
          <select
            name="manager"
            className="bg-black w-full rounded-lg border p-2"
            defaultValue={plan.manager}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                manager: e.target.value,
              }))
            }
            required
            disabled={!update}
          >
            <option value="">총무를 선택해주세요</option>
            <option value="병준">병준</option>
            <option value="대현">대현</option>
            <option value="종찬">종찬</option>
            <option value="건">건</option>
            <option value="주열">주열</option>
          </select>
        </div>
        <div>
          <p className="text-xl">참여자</p>
          <fieldset className="flex gap-2">
            <div>
              <input
                type="checkbox"
                value="병준"
                name="participants"
                defaultChecked={plan.participants.includes("병준")}
                disabled={!update}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? [...prev.participants, e.target.value]
                        : [e.target.value],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? prev.participants.filter(
                            (participant) => participant !== e.target.value
                          )
                        : [],
                    }));
                  }
                }}
              />
              <label>병준</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="대현"
                name="participants"
                disabled={!update}
                defaultChecked={plan.participants.includes("대현")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? [...prev.participants, e.target.value]
                        : [e.target.value],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? prev.participants.filter(
                            (participant) => participant !== e.target.value
                          )
                        : [],
                    }));
                  }
                }}
              />
              <label>대현</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="종찬"
                name="participants"
                disabled={!update}
                defaultChecked={plan.participants.includes("종찬")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? [...prev.participants, e.target.value]
                        : [e.target.value],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? prev.participants.filter(
                            (participant) => participant !== e.target.value
                          )
                        : [],
                    }));
                  }
                }}
              />
              <label>종찬</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="건"
                name="participants"
                disabled={!update}
                defaultChecked={plan.participants.includes("건")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? [...prev.participants, e.target.value]
                        : [e.target.value],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? prev.participants.filter(
                            (participant) => participant !== e.target.value
                          )
                        : [],
                    }));
                  }
                }}
              />
              <label>건</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="주열"
                name="participants"
                disabled={!update}
                defaultChecked={plan.participants.includes("주열")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? [...prev.participants, e.target.value]
                        : [e.target.value],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      participants: prev?.participants
                        ? prev.participants.filter(
                            (participant) => participant !== e.target.value
                          )
                        : [],
                    }));
                  }
                }}
              />
              <label>주열</label>
            </div>
          </fieldset>
        </div>
        <div>
          <p className="text-xl">예산</p>
          <input
            className="bg-black w-full rounded-lg border p-1 text-white"
            placeholder="예산을 입력해주세요"
            type="number"
            disabled={!update}
            defaultValue={plan.budget}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                budget: Number(e.target.value),
              }))
            }
            required
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <div>
          <p className="text-xl">인당 회비</p>
          <p>{Math.ceil(plan.budget / plan.participants.length)}원</p>
        </div>
        {update && (
          <button type="submit" className="text-white border rounded-lg p-2">
            수정
          </button>
        )}
      </form>
      <hr />
      {!plan.isOver && (
        <div>
          <p className="text-center mt-4">
            일정 종료를 누르면 이 일정은 과거 일정으로 넘어갑니다
          </p>
          <button
            className="text-white border rounded-lg p-2 w-full"
            onClick={onOver}
          >
            일정 종료
          </button>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/getPlan`,
    {
      params: {
        id: ctx.params?.id,
      },
    }
  );
  if (res.status === 200) {
    return {
      props: {
        status: 200,
        plan: res.data.plan,
        message: res.data.message,
      },
    };
  }

  return {
    props: {
      status: res.status,
      plan: null,
      message: res.data.message,
    },
  };
};

export default Detail;

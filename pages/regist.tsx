import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

export type RegistData = {
  title?: string;
  desc?: string;
  manager?: string;
  participants?: string[];
  budget?: number;
  startData?: Date;
  endDate?: Date;
};

const Regist = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistData>();
  const [error, setError] = useState<string | undefined>();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData?.participants || formData.participants.length === 0) {
      setError("적어도 한명의 참여자를 체크해주세요");
    } else {
      setError(undefined);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/regist`,
        {
          data: formData,
        }
      );
      if (res.status === 200) {
        toast.success("등록에 성공했습니다", {
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
      <div>
        <p className="text-2xl">일정 추가</p>
      </div>
      <form className="p-6 flex flex-col gap-3" onSubmit={onSubmit}>
        <div>
          <p className="text-xl">일정 타이틀</p>
          <input
            className="bg-black w-full rounded-lg border p-1 text-white"
            placeholder="타이틀을 입력해주세요"
            maxLength={30}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <p className="text-xl">일정 내용</p>
          <textarea
            className="bg-black w-full rounded-lg border p-1 text-white resize-none"
            placeholder="일정 내용을 입력해주세요"
            rows={7}
            maxLength={400}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, desc: e.target.value }))
            }
            required
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startData: new Date(e.target.value),
                  }))
                }
                required
              />
            </div>
            <div>
              <p>종료일</p>
              <input
                className="bg-black rounded-lg border p-1 text-white"
                type="date"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    endDate: new Date(e.target.value),
                  }))
                }
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl">총무</p>
          <select
            name="manager"
            className="bg-black w-full rounded-lg border p-2"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                manager: e.target.value,
              }))
            }
            required
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
          <p className="text-xl">참여자 선택</p>
          <fieldset className="flex gap-2">
            <div>
              <input
                type="checkbox"
                value="병준"
                name="participants"
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
        <button type="submit" className="text-white border rounded-lg p-2">
          등록
        </button>
      </form>
    </div>
  );
};

export default Regist;

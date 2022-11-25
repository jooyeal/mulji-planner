import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/molecule/Input";
import Label from "../../components/molecule/Label";
import Select from "../../components/molecule/Select";

type Props = {};

export type GurumeRegistData = {
  title?: string;
  desc?: string;
  mainmenu?: string;
  address?: string;
  writer?: string;
  image?: string | null;
};

const GurumeRegist = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<GurumeRegistData>();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/gurume/regist`,
      { data: formData }
    );
    if (res.status === 200) {
      toast.success("등록에 성공했습니다", {
        position: "bottom-center",
        autoClose: 2000,
      });
      router.push("/gurume");
    } else {
      toast.error("에러가 발생했습니다. 관리자에게 문의해주세요.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <Label type="title">맛집 등록</Label>
      <form className="p-6 flex flex-col gap-3" onSubmit={onSubmit}>
        <div>
          <Label type="subtitle">가게명</Label>
          <Input
            placeholder="가게명을 입력해주세요"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <Label type="subtitle">가게 설명</Label>
          <textarea
            className="bg-black w-full rounded-lg border p-1 text-white resize-none"
            placeholder="가게 설명을 입력해주세요"
            rows={7}
            maxLength={400}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, desc: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <Label type="subtitle">주력 메뉴</Label>
          <Input
            placeholder="주력 메뉴를 입력해주세요 ex) 짜장면"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mainmenu: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <Label type="subtitle">장소</Label>
          <Input
            placeholder="장소를 입력해주세요"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <Label type="subtitle">등록자</Label>
          <Select
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, writer: e.target.value }))
            }
            required
          >
            <option value="">당신의 이름은?</option>
            <option value="병준">병준</option>
            <option value="대현">대현</option>
            <option value="종찬">종찬</option>
            <option value="건">건</option>
            <option value="주열">주열</option>
          </Select>
        </div>
        <button type="submit" className="text-white border rounded-lg p-2">
          맛집 추가
        </button>
      </form>
    </div>
  );
};

export default GurumeRegist;

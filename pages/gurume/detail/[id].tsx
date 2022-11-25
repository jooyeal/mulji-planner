import { Gurume } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../components/molecule/Input";
import Label from "../../../components/molecule/Label";
import Select from "../../../components/molecule/Select";
import { GurumeRegistData } from "../regist";

type Props = {
  data: {
    status: number;
    gurume?: Gurume | null;
    message: string;
  };
};

const GurumeDetail: React.FC<Props> = ({
  data: { status, gurume, message },
}) => {
  const router = useRouter();
  const [update, setUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState<GurumeRegistData>({
    title: gurume?.title,
    desc: gurume?.desc,
    mainmenu: gurume?.mainmenu,
    address: gurume?.address,
    writer: gurume?.writer,
    image: gurume?.image,
  });
  if (status !== 200 || gurume === null || gurume === undefined) {
    return <div>{message}</div>;
  }

  const onDelete = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/gurume/delete`,
      { id: gurume.id }
    );
    if (res.status === 200) {
      toast.success("삭제에 성공했습니다", {
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/gurume/update`,
      {
        data: {
          id: gurume.id,
          formData,
        },
      }
    );
    if (res.status === 200) {
      toast.success("수정에 성공했습니다", {
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
      <div className="flex justify-end gap-2">
        {!update ? (
          <button
            className="border p-1 rounded-lg"
            onClick={() => setUpdate(true)}
          >
            수정하기
          </button>
        ) : (
          <button
            className="border p-1 rounded-lg"
            onClick={() => setUpdate(false)}
          >
            수정취소
          </button>
        )}
        <button className="border p-1 rounded-lg" onClick={onDelete}>
          삭제하기
        </button>
      </div>
      <form className="p-6 flex flex-col gap-3" onSubmit={onSubmit}>
        <div>
          <Label type="subtitle">가게명</Label>
          <Input
            defaultValue={gurume.title}
            disabled={!update}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div>
          <Label type="subtitle">가게 설명</Label>
          <textarea
            className="bg-black w-full rounded-lg border p-1 text-white resize-none"
            placeholder="가게 설명을 입력해주세요"
            rows={7}
            maxLength={400}
            defaultValue={gurume.desc}
            disabled={!update}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, desc: e.target.value }))
            }
          />
        </div>
        <div>
          <Label type="subtitle">주력 메뉴</Label>
          <Input
            defaultValue={gurume.mainmenu}
            disabled={!update}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mainmenu: e.target.value }))
            }
          />
        </div>
        <div>
          <Label type="subtitle">장소</Label>
          <Input
            defaultValue={gurume.address}
            disabled={!update}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>
        <div>
          <Label type="subtitle">등록자</Label>
          <Select
            defaultValue={gurume.writer}
            disabled={!update}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, writer: e.target.value }))
            }
          >
            <option value="">당신의 이름은?</option>
            <option value="병준">병준</option>
            <option value="대현">대현</option>
            <option value="종찬">종찬</option>
            <option value="건">건</option>
            <option value="주열">주열</option>
          </Select>
        </div>
        {update && (
          <button type="submit" className="border p-2 rounded-lg w-full">
            수정
          </button>
        )}
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/gurume/getById`,
    { params: { id: ctx.params?.id } }
  );
  if (res.status === 200) {
    return {
      props: {
        data: {
          status: 200,
          gurume: res.data.gurume,
          message: res.data.message,
        },
      },
    };
  }
  return {
    props: {
      data: {
        status: res.status,
        gurume: null,
        message: res.data.message,
      },
    },
  };
};

export default GurumeDetail;

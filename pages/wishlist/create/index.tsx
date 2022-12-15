import React, { useState } from "react";
import Input from "../../../components/molecule/Input";
import Label from "../../../components/molecule/Label";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Select from "../../../components/molecule/Select";

type Props = {};

export type Item = {
  title: string;
  quantity: number;
  unit: string;
};

const WishListCreate: React.FC<Props> = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>();
  const [itemInfo, setItemInfo] = useState<Item>({
    title: "",
    quantity: 0,
    unit: "개",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>();
  const onClickSave = async () => {
    if (title && items.length > 0) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/wishlist/regist`,
        {
          title,
          items,
        }
      );
      if (res.status === 200) {
        toast.success("등록에 성공했습니다", {
          position: "bottom-center",
          autoClose: 2000,
        });
        router.push("/wishlist");
      } else {
        toast.error("에러가 발생했습니다. 관리자에게 문의해주세요.", {
          position: "bottom-center",
          autoClose: 2000,
        });
      }
    } else {
      setError("타이틀을 입력하고, 물품을 한개이상 추가해주세요");
    }
  };
  return (
    <div>
      <Label type="title">장보기 리스트</Label>
      <br />
      <div className="p-6">
        <Label type="subtitle">타이틀</Label>
        <Input
          placeholder="타이틀 입력"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-4">
          <div className="flex gap-1">
            <Input
              className="w-3/6"
              type="text"
              placeholder="물품명"
              value={itemInfo.title}
              onChange={(e) =>
                setItemInfo((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Input
              className="w-2/6"
              type="number"
              placeholder="개수"
              value={itemInfo.quantity}
              onChange={(e) =>
                setItemInfo((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }))
              }
            />
            <Select
              className="w-1/6"
              value={itemInfo.unit}
              onChange={(e) =>
                setItemInfo((prev) => ({ ...prev, unit: e.target.value }))
              }
            >
              <option value="개">개</option>
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="l">l</option>
              <option value="ml">ml</option>
            </Select>
          </div>
          <div className="mt-2 flex justify-end">
            <button
              className="text-white border rounded-lg p-2"
              onClick={() => {
                if (
                  itemInfo.title !== "" &&
                  itemInfo.quantity !== 0 &&
                  itemInfo.unit !== ""
                ) {
                  setItems((prev) => [...prev, itemInfo]);
                  setItemInfo({ title: "", quantity: 0, unit: "개" });
                  setError(null);
                } else {
                  setError("물품명과 개수,단위 를 입력해주세요");
                }
              }}
            >
              추가
            </button>
          </div>
          <div className="mt-4">
            <p>물품리스트</p>
            <hr />
            <div className="flex flex-col gap-3 p-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="">{item.title}</p>
                  <div className="flex items-center gap-1">
                    <p className="">
                      {item.quantity} {item.unit}
                    </p>
                    <BiTrash
                      onClick={() =>
                        setItems((prev) => prev.filter((_, i) => i !== index))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <button
          className="text-white border rounded-lg p-2 w-full mt-4"
          onClick={onClickSave}
        >
          보존
        </button>
      </div>
    </div>
  );
};

export default WishListCreate;

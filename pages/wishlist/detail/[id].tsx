import { WishItem, WishList } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { ChangeEvent, useState } from "react";
import Input from "../../../components/molecule/Input";
import Label from "../../../components/molecule/Label";
import { BiTrash, BiCaretDown, BiCaretUp } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Item } from "../create";
import Select from "../../../components/molecule/Select";

type Props = {
  data: {
    list:
      | WishList & {
          items: WishItem[];
        };

    message: string;
  };
};

const WishListDetail: React.FC<Props> = ({ data: { list, message } }) => {
  const router = useRouter();
  const [itemList, setItemList] = useState<(WishItem & { status: boolean })[]>(
    list.items.map((l) => ({ ...l, status: true }))
  );
  const [itemInfo, setItemInfo] = useState<Item>({
    title: "",
    quantity: 0,
    unit: "개",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState<{ new: boolean; old: boolean }>({
    new: false,
    old: false,
  });
  const [error, setError] = useState<string | null>();

  if (message) {
    return (
      <div className="flex justify-center items-center">
        <p>{message}</p>
      </div>
    );
  }

  const onChangeCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
    item: WishItem & {
      status: boolean;
    }
  ) => {
    if (e.target.checked) {
      setItemList((prev) =>
        prev.map((i) => {
          if (i.id === item.id) {
            return { ...i, isPurchased: true };
          } else {
            return i;
          }
        })
      );
    } else {
      setItemList((prev) =>
        prev.map((i) => {
          if (i.id === item.id) {
            return { ...i, isPurchased: false };
          } else {
            return i;
          }
        })
      );
    }
  };

  const onClickTrashOrClose = (
    status: boolean,
    item: WishItem & {
      status: boolean;
    }
  ) => {
    setItemList((prev) =>
      prev.map((i) => {
        if (i.id === item.id) {
          return { ...i, status };
        }
        return i;
      })
    );
  };

  const onClickSave = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/wishlist/update`,
      {
        id: list.id,
        items: itemList
          .filter((item) => item.status === true)
          .map((item) => ({
            isPurchased: item.isPurchased,
            title: item.title,
            quantity: item.quantity,
            unit: item.unit,
          })),
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
  };

  const onClickDelete = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/wishlist/delete`,
      {
        id: list.id,
      }
    );
    if (res.status === 200) {
      toast.success("삭제에 성공했습니다", {
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
  };

  const onClickAddNewList = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/wishlist/addList`,
      {
        id: list.id,
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
  };

  return (
    <div>
      <Label type="title">{list.title}</Label>
      <p>
        구입 완료한 물품은 등록된 물품리스트의 체크박스를 체크한 후 보존을
        눌러주세요
      </p>
      <hr />
      <div className="p-2 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Label type="subtitle">새로운물품추가</Label>
          {open.new ? (
            <BiCaretUp
              onClick={() => setOpen((prev) => ({ ...prev, new: false }))}
            />
          ) : (
            <BiCaretDown
              onClick={() => setOpen((prev) => ({ ...prev, new: true }))}
            />
          )}
        </div>
        <div className={`${!open.new && "hidden"}`}>
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
          <button
            className="text-white border rounded-lg p-2 w-full mt-4"
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
          <button
            className="text-white border rounded-lg p-2 w-full mt-4"
            onClick={onClickAddNewList}
          >
            보존
          </button>
          {error && <p className="text-center text-red-400">{error}</p>}
        </div>
        <hr className="mt-10" />
        <div className="flex justify-between">
          <Label type="subtitle">등록된 물품리스트</Label>
          {open.old ? (
            <BiCaretUp
              onClick={() => setOpen((prev) => ({ ...prev, old: false }))}
            />
          ) : (
            <BiCaretDown
              onClick={() => setOpen((prev) => ({ ...prev, old: true }))}
            />
          )}
        </div>
        <div className={`${!open.old && "hidden"} flex flex-col gap-2`}>
          {itemList.map((item) => (
            <div
              key={item.id}
              className="flex w-full border p-2 rounded-lg items-center justify-between"
            >
              <div className="flex">
                <div>
                  <Input
                    checked={item.isPurchased}
                    type="checkbox"
                    onChange={(e) => onChangeCheckbox(e, item)}
                  />
                </div>
                <p
                  className={`ml-4 ${item.status === false && "line-through"}`}
                >
                  {item.title}
                </p>
                <p
                  className={`ml-4 ${item.status === false && "line-through"}`}
                >
                  {item.quantity} {item.unit}
                </p>
              </div>
              {item.status ? (
                <BiTrash onClick={() => onClickTrashOrClose(false, item)} />
              ) : (
                <AiOutlineClose
                  onClick={() => onClickTrashOrClose(true, item)}
                />
              )}
            </div>
          ))}
          <button
            className="text-white border rounded-lg p-2 w-full mt-4"
            onClick={onClickSave}
          >
            보존
          </button>
        </div>
        <button
          className="text-white border rounded-lg p-2 w-full mt-4"
          onClick={onClickDelete}
        >
          장보기 삭제
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/wishlist/getById`,
    { params: { id: ctx.query.id } }
  );
  if (res.status === 200) {
    return {
      props: {
        data: {
          status: 200,
          list: res.data.list,
        },
      },
    };
  }
  return {
    props: {
      data: {
        status: res.status,
        list: null,
        message: res.data.message,
      },
    },
  };
};

export default WishListDetail;

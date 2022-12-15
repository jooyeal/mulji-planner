import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { Item } from "../../wishlist/create";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id: string | number = req.body.id;
    const items: Item[] = req.body.items;

    if (id && items && items.length > 0) {
      await prisma.wishList.update({
        where: {
          id: Number(id),
        },
        data: {
          items: {
            create: items,
          },
        },
      });
      res.status(200).json("성공");
    } else {
      res.status(400).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
  }
}

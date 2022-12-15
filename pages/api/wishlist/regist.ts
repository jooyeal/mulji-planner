import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { Item } from "../../wishlist/create";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const items: Item[] = req.body.items;
    const title: string = req.body.title;

    if (title && items && items.length > 0) {
      await prisma.wishList.create({
        data: {
          title,
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

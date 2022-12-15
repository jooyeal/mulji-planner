import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { WishItem, WishList } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    list?:
      | (WishList & {
          items: WishItem[];
        })
      | null;
    message?: string;
  }>
) {
  try {
    const id = req.query.id;
    const list = await prisma.wishList.findUnique({
      where: { id: Number(id) },
      include: { items: true },
    });
    if (list) {
      res.status(200).json({ list });
    } else {
      res
        .status(400)
        .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
  }
}

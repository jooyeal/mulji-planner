import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { WishList } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ wishList?: WishList[]; message?: string }>
) {
  try {
    const wishList = await prisma.wishList.findMany({
      include: { items: true },
    });
    res.status(200).json({ wishList });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
  }
}

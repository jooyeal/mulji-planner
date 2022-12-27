import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { User } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ users?: User[]; message: string }>
) {
  try {
    const email = req.query.email;
    if (email && typeof email === "string") {
      const users = await prisma.user.findMany({
        where: {
          NOT: {
            email,
          },
        },
      });
      res.status(200).json({ users, message: "성공" });
    } else {
      const users = await prisma.user.findMany();
      res.status(200).json({ users, message: "성공" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
  }
}

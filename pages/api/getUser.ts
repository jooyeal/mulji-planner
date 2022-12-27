import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { User } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user?: User; message: string }>
) {
  try {
    const email = req.query.email;
    if (email && typeof email === "string") {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        res.status(200).json({ user, message: "성공" });
      } else {
        res
          .status(400)
          .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
      }
    } else {
      res
        .status(400)
        .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
  }
}

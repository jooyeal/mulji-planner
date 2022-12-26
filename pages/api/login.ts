import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (email && password) {
      const user = await prisma.user.findFirst({ where: { email, password } });
      if (user) {
        res.status(200).json("성공");
      } else {
        res.status(401).json("인증에러");
      }
    } else {
      res.status(400).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
    }
  } catch (e) {
    res.status(500).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
  }
}

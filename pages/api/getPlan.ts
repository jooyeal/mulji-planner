import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { Plan } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ plan?: Plan | null; message: string }>
) {
  try {
    if (req.query.id) {
      const plan = await prisma.plan.findUnique({
        where: {
          id: Number(req.query.id),
        },
      });
      res.status(200).json({ plan, message: "성공" });
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

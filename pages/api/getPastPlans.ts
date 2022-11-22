import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { Plan } from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ plans?: Plan[]; message: string }>
) {
  try {
    const plans = await prisma.plan.findMany({
      where: {
        isOver: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });
    res.status(200).json({ plans: plans, message: "성공" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
  }
}

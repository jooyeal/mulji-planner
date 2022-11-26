import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { Schedule } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ schedule?: Schedule | null; message: string }>
) {
  try {
    if (req.query.writer) {
      const schedule = await prisma.schedule.findUnique({
        where: { writer: String(req.query.writer) },
      });
      res.status(200).json({ schedule, message: "성공" });
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

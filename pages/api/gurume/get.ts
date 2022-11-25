import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { Gurume } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ gurumes?: Gurume[]; message: string }>
) {
  try {
    const gurumes = await prisma.gurume.findMany();
    res.status(200).json({ gurumes: gurumes, message: "성공" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
  }
}

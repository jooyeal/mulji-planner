import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
import { RegistData } from "../regist";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const registData: RegistData = req.body.data;
    if (
      registData.title &&
      registData.desc &&
      registData.startData &&
      registData.endDate &&
      registData.manager &&
      registData.participants &&
      registData.budget
    ) {
      await prisma.plan.create({
        data: {
          title: registData.title,
          desc: registData.desc,
          startDate: registData.startData,
          endDate: registData.endDate,
          manager: registData.manager,
          participants: registData.participants,
          budget: registData.budget,
        },
      });
      res.status(200).json("성공");
    } else {
      res.status(400).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
    }
  } catch (e) {
    res.status(500).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
  }
}

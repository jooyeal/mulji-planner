import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { ScheduleRegistData } from "../../schedule/[name]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const registData: ScheduleRegistData = req.body.data;
    if (registData.writer && registData.availableDates) {
      const writer = await prisma.schedule.findUnique({
        where: { writer: registData.writer },
      });
      if (writer) {
        await prisma.schedule.update({
          where: {
            writer: registData.writer,
          },
          data: {
            availableDates: registData.availableDates,
          },
        });
      } else {
        await prisma.schedule.create({
          data: {
            writer: registData.writer,
            availableDates: registData.availableDates,
          },
        });
      }
      res.status(200).json("성공");
    } else {
      res.status(400).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    sameDay?: Date[] | null;
    message: string;
  }>
) {
  try {
    const writers: string[] = req.body.data.writers;
    const month: string = req.body.data.month;
    if (writers && month) {
      const personalSchedules = await Promise.all(
        writers.map(async (writer) => {
          const personalSchedule = await prisma.schedule.findUnique({
            where: { writer },
          });
          return personalSchedule;
        })
      );
      const allDate = personalSchedules.map((s) => s?.availableDates);
      const oneDimension = allDate.reduce((prev, curr) => {
        if (prev && curr) {
          return [...prev, ...curr];
        }
      }, []);

      const startMonthDay = new Date(month);
      const endMonthDay = new Date(
        new Date(month).getFullYear(),
        new Date(month).getMonth() + 1
      );

      const monthDay = oneDimension?.filter(
        (day) => day >= startMonthDay && day <= endMonthDay
      );
      if (monthDay && monthDay.length > 0) {
        const sameDay: Date[] = [];
        for (let i = 0; i < monthDay.length; i++) {
          let count = 0;
          for (let j = i + 1; j < monthDay.length; j++) {
            if (monthDay[i].toDateString() === monthDay[j].toDateString()) {
              count++;
            }
          }
          if (count === writers.length - 1) {
            sameDay.push(monthDay[i]);
          }
        }
        res.status(200).json({ sameDay, message: "성공" });
      } else {
        res.status(200).json({ sameDay: null, message: "성공" });
      }
    } else {
      res
        .status(400)
        .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "에러가 발생했습니다. 관리자에게 문의해주세요." });
  }
}

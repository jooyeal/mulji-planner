import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { GurumeRegistData } from "../../gurume/regist";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const registData: GurumeRegistData = req.body.data.formData;
    if (
      registData.title &&
      registData.desc &&
      registData.mainmenu &&
      registData.address &&
      registData.writer
    ) {
      await prisma.gurume.update({
        where: {
          id: req.body.data.id,
        },
        data: {
          title: registData.title,
          desc: registData.desc,
          mainmenu: registData.mainmenu,
          address: registData.address,
          writer: registData.writer,
          image: registData.image,
        },
      });
      res.status(200).json("성공");
    } else {
      res.status(400).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json("에러가 발생했습니다. 관리자에게 문의해주세요.");
  }
}

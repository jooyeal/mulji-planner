// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const birthdays = [
    { day: "3-28", name: "대현" },
    { day: "4-6", name: "건" },
    { day: "7-11", name: "병준" },
    { day: "8-25", name: "종찬" },
    { day: "12-29", name: "주열" },
  ];

  const emails = ["gunnkeem@gmail.com", "jyol1234@gmail.com"];
  const HOST_EMAIL = "jyol1234@gmail.com";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: HOST_EMAIL,
      pass: process.env.NEXT_PUBLIC_MAIL_APP_SECRET ?? "",
    },
  });

  const today = `${new Date().getMonth() + 1}-${new Date().getDate()}`;
  birthdays.forEach((bd) => {
    if (bd.day === today) {
      emails.forEach((email) => {
        transporter.sendMail(
          {
            from: HOST_EMAIL,
            to: email,
            subject: `${bd.name}이에게 생일 축하 합시다`,
            text: `${bd.name}이가 오늘 생일입니다잉~`,
          },
          function (error, info) {
            if (error) {
              console.error(error);
              res.status(500).json("mail send error");
            } else {
              console.log(`Email sent: ${info.response}`);
            }
          }
        );
      });
    }
  });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const birthdays = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const HOST_EMAIL = "jyol1234@gmail.com";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: HOST_EMAIL,
      pass: process.env.MAIL_APP_SECRET ?? "",
    },
  });

  transporter.sendMail(
    {
      from: HOST_EMAIL,
      to: HOST_EMAIL,
      subject: "생일 축하 합니다~~~~~~",
      text: "sending mail by nodemailer",
    },
    function (error, info) {
      if (error) {
        console.error(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    }
  );
}

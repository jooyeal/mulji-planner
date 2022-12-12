import { createFunction } from "inngest";
import { serve } from "inngest/next";
import nodemailer from "nodemailer";
const myFn = createFunction(
  "Email send function",
  "send mail",
  async ({ event }) => {
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
);

export default serve("My App", [myFn]);

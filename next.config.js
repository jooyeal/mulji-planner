/** @type {import('next').NextConfig} */
const axios = require("axios");
const cron = require("node-cron");
const withPWA = require("next-pwa")({
  dest: "public",
});

cron.schedule("* * * * *", async () => {
  // await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/mail/send`);
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});

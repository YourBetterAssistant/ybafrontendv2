/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "images-ext-2.discordapp.net",
      "cdn.discordapp.com",
      "media.discordapp.net",
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

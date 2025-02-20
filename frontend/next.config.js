/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  env: {
    MW_BACKEND_PORT: process.env.MW_BACKEND_PORT,
    MW_BACKEND_HOST: process.env.MW_BACKEND_HOST,
  },
};

module.exports = config;

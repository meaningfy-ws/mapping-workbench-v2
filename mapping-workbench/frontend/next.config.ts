import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
//
module.exports = {
  async rewrites() {
    return [
      {
        source: '/localhost',
        destination: '/localhost',
      },
    ]
  },
}

module.exports.rewrites()


export default nextConfig;

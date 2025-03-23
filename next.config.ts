import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "frontend-take-home.fetch.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Blank thake */
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'images.clerk.dev' },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent ESLint errors from failing production builds; we lint in CI/dev
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

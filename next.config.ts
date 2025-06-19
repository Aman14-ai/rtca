import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/conversations",
        permanent: true,
      }
    ]
  },
   eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ disables TS errors during build
  }
}


export default nextConfig;

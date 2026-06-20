import type { NextConfig } from "next";

const staticCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error"],
          }
        : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/team/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/team-moments/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/track-record/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/:path*.webp",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/:path*.mp4",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
    ];
  },
};

export default nextConfig;

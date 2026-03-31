import type { NextConfig } from "next";

const mediaOrigin =
  process.env.NEXT_PUBLIC_MEDIA_ORIGIN ?? "https://pokerplanets.pavva.org";

const nextConfig: NextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${mediaOrigin.replace(/\/$/, "")}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

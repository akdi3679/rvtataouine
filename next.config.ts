import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.sanity.io" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/:locale/valladolid/boutique", destination: "/:locale/boutique?team=valladolid", permanent: true },
      { source: "/:locale/valladolid/boutique/:slug", destination: "/:locale/boutique/:slug", permanent: true },
      { source: "/:locale/valladolid/tv", destination: "/:locale/tv?team=valladolid", permanent: true },
      { source: "/:locale/valladolid/actualites", destination: "/:locale/actualites?team=valladolid", permanent: true },
      { source: "/:locale/valladolid/actualites/:slug", destination: "/:locale/actualites/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=300" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
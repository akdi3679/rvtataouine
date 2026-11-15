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
      { source: "/:locale/valladolid/boutique/:slug", destination: "/:locale/boutique/:slug?team=valladolid", permanent: true },
      { source: "/:locale/valladolid/tv", destination: "/:locale/tv?team=valladolid", permanent: true },
      { source: "/:locale/valladolid/actualites", destination: "/:locale/actualites?team=valladolid", permanent: true },
      { source: "/:locale/valladolid/actualites/:slug", destination: "/:locale/actualites/:slug?team=valladolid", permanent: true },
      { source: "/:locale/valladolid/contact", destination: "/:locale/contact", permanent: true },
      { source: "/:locale/valladolid/inscription", destination: "/:locale/inscription", permanent: true },

      // Legal pages moved from /valladolid/* to root
      { source: "/:locale/valladolid/mentions-legales",          destination: "/:locale/mentions-legales",          permanent: true },
      { source: "/:locale/valladolid/politique-confidentialite", destination: "/:locale/politique-confidentialite", permanent: true },
      { source: "/:locale/valladolid/cookies",                   destination: "/:locale/cookies",                   permanent: true },
      { source: "/:locale/valladolid/cgv",                       destination: "/:locale/cgv",                       permanent: true },
    ];
  },  async headers() {
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
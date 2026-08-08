const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  runtimeCaching: [
    {
      urlPattern: /^https:\/\/eyjhwifhaehxxdcfuunx\.supabase\.co\/storage\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "supabase-images",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eyjhwifhaehxxdcfuunx.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
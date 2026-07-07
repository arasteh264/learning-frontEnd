const nextConfig = {
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

module.exports = nextConfig;
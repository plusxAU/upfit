/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonical: www → non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.upfit.au" }],
        destination: "https://upfit.au/:path*",
        permanent: true,
      },
      // Legacy /services root → home (no /services index page exists)
      {
        source: "/services",
        destination: "/",
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upfit.au" },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // XSS protection (legacy browsers)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Referrer policy — send full URL within site, origin only cross-site
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — restrict unused APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Long-term cache for static assets
        source: "/(:path*\\.(?:ico|png|svg|jpg|jpeg|gif|webp|woff|woff2))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

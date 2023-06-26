/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  "typescript": {
    "ignoreBuildErrors": true,
  },
    assetPrefix: '/nextjs',
    rewrites() {
      return [
        { source: '/nextjs/_next/:path*', destination: '/nextjs/_next/:path*' }
      ]
    },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.rgb.irpsc.com",
      },
      {
        protocol: "https",
        hostname: "admin.rgb.irpsc.com",
      },
      {
        protocol: "https",
        hostname: "dl.qzparadise.ir"
      },
      {
        protocol: "https",
        hostname: "irpsc.com"
      },
      {
        protocol: "https",
        hostname: "dl.qzparadise.ir"
      }
    ]
  },
  
}
module.exports = nextConfig

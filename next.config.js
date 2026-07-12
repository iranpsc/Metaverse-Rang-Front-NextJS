/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: true,

  output: "standalone",

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/fa",
        permanent: true,
        basePath: false,
      },
      {
        source: "/:lang/citizen",
        destination: "/:lang/citizens",
        permanent: true,
      },
      {
        source: "/:lang/citizen/:id",
        destination: "/:lang/citizens/:id",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/lang/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
        ],
      },
      {
        source: "/uploads/calendars/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { icon: true },
        },
      ],
    });

    return config;
  },

  images: {
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 128, 256, 384, 512, 540, 600],
    qualities: [25, 50, 75],
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      { protocol: "https", hostname: "metarang.com", pathname: "/**" },
      { protocol: "https", hostname: "s3.metarang.com", pathname: "/**" },
      { protocol: "https", hostname: "api.metarang.com", pathname: "/**" },
      { protocol: "http", hostname: "api.metarang.com", pathname: "/**" },
      { protocol: "https", hostname: "admin.metarang.com", pathname: "/**" },
      { protocol: "http", hostname: "admin.metarang.com", pathname: "/**" },

      { protocol: "https", hostname: "**.irpsc.com", pathname: "/**" },
      { protocol: "https", hostname: "rgb.irpsc.com" },
      { protocol: "http", hostname: "rgb.irpsc.com" },

      { protocol: "http", hostname: "localhost" },

      { protocol: "https", hostname: "frdevelop2.irpsc.com" },
      { protocol: "https", hostname: "supabase.com" },
      { protocol: "https", hostname: "3d.irpsc.com" },
      { protocol: "https", hostname: "dl.qzparadise.ir" },
    ],
  },
};

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(nextConfig, {
  org: "sentry",
  project: "metaverse-rang-front-nextjs",
  sentryUrl: "https://sentry.irpsc.com/",

  silent: !process.env.CI,

  widenClientFileUpload: true,

  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
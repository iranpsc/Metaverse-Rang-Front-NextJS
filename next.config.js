// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔹 فعال‌کردن سورس‌مپ در پروداکشن (برای رفع هشدار Missing source maps)
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
        source: '/lang/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },

          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          },
        ],
      },
      {
        //  کش برای تصاویر (یک‌ساله + immutable)
        source: "/uploads/calendars/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        //  کش برای فونت‌ها
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
    // 🔹 پشتیبانی از فایل‌های GLB/GLTF
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });

    // 🔹 پشتیبانی از فایل‌های SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },

  images: {
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 128, 256, 384, 512, 540, 600],
    qualities: [25, 50, 75],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "metarang.com", pathname: "/**", },
      { protocol: "https", hostname: "api.metarang.com", pathname: "/**", },
      { protocol: "http", hostname: "api.metarang.com", pathname: "/**", },
      {
        protocol: "https",
        hostname: "admin.metarang.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "admin.metarang.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "admin.rgb.irpsc.com" },
      { protocol: "https", hostname: "api.rgb.irpsc.com", pathname: "/**", },
      { protocol: "https", hostname: "dev-nextjs.metarang.com" },
      {
        protocol: "https",
        hostname: "**.irpsc.com",
      },
      { protocol: "https", hostname: "rgb.irpsc.com" },
      { protocol: "http", hostname: "rgb.irpsc.com" },
      { protocol: "http", hostname: "localhost" },
      {
        protocol: "https",
        hostname: "**.irpsc.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "frdevelop2.irpsc.com" },
      { protocol: "https", hostname: "supabase.com" },
      { protocol: "https", hostname: "3d.irpsc.com" },
      { protocol: "https", hostname: "dl.qzparadise.ir" },

    ],
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "sentry",
  project: "metaverse-rang-front-nextjs",
  sentryUrl: "https://sentry.irpsc.com/",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});

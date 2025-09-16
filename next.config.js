// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔹 فعال‌کردن سورس‌مپ در پروداکشن (برای رفع هشدار Missing source maps)
  productionBrowserSourceMaps: true,

  async redirects() {
    return [
      {
        source: '/:lang/citizen',
        destination: '/:lang/citizens',
        permanent: true,
      },
      {
        source: '/:lang/citizen/:id',
        destination: '/:lang/citizens/:id',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // 📌 کش برای تصاویر (یک‌ساله + immutable)
        source: '/uploads/calendars/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // می‌تونی مسیرهای دیگه مثل fonts رو هم اضافه کنی:
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [50, 120, 220, 320, 640, 750, 1080],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dl.qzparadise.ir',
      },
      {
        protocol: 'https',
        hostname: 'api.rgb.irpsc.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.rgb.irpsc.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'irpsc.com',
      },
    ],
  },
};

module.exports = nextConfig;

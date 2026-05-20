// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔹 فعال‌کردن سورس‌مپ در پروداکشن (برای رفع هشدار Missing source maps)
  productionBrowserSourceMaps: true,
output: 'standalone',
logging: {
    fetches: {
      fullUrl: true,
    },
  },
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
      {
        // 📌 کش برای فونت‌ها
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
    // 🔹 پشتیبانی از فایل‌های GLB/GLTF
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });

    // 🔹 پشتیبانی از فایل‌های SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },

  images: {
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 128, 256, 384, 512, 540, 600],
qualities: [25, 50, 75],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'dl.qzparadise.ir' },
      { protocol: 'https', hostname: 'api.metarang.com' },
      { protocol: 'https', hostname: 'api.rgb.irpsc.com' },
      { protocol: 'https', hostname: 'admin.metarang.com' },
      { protocol: 'https', hostname: 'admin.rgb.irpsc.com' },
      { protocol: 'https', hostname: '*.irpsc.com' }, 
      { protocol: 'https', hostname: 'rgb.irpsc.com' },
      { protocol: 'http', hostname: 'rgb.irpsc.com' },
      { protocol: 'https', hostname: 'metarang.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'irpsc.com' },
      { protocol: 'https', hostname: 'frdevelop2.irpsc.com' },
      { protocol: 'https', hostname: 'supabase.com' },
      { protocol: 'https', hostname: '3d.irpsc.com' },
      { protocol: 'https', hostname: 'metarang.com' },

    ],
  },

};

module.exports = nextConfig;

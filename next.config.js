// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

module.exports = {
  async redirects() {
    return [
      // Auto redirect
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
        // اعمال کشینگ برای تصاویر در مسیر uploads/calendars (و زیرمسیرها)
        source: '/uploads/calendars/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // کش برای ۱ سال، immutable برای جلوگیری از revalidation
          },
        ],
      },
      // اگر مسیرهای دیگری مثل flags داری، اینجا اضافه کن
      // مثلاً:
      // {
      //   source: '/flags/:path*',
      //   headers: [
      //     { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      //   ],
      // },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200], // Keep default sizes for other images
    imageSizes: [50, 120, 220, 320, 640, 750, 1080],
    formats: ['image/avif', 'image/webp'], // اضافه کردن AVIF برای بهینه‌سازی بیشتر (پیشنهاد PSI)
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
  // async rewrites() {
  //   return [
  //     {
  //       source: "/robots.txt",
  //       destination: "/_next/static/robots.txt",
  //     },
  //   ];
  // },
};

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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200], // Keep default sizes for other images
    imageSizes: [50, 120, 220, 320, 640, 750, 1080], // Add 120px for specific use cases like the one you're targeting
    formats: ['image/webp'], // Support webp and jpg
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

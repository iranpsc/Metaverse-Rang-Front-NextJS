
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  images: {
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

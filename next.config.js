/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  images: {
    domains: ["dl.qzparadise.ir", "api.rgb.irpsc.com"],
  },
  experimental: { esmExternals: true },
};

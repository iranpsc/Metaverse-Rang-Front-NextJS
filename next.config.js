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
    domains: [
      "dl.qzparadise.ir",
      "api.rgb.irpsc.com",
      "admin.rgb.irpsc.com",
      "admin.rgb.irpsc.comlevels",
      "localhost",
    ],
  },
  experimental: { esmExternals: true, serverActions: true },
  async rewrites() {
    return [
      {
        source: "/en/citizen/:id",
        destination: "https://play.irpsc.com/metaverse/lang/en.json",
      },
      {
        source: "/fa/citizen/:id",
        destination: "https://play.irpsc.com/metaverse/lang/fa.json",
      },
      
    ];
  },
};

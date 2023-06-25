module.exports = {
    // ...
    assetPrefix: '/new',
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      })
  
      return config
    },
  }
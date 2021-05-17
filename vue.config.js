module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/TerrariaStore3.0/'
  : '/',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production'
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
},
}

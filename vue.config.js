const isProd = process.env.VUE_APP_MODE === 'production'
const path = require('path')
const AutoDllPlugin = require('autodll-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')
const nill = () => {}
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: `dist_${process.env.VUE_APP_MODE}`,
  assetsDir: 'assets',
  // filenameHashing: false,
  lintOnSave: true,
  // lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     '@': resolve('/src'),
    //   },
    //   unsafeCache: false,
    // },
    // webpack plugins
    plugins: [
      !isProd
        ? new HardSourceWebpackPlugin({
            cacheDirectory: './../node_modules/.hard-source-cache/[confighash]',
          })
        : nill,
      isProd
        ? new AutoDllPlugin({
            inject: true,
            filename: '[name]-dll-[hash].js',
            path: 'resource/js',
            entry: {
              vendor: ['vue', 'vuex', 'vue-router', 'axios', 'vant'],
            },
          })
        : nill,
      isProd
        ? new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html)$/,
            threshold: 10240,
          })
        : nill,
      // 测试环境引入 vconsole
      new VConsolePlugin({ enable: !isProd }),
    ],
    optimization: {
      minimize: isProd,
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 1024 }))
  },
  // css相关配置
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    }, // css预设器配置项
    modules: false,
  },

  devServer: {
    port: 8080, // 端口号
    open: true, //配置自动启动浏览器
    proxy: {
      '/htsec-admin': {
        target: 'http://testtch.haitong.com:8090',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/htsec-admin': '/htsec-admin',
        },
      },
    },
  },
}

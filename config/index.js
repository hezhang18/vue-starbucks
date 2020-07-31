'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {

        '/selection': {
            target: 'http://localhost:3000'
        },

        '/beverages': {
            target: 'http://localhost:3000',
        },

        '/food': {
            target: 'http://localhost:3000',
        },

        '/coffee': {
            target: 'http://localhost:3000',
        },

        '/merchandise': {
            target: 'http://localhost:3000',
        },

        '/storelocation': {
            target: 'http://localhost:3000',
        },

        '/cityinfo': {
            target: 'http://localhost:3000',
        },

        '/users': {
            target: 'http://localhost:3000',
        },

        '/menu/users': {
            target: 'http://localhost:3000',
            pathRewrite: {
                '/menu/users': '/users'
            }
        },

        '/account/users': {
            target: 'http://localhost:3000',
            pathRewrite: {
                '/account/users': '/users'
            }
        },

        '/account/profile/users': {
            target: 'http://localhost:3000',
            pathRewrite: {
                '/account/profile/users': '/users'
            }
        },

    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    // Source Maps 保存每个代码压缩前的位置信息，方便再开发阶段调试，上线时可关闭，减少代码包大小
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'svg'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // bundleAnalyzerReport: process.env.npm_config_report
    bundleAnalyzerReport: true
  }
}

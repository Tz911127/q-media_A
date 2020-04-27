// 'use strict'

const path = require('path');

module.exports = {
    publicPath: './',
    outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist',
    css: { // 一次配置，全局使用，这个scss 因为每个文件都要引入
        loaderOptions: {
            sass: {
                data: `@import "./src/assets/hotcss/px2rem.scss";`
            }
        }
    },
    productionSourceMap: false,
    integrity: false,
    devServer: {
        port: 8080,
        host: "0.0.0.0",
        https: false,
        // 自动启动浏览器
        open: false,
        proxy: {
            '/api': {
                target: 'https://sys.q-media.red', //后端接口地址
                // target: 'http://192.168.1.126:9000', //后端接口地址
                changeOrigin: true, //是否允许跨越
                secure: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    configureWebpack: { // 覆盖webpack默认配置的都在这里
        resolve: { // 配置解析别名
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@h': path.resolve(__dirname, './src/assets/hotcss'),
                '@s': path.resolve(__dirname, './src/assets/style'),
                '@i': path.resolve(__dirname, './src/assets/images'),
            }
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }

}
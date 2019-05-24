const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const manifest = process.env.NODE_ENV === 'production' ? require('./dll/vendor.manifest.json') : require('./dll/vendor.dev.manifest.json');
const vendorPath = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'dll/vendor.js') : path.resolve(__dirname, 'dll/vendor.dev.js');
module.exports = {
    version: '>=0.8.1',
    type: 'app',
    staticPath: './static/',
    srcPath: './client/',
    docs: false,
    extractCSS: false,
    sourceMap: false,
    resolvePriority: 'current',
    entry: {
        prepend: ['babel-polyfill', 'whatwg-fetch'],
        pages: ['index', 'dashboard', 'login'],
        commons: true,
    },
    webpack: {
        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/public/',
        },
        resolve: {
            alias: {
                vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
                'vue-router$': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.esm.js'),
                '@': path.resolve(__dirname, 'client'),
                services: path.resolve(__dirname, 'client/services'),
            },
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre',
            }],
        },
        plugins: [
            // 关联生成的 dll 信息文件
            new webpack.DllReferencePlugin({
                manifest,
            }),
            // 将 vendor.js 带上 hash 并注入到 html 中
            new AddAssetHtmlPlugin({
                filepath: vendorPath,
                hash: true,
                includeSourcemap: false,
            }),
        ],
    },
    webpackDevServer: {
        // host: 'http://localhost',
        port: 9090,
        publicPath: '/public/',
        contentBase: path.resolve(__dirname, 'public'),
        proxy: [{
            context: '/api',
            target: 'http://localhost:7000',
        }, {
            context: ['/', '/dashboard', '/index', '/login'],
            target: 'http://localhost:9090',
            pathRewrite: (path) => {
                if (path === '/')
                    return '/public/index.html';
                else
                    return '/public' + path + '.html';
            },
        }],
    },
};

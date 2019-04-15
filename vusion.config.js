const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

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
        plugins: [
            // 关联生成的 dll 信息文件
            new webpack.DllReferencePlugin({
                manifest: require('./dll/vendor.manifest.json'),
            }),
            // 将 vendor.js 带上 hash 并注入到 html 中
            new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, 'dll/vendor.js'),
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

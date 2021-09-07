/**
 * Base
 */
const {resolve} = require('path');
// 引入该Plugin  动态在html文件中引入js/css文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 在每次重新打包的时候，清除原始打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 将css样式从js文件中提取到单独的css文件中，通过外链的形式引入
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyPlugin = require('copy-webpack-plugin');

const {PROJECT_PATH, isDev} = require('../constants.js');

const WebpackBar = require('webpackbar')

// 提高编译速度，第一次编译时做一个缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// const path = resolve(PROJECT_PATH, './dist');
module.exports = {
    // mode: 'development', // 开发模式
    entry: {// 入口文件
        index: resolve(PROJECT_PATH, './src/index.tsx'),
        // header: resolve(PROJECT_PATH, './src/header.js')
    }, 
    output: {
        filename: `[name]${isDev ? '' : '.[hash:8]'}.js`, // 打包后的文件名称
        path: resolve(PROJECT_PATH, './dist') // 打包后的目录
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', // 这个是把样式通过<style></style>标签把样式插入进去 如果使用MiniCss通过外链引入的话，就注释掉不使用
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', 
                    'css-loader', 
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                // 增加该配置识别jsx语法
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: {cacheDirectory: true},
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(PROJECT_PATH,'./public/index.html'),
            filename: 'index_dist.html',
            chunks: ['index'], // 为不同页面注入不同的chunk （chunk是打包生成的js文件）
            cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
            minify: isDev ? false : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                useShortDoctype: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css'
        }),

        new CopyPlugin({
            patterns: [{
                context: resolve(PROJECT_PATH, './public'),
                from: '*',
                to: resolve(PROJECT_PATH, './dist'),
                toType: 'dir',
            }]
        }),
        new WebpackBar({
            name: isDev ? '正在启动...' : '正在打包',
            color: '#fa8c16'
        }),
        // 缓存到node_modules/.cache/hard-source  提高二次编译速度

        // 该plugin在webpack5中被实现了。
        // new HardSourceWebpackPlugin({
        //     // Either an absolute path or relative to webpack's options.context.
        //     cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        //     // Either an absolute path or relative to webpack's options.context.
        //     // Sets webpack's recordsPath if not already set.
        //     recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
        //     // Either a string of object hash function given a webpack config.
        //     configHash: function(webpackConfig) {
        //         // node-object-hash on npm can be used to build this.
        //         return require('node-object-hash')({sort: false}).hash(webpackConfig);
        //     },
        //     // Either false, a string, an object, or a project hashing function.
        //     environmentHash: {
        //         root: process.cwd(),
        //         directories: [],
        //         files: ['package-lock.json', 'yarn.lock'],
        //     },
        // }),
    ],
    // 第一次打包 6.13s 
    // 第二次打包 1.13s
    cache: {
        type: 'filesystem',
        cacheDirectory: resolve(PROJECT_PATH, '.temp_cache')
        // buildDependencies: {
        //     // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
        //     config: [__filename],
        //     // 3. 如果你有其他的东西被构建依赖，你可以在这里添加它们
        //     // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
        // },
    }
}
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
const { ProvidePlugin } = require('webpack');

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
        // new HtmlWebpackPlugin({
        //     template: resolve(PROJECT_PATH, './public/header.html'),
        //     filename: 'header.html',
        //     chunks: ['header']
        // }),
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
        })
    ],
}
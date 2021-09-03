const path = require('path');
// 引入该Plugin  动态在html文件中引入js/css文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 在每次重新打包的时候，清除原始打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 将css样式从js文件中提取到单独的css文件中，通过外链的形式引入
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'development', // 开发模式
    entry: {// 入口文件
        main: path.resolve(__dirname, '../src/main.js'),
        header: path.resolve(__dirname, '../src/header.js')
    }, 
    output: {
        filename: '[name].[hash:8].js', // 打包后的文件名称
        path: path.resolve(__dirname, '../dist') // 打包后的目录
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../public/index.html'),
            filename: 'index.html',
            chunks: ['main'], // 为不同页面注入不同的chunk （chunk是打包生成的js文件）
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/header.html'),
            filename: 'header.html',
            chunks: ['header']
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader', 
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader', 
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                    }, 
                    'less-loader'
                ]
            }
        ]
    }
}
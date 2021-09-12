const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
module.exports = {
    mode: 'development',
    entry: {
        // shared: 'lodash',
        // index: {
        //     import: './src/index.js',
        //     dependOn: 'shared',
        // },
        // another: {
        //     import: './src/another-module.js',
        //     dependOn: 'shared'
        // } 
        index: './src/index.js',
        // another: './src/another-module.js'
        // print: './src/print.js'
        // hot: 'webpack/hot/dev-server.js',
        // client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
        // client: false
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        // cllTodo: output中开启clean:true 功能等价于clean-webpack-plugin? 是webpack5的特性吗
        clean: true, // 功能等价于clean-webpack-plugin? 是webpack5的特性吗
    },
    optimization: {
        // 提取引导模版代码
        runtimeChunk: 'single',
        moduleIds: 'deterministic',// 添加该配置用于解决每次在代码中引入新的模块/删除新的模块引入时，打包的vendors都会生成一个新的hash值，但是这个hash的重复生成是多余的
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'caching',
        }),
        // new webpack.HotModuleReplacementPlugin(),
    ]
}
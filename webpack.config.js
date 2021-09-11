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
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // cllTodo: output中开启clean:true 功能等价于clean-webpack-plugin? 是webpack5的特性吗
        clean: true, // 功能等价于clean-webpack-plugin? 是webpack5的特性吗
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    module: {
        rules: [
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development'
        }),
        // new webpack.HotModuleReplacementPlugin(),
    ]
}
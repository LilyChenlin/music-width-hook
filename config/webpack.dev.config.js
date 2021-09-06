/**
 * 开发环境
 */
const {resolve} = require('path');
const {merge} = require('webpack-merge');
const base = require('./webpack.config.js');
const {SERVER_HOST, SERVER_PORT, PROJECT_PATH} = require('../constants.js')

module.exports =  merge(base, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        // host:  SERVER_HOST,
        host: SERVER_HOST,
        port: SERVER_PORT,
        // stats: 'errors-only', // 终端仅打印 error
        // clientLogLevel: 'silent', // 日志等级
        // compress: true, // 是否启用 gzip 压缩
        open: true, // 打开默认浏览器
        hot: true, // 热更新
        webSocketServer: false
        
    }
})
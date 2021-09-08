/**
 * 生产环境
 */

const {merge} = require("webpack-merge");
const base = require('./webpack.config.js');


module.exports = merge(base, {
    mode: 'production',
    devtool: false,
    plugins: {
        // 通过externals减少打包体积
        externals: {
            react: 'react',
            'react-dom': 'ReactDOM',
        }
    }
})
// 公用变量


const path = require('path');

const PROJECT_PATH = path.resolve(__dirname);
const PROJECT_NAME = path.parse(PROJECT_PATH).name

// True 开发环境 false 生产环境
const isDev = process.env.NODE_ENV !== 'production';


const SERVER_HOST = '127.0.0.1'
const SERVER_POST = '9000'
module.exports = {
    // PROJECT_NAME, // 项目名
    PROJECT_PATH, // 根目录路径
    isDev, 
    SERVER_HOST,
    SERVER_POST
}
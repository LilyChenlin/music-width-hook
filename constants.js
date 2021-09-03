// 公用变量


const path = require('path');

const PROJECT_PATH = path.resolve(__dirname);
const PROJECT_NAME = path.parse(PROJECT_PATH).name

module.exports = {
    // PROJECT_NAME, // 项目名
    PROJECT_PATH, // 根目录路径
}
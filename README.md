Project结构
```
├─api                   // 网路请求代码、工具类函数和相关配置
├─application           // 项目核心功能
| ├─Home                // 主页
| ├─Recommend           // 推荐页
| | ├─store
| | | ├─actionCreator.js // 存放各种action的文件
| | | ├─constants.js     // 常量集合，存放不同action的type值
| | | ├─index.js         // 导出initialState和reducer函数
| | | ├─reducer.js       // 存放 initialState 和 reducer 函数
| ├─Rank                // 排行榜页
| ├─Singer              // 歌手页
├─assets                // 字体配置及全局样式
├─baseUI                // 基础 UI 轮子
├─components            // 可复用的 UI 组件
├─routes                // 路由配置文件
└─store                 //redux 相关文件
  App.js                // 根组件
  index.js              // 入口文件
  serviceWorker.js      // PWA 离线应用配置
  style.js              // 默认样式
```

1. 使用styled-components库
2. 初始项目搭建
    - 路由配置和应用部分
    - 公共组件的开发
    - redux的store的创建和引入
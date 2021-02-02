import React from 'react';
import {GlobalStyle} from './style';
import { IconStyle } from './assets/iconFont/iconfont';
import { renderRoutes } from 'react-router-config'; // renderRoutes 读取路由配置转化为Route标签
import routes from './routes/index.js';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      { renderRoutes (routes) }
    </HashRouter>
  );
}

export default App;

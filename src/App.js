import React from 'react';
import {GlobalStyle} from './style';
import { IconStyle } from './assets/iconFont/iconfont';
import { renderRoutes } from 'react-router-config'; // renderRoutes 读取路由配置转化为Route标签
import routes from './routes/index.tsx';
import { HashRouter } from 'react-router-dom';
import store from './store/index'
import { Provider } from 'react-redux';
import { Data } from './application/Singer/data'
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          { renderRoutes (routes) }
        </Data>
      </HashRouter>
    </Provider>

  );
}

export default App;

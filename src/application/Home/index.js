import React from 'react';
import { renderRoutes } from "react-router-config";
import { NavLink } from 'react-router-dom';// 利用 NavLink 组件进行路由跳转
import Player from '../Player';
import { 
    Top,
    Tab,
    TabItem
} from './style';
function Home (props) {
    console.log(props)
    const {route} = props;
    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe63e;</span>
                <span className="title">cloudApp</span>
                <span className="iconfont Search">&#xe63a;</span>
            </Top>
            <Tab>
                <NavLink to="/recommend" activeClassName="selected"><TabItem><span>推荐</span></TabItem></NavLink>
                <NavLink to="/singer" activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
                <NavLink to="/rank" activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
            </Tab>
            {/* 使用renderRoutes渲染处于第二层的功能组件 */}
            { renderRoutes (route.routes) }
            <Player></Player>
        </div>

    )
}

export default React.memo (Home);
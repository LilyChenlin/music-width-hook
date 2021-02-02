import React from 'react';
import { renderRoutes } from "react-router-config";
function Home (props) {
    console.log(props)
    const {route} = props;
    return (
        <div>
            <div>Home</div>

            {/* 使用renderRoutes渲染处于第二层的功能组件 */}
            { renderRoutes (route.routes) }
        </div>

    )
}

export default React.memo (Home);
import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home'; // 公共组件
import Recommend from '../application/Recommend'; // 推荐组件
import Singer from '../application/Singer';
import Rank from '../application/Rank';

let routes = [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => {
                    <Redirect to={'/recommend'}/>
                }
            },
            {
                path: '/recommend',
                component: Recommend
            },
            {
                path: '/singer',
                component: Singer
            },
            {
                path: '/Rank',
                component: Rank
            }
        ]
    }
]

export default routes;
import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home'; // 公共组件
import Recommend from '../application/Recommend'; // 推荐组件
import Singer from '../application/Singer';
import Rank from '../application/Rank';
import Album from '../application/Album';
import SingerDetail from '../application/SingerDetail/index'
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
                component: Recommend,
                routes: [
                    {
                        path: '/recommend/:id',
                        component: Album
                    }
                ]
            },
            {
                path: '/singer',
                component: Singer,
                key: "singer",
                routes: [
                    {
                        path: '/singer/:id',
                        component: SingerDetail
                    }
                ]
            },
            {
                path: '/Rank',
                component: Rank,
                key: "rank",
                routes: [
                    {
                        path: "/rank/:id",
                        component: Album
                    }
                ]
            }
        ]
    }
]

export default routes;
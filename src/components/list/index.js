import React from 'react';
import Lazyload from 'react-lazyload';

import {
    ListWrapper,
    ListItem,
    List
} from './style'
import {getCount} from '../../api/util'
const RecommendList = ({recommendList}) => {
    return(
        <ListWrapper>
            <h1 className="title">推荐歌单</h1>
            <List>
                {
                    recommendList.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                <div className="img_wrapper">
                                    <div className="decorate"></div>
                                    {/* 在img外面加一层Lazyload图片懒加载 */}
                                    <Lazyload placeholder={<img width="100%" height="100%" src={require('./music.png')}/>}>
                                        <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                                    </Lazyload>
                                    {/* 加此参数可以减小请求的图片资源大小 */}
                                    <div className="play_count">
                                        <i className="iconfont play">&#xe63a;</i>
                                        <span className="count">{getCount(item.playCount)}</span>
                                    </div>
                                </div>
                                <div className="desc">{item.name}</div>
                            </ListItem>
                        )
                    })
                }
            </List>

        </ListWrapper>
    )
}

export default RecommendList;
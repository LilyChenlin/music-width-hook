import React from 'react';
import LazyLoad from 'react-lazyload';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
    ListWrapper,
    ListItem,
    List
} from './style'
import { getCount } from '../../api/util';
import { IRecommendList } from '../../application/Recommend/store/reducer';

interface RecommendListProps extends RouteComponentProps {
    history: any;
    recommendList: IRecommendList;
}
const RecommendList: React.FC<RecommendListProps> = ({ history, recommendList }) => {
    console.log("recommendList", recommendList);
    const enterDetail = (id: string) => {
        history.push (`/recommend/${id}`)
    }
    return(
        <ListWrapper>
            <h1 className="title">推荐歌单</h1>
            <List>
                {
                    recommendList.map((item, index) => {
                        return (
                            <ListItem key={index} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <div className="decorate"></div>
                                    {/* 在img外面加一层Lazyload图片懒加载 */}
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                                        <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                                    </LazyLoad>
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

export default React.memo(withRouter(RecommendList));
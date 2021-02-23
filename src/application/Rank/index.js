import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { filterIndex } from '../../api/util';
import { List, ListItem, Container, SongList } from './style';
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';
import * as actionTypes from './store/index';
import { renderRoutes } from 'react-router-config';
import { EnterLoading } from './../Singer/style';
function Rank (props) {
    const {rankList: list, loading} = props;
    const {getRankListDataDispatch} = props;

    let rankList = list ? list.toJS() : [];
    debugger
    // 传入空数组作为依赖项，仅在组件挂载执行，仅执行一次
    useEffect(() => {
        if (!rankList.size) {
            getRankListDataDispatch()
        }
    }, [])

    let globalStartIndex = filterIndex(rankList); // 获取第一个tracks没有数据的索尼
    // 分为官方版和全球版
    let officialList = rankList.slice(0, globalStartIndex);
    let globalList = rankList.slice(globalStartIndex);
    const enterDetail = () => {}
    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map(item => {
                        return(
                            <ListItem key={item.coverImgId} track={item.tracks} onClick={() => enterDetail (item.name)}>
                                <div className="img_wrapper">
                                    <img src={item.coverImgUrl} alt=""/>
                                    <div className="decorate"></div>
                                    <span className="update_frequecy">{item.updateFrequency}</span>
                                </div>
                                {renderSongList(item.tracks)}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index+1}. {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null
    }

    // 榜单数据未加载出来之前都给隐藏
    let displayStyle = loading ? {"display":"none"}:  {"display": ""};
    return(
        <Container>
            <Scroll>
                <div>
                    <h1 className="official" style={displayStyle}>官方版</h1>
                    {renderRankList(officialList)}
                    <h1 className="global" style={displayStyle}>国际版</h1>
                    {renderRankList(globalList, true)}
                    { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
                </div>
            </Scroll>
            {renderRoutes (props.route.routes)}
        </Container>
    )
} 
const mapStateToProps = (state) => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getRankListDataDispatch() {
            dispatch(actionTypes.getRankList());
        }
    }
}
// 映射redux全局的state到组件到props上
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
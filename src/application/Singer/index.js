import React, { useContext, useEffect, useState } from 'react';
import Horizen from '../../baseUI/horizen-item/index';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Scroll from '../../baseUI/scroll/index';
import {connect} from 'react-redux';
// 懒加载图片
import LazyLoad, {forceCheck} from 'react-lazyload';
import {
    changePageCount,
    changeEnterLoading,
    changePullDownLoading,
    changePullUpLoading,
    getHotSingerList,
    refreshMoreHotSingerList,
    getSingerList, // 加载对应类别的歌手
    refreshMoreSingerList, // 加载对应类别更多歌手
} from './store/actionCreator';
import Loading from '../../baseUI/loading';
import {CategoryDataContext, CHANGE_CATEGORY, CHANGE_ALPHA } from './data';
function Singer(props) {

    let {getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch} = props;
    let { singerList, pageCount, enterLoading, pullUpLoading, pullDownLoading} = props;
    // let [category, setCategory] = useState('');
    // 首字母
    // let [alpha, setAlpha] = useState('');
    const {data, dispatch} = useContext(CategoryDataContext);
    const {alpha, category} = data.toJS();

    let handleUpdateCategory = (val) => {
        dispatch({type: CHANGE_CATEGORY, data: val})
        // setCategory(val);
        updateDispatch(val, alpha)
    }

    let handleUpdateAlpha = (val) => {
        dispatch({type: CHANGE_ALPHA, data: val})
        // setAlpha(val);
        updateDispatch(category, val)
    }


    // const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => {
    //     return {
    //         picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    //         name: '隔壁老樊',
    //         accountId: 277313426,
    //     }
    // })
    useEffect(() => {
        if(!singerList.size) {
            getHotSingerDispatch();
        }
    }, [])
    // 渲染函数， 返回歌手列表
    const renderSingerList = () => {
        const list = singerList ? singerList.toJS() : [];
        return (
            <List>
                {
                    list.map((item, index) => {
                        return(
                            <ListItem key={item.accountId + '' + index}>
                                <div className="img_wrapper">
                                    {/* <LazyLoad
                                        placeholder={<img width="100%" height="100%" src={require ('./singer.png')} 
                                     alt="music"/>}> */}
                                    
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                                    {/* // </LazyLoad> */}
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount);
    }
    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha);
    }
    return(
        <div>
            <NavContainer>
                <Horizen 
                    list={categoryTypes} 
                    title={"分类 (默认热门):"}
                    handleClick={(val) => handleUpdateCategory(val)}
                    oldValue={category}
                ></Horizen>
                <Horizen 
                    list={alphaTypes} 
                    title={"首字母:"}
                    handleClick={handleUpdateAlpha}
                    oldValue={alpha}
                ></Horizen>
            </NavContainer>
            <ListContainer>
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                >
                    {
                        renderSingerList()
                    }
                </Scroll>
                <Loading show={enterLoading}></Loading>
            </ListContainer>
        </div>

    )
}
const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    pageCount: state.getIn(['singers', 'pageCount']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        // 获取热门歌手
        getHotSingerDispatch() {
            dispatch(getHotSingerList())
        },

        // 根据类别获取热门歌手 
        updateDispatch(category, alpha) {
            // 改变分类，pageCount清零
            dispatch(changePageCount(0))
            dispatch(changeEnterLoading(true))
            // 请求对应类别的歌手列表
            dispatch(getSingerList(category, alpha))
        },

        //// 滑到最底部刷新部分的处理 
        // 需要区分是加载热门歌手还是加载对应类别的歌手
        pullUpRefreshDispatch(category, alpha, hot, pageCount) {
            // 加载loading
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(pageCount + 1));
            if (hot) {
                // 如果是加载热门歌手
                dispatch(refreshMoreHotSingerList());
            } else {
                dispatch(refreshMoreSingerList(category, alpha))
            }
        },

        // 顶部 下拉更新 也需要区别是更新热门歌手还是相应类别歌手
        pullDownRefreshDispatch(category, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0)); // 重新获取数据 页码归0
            if (category == '' && alpha == '') { // 不是根据类别获取歌手列表
                dispatch(getHotSingerList())
            } else {
                dispatch(getSingerList(category, alpha))
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))
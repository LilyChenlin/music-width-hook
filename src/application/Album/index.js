import React, { useState, useCallback, useRef, useEffect } from 'react';
import {CSSTransition} from 'react-transition-group';
import Header from './../../baseUI/header/index';
import Scroll from '../../baseUI/scroll/index';
import {Container, TopDesc, Menu, SongList, SongItem} from './style';
import { getName, getCount, isEmptyObject } from './../../api/util';
import { connect } from "react-redux";
import style from "../../assets/global-style";
import { getAlbumList, changeEnterLoading} from './store/actionCreator';
import Loading from '../../baseUI/loading/index';

function Album (props) {

    const {currentAlbum: currentAlbumImmutable, enterLoading} = props;
    const { getAlbumDataDispatch } = props;

    const [showStatus, setShowStatus] = useState(true);
    const [title, setTitle] = useState("歌单");
    const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯

    const headerEl = useRef(); // 通过useRef创建一个ref

    const HEADER_HEIGHT = 45;
    const id = props.match.params.id;

    // 由于handleBack函数和handleScroll函数在父组件每次执行时会生成不一样的handleBack和handleScroll
    // 造成memo会认为其结果不一样，所以会重新渲染。
    // 因此使用useCallBack，节约浏览器渲染性能
    const handleBack = useCallback(() => {
        setShowStatus(false)
    }, [])


    const handleScroll = useCallback((pos) => { 
        let minScrollY = -HEADER_HEIGHT;
        let percent = Math.abs(pos.y / minScrollY);
        let headerDom = headerEl.current;
        
        // 滑过顶部的高度开始变化
        if(pos.y < minScrollY) {
            headerDom.style.backgroundColor = style["theme-color"];
            headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
            setTitle(currentAlbum.name);
            setIsMarquee(true);
        } else {
            headerDom.style.background = '';
            headerDom.style.opacity = 1;
            setTitle("歌单");
            setIsMarquee(false);
        }
    }, [currentAlbum])

    useEffect(() => {
        getAlbumDataDispatch(id);
    }, [getAlbumDataDispatch, id])
    
    let currentAlbum = currentAlbumImmutable.toJS();


    return(
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
                <Header title={'返回'} handleClick={handleBack} title={title} ref={headerEl} isMarquee={isMarquee}></Header>
                {
                    !isEmptyObject(currentAlbum) ? (
                    <Scroll bounceTop={false} onScroll = {handleScroll}>
                    <div>
                        <TopDesc background={currentAlbum.coverImgUrl}>
                        <div className="background">
                            <div className="filter"></div>
                        </div>
                        <div className="img_wrapper">
                            <div className="decorate"></div>
                            <img src={currentAlbum.coverImgUrl} alt=""/>
                            <div className="play_count">
                            <i className="iconfont play">&#xe885;</i>
                            <span className="count">{Math.floor (currentAlbum.subscribedCount/1000)/10} 万 </span>
                            </div>
                        </div>
                        <div className="desc_wrapper">
                            <div className="title">{currentAlbum.name}</div>
                            <div className="person">
                            <div className="avatar">
                                <img src={currentAlbum.creator.avatarUrl} alt=""/>
                            </div>
                            <div className="name">{currentAlbum.creator.nickname}</div>
                            </div>
                        </div>
                        </TopDesc>
                        <Menu>
                        <div>
                            <i className="iconfont">&#xe6ad;</i>
                            评论
                        </div>
                        <div>
                            <i className="iconfont">&#xe86f;</i>
                            点赞
                        </div>
                        <div>
                            <i className="iconfont">&#xe62d;</i>
                            收藏
                        </div>
                        <div>
                            <i className="iconfont">&#xe606;</i>
                            更多
                        </div>
                        </Menu>
                        <SongList>
                            <div className="first_line">
                                <div className="play_all">
                                <i className="iconfont">&#xe6e3;</i>
                                <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
                                </div>
                                <div className="add_list">
                                <i className="iconfont">&#xe62d;</i>
                                <span > 收藏 ({getCount (currentAlbum.subscribedCount)})</span>
                                </div>
                            </div>
                            <SongItem>
                                {
                                currentAlbum.tracks.map ((item, index) => {
                                    return (
                                    <li key={index}>
                                        <span className="index">{index + 1}</span>
                                        <div className="info">
                                        <span>{item.name}</span>
                                        <span>
                                            { getName (item.ar) } - { item.al.name }
                                        </span>
                                        </div>
                                    </li>
                                    )
                                })
                                }
                            </SongItem>
                            </SongList>
                    </div>  
                </Scroll>
                ) : null
            }
            { enterLoading ? <Loading></Loading> : null}
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = (state) => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    loading: state.getIn(['album', 'loading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumDataDispatch(id) {
            dispatch(changeEnterLoading(true));
            dispatch(getAlbumList(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
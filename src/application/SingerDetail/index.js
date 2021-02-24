import React, {useCallback, useEffect, useRef, useState} from 'react';
import { CSSTransition } from "react-transition-group";
import { Container } from './style';
import {ImgWrapper, CollectButton, SongListWrapper, BgLayer} from './style';
import Header from '../../baseUI/header/index';
import Scroll from '../../baseUI/scroll/index';
import SongList from '../SongsList';
import { HEADER_HEIGHT } from '../../api/config';
import { connect } from 'react-redux';
import { getSingerInfo, changeEnterLoading} from './store/actionCreator';
import Loading from "./../../baseUI/loading/index";
function SingerList (props) {
    
    const {
        artist: immutableArtist,
        songs: immutableSongs, 
        loading,
    } = props;
    
    const {getSingerDataDispatch} = props;

    const artist = immutableArtist && immutableArtist.toJS();
    const songs = immutableSongs && immutableSongs.toJS();

    const [showStatus, setShowStatus] = useState(true);

    const collectButton = useRef();
    const imageWrapper = useRef();
    const songScrollWrapper = useRef();
    const songScroll = useRef();
    const header = useRef();
    const layer = useRef();

    // 图片初始高度
    const initialHeight = useRef(0);

    // 往上偏移的尺寸，露出圆角
    const OFFSET = 5;

    useEffect(() => {
        let h = imageWrapper.current && imageWrapper.current.offsetHeight;
        if (songScrollWrapper && initialHeight.current && layer.current && songScroll.current) {
            songScrollWrapper.current.style.top = `${h - OFFSET}px`;
            initialHeight.current = h;
            layer.current.style.top = `${h - OFFSET} px`;
            songScroll.current && songScroll.current.refresh ();
        }

    }, [])


    useEffect(() => {
        const id =  props.match.params.id;
        getSingerDataDispatch(id);
    })

    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false)
    }, [])


    // handleScroll作为传给子组件的方法，加一层useCallback减少不必要的渲染
    const handleScroll = useCallback((pos) => {
        let height = initialHeight.current;
        const newY = pos.y;
        const imageDOM = imageWrapper.current;
        const buttonDOM = collectButton.current;
        const headerDOM = header.current;
        const layerDOM = layer.current;
        const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;  


        // 滑动距离占图片高度的百分比
        const percent = Math.abs (newY /height);
        if (newY > 0) {
            imageDOM.style["transform"] = `scale(${1 + percent})`;
            buttonDOM.style["transform"] = `translate3d (0, ${newY}px, 0)`;
            layerDOM.style.top = `${height - OFFSET + newY}px`;
        } else if (newY >= minScrollY) {
            layerDOM.style.top = `${height - OFFSET - Math.abs (newY)}px`;
            // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
            layerDOM.style.zIndex = 1;
            imageDOM.style.paddingTop = "75%";
            imageDOM.style.height = 0;
            imageDOM.style.zIndex = -1;
            // 按钮跟着移动且渐渐变透明
            buttonDOM.style ["transform"] = `translate3d (0, ${newY}px, 0)`;
            buttonDOM.style ["opacity"] = `${1 - percent * 2}`;
        } else if (newY < minScrollY) {
            // 往上滑动，但是超过 Header 部分
            layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
            layerDOM.style.zIndex = 1;
            // 防止溢出的歌单内容遮住 Header
            headerDOM.style.zIndex = 100;
            // 此时图片高度与 Header 一致
            imageDOM.style.height = `${HEADER_HEIGHT}px`;
            imageDOM.style.paddingTop = 0;
            imageDOM.style.zIndex = 99;
        }
    }, []);

    return(
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack ()}
        >
            <Container>
                <Header 
                    title={artist.name}
                    handleClick={setShowStatusFalse}
                    ref={header}
                ></Header>
                <ImgWrapper 
                    bgUrl={artist.picUrl}
                    ref={imageWrapper}
                >
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButton}>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text"> 收藏 </span>
                </CollectButton>
                <BgLayer ref={layer}></BgLayer>
                <SongListWrapper ref={songScrollWrapper}>
                    <Scroll ref={songScroll} onScroll={handleScroll}>
                        <SongList
                            songs={artist.hotSongs}
                            showCollect={false}
                        >
                        </SongList>
                    </Scroll>
                </SongListWrapper>
                { loading ? (<Loading></Loading>) : null}
            </Container>
            
        </CSSTransition>
    )
}

const mapStateToProps = (state) => ({
    artist: state.getIn(['singerInfo', 'artist']),
    songsOfArtist: state.getIn(['singerInfo', 'songsOfArtist']),
    enterLoading: state.getIn(['singerInfo', 'enterLoading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getSingerDataDispatch(id) {
            dispatch(changeEnterLoading(true))
            dispatch(getSingerInfo(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SingerList));
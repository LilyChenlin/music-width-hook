import React, {useRef, useState, useEffect} from 'react';
import { connect} from 'react-redux';

import {
    changeCurrentIndex,
    changeFullScreen,
    changeCurrentSong,
    changePlayingState,
    changeSequencePlayList,
    changePlayList,
    changePlayMode,
    changeShowPlayList,
} from './store/actionCreator';

const player = (props) => {
    return(
        <div>player</div>
    )
}

const mapStateToProps = (state) => ({
    fullScreen: state.getIn(['player', 'fullScreen']),
    playing: state.getIn(['player', 'playing']),
    currentSong: state.getIn (["player", "currentSong"]),
    showPlayList: state.getIn (["player", "showPlayList"]),
    mode: state.getIn (["player", "mode"]),
    currentIndex: state.getIn (["player", "currentIndex"]),
    playList: state.getIn (["player", "playList"]),
    sequencePlayList: state.getIn (["player", "sequencePlayList"])
})
const mapDispatchToProps = (dispatch) => {
    return {
        toggleFullScreenDispatch (data) {
            dispatch(changeFullScreen(data))
        },
        togglePlayingDispatch (data) {
            dispatch(changePlayingState(data))
        },
        togglePlayListDispatch (data) {
            dispatch (changeShowPlayList (data));
        },
        changeCurrentIndexDispatch (index) {
            dispatch (changeCurrentIndex (index));
        },
        changeCurrentDispatch (data) {
            dispatch (changeCurrentSong (data));
        },
        changeModeDispatch (data) {
            dispatch (changePlayMode (data));
        },
        changePlayListDispatch (data) {
            dispatch (changePlayList (data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(player))
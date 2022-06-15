import * as actionTypes from './constants';
// import {fromJS} from 'immutable'; // 将js对象转化为immutable对象
import {getBannerRequest, getRecommendRequest} from '../../../api/request';

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data
})

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})
export const getBannerList = () => {debugger
    return (dispatch) => {
        getBannerRequest().then(data => {
            const action = changeBannerList(data.data.banners);
            dispatch(action);
        }).catch(() => {
            console.log("轮播图数据错误")
        })
    }
}

export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendRequest().then(data => {
            dispatch(changeRecommendList(data.data.result));
            dispatch(changeEnterLoading(false));
        }).catch(() => {
            console.log("推荐歌单数据传输错误")
        })
    }
}
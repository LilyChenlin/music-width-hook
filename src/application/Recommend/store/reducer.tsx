import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { AnyAction } from 'redux';
const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true
})

interface IRecommendListItem {
    id: string;
    picUrl: string;
    name: string;
    playCount: number;
}

interface IBannerListItem {
    imageUrl: string
}
export type IRecommendList = IRecommendListItem[];
export type IBannerList = IBannerListItem[];
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action: AnyAction) => {
    switch(action.type) {
        case actionTypes.CHANGE_BANNER: 
            return state.set('bannerList', action.data)
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data)
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data)
        default:
            return state;
    }
}
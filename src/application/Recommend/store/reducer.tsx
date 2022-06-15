import * as actionTypes from './constants';
// import { fromJS } from 'immutable';
import { produce } from 'immer';
import { AnyAction } from 'redux';
// const defaultState = fromJS({
//     bannerList: [],
//     recommendList: [],
//     enterLoading: true
// })

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

export interface IRecommendState {
    bannerList: IBannerList;
    recommendList: IRecommendList;
    enterLoading: boolean;
}

const defaultState: IRecommendState = {
    bannerList: [],
    recommendList: [],
    enterLoading: true
};
// eslint-disable-next-line import/no-anonymous-default-export
export const recommendReducer = produce((state, action: AnyAction) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            state.bannerList = action.data;
            break;
        case actionTypes.CHANGE_RECOMMEND_LIST:
            state.recommendList = action.data;
            break;
        case actionTypes.CHANGE_ENTER_LOADING:
            state.enterLoading = action.data;
            break;
    }
}, defaultState);
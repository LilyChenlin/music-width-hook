import { number } from 'prop-types';
import {axiosInstance} from './config';

// 获取轮播图数据   
export const getBannerRequest = <T=any>() => {
    return axiosInstance.get<T>('/banner')
}

// 获取推荐列表数据
export const getRecommendRequest = <T=any>() => {
    return axiosInstance.get<T>('/personalized')
}

export const getHostSingerListRequest = <T=any>(count: number) => {
    return axiosInstance.get<T>(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= <T=any>(category: string, alpha: string, count: number) => {
    return axiosInstance.get<T>(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

export const getRankListRequest = <T>() => {
    return axiosInstance.get<T>(`/toplist/detail`);
}

export const getAlbumDetailRequest = <T>(id: number) => {
    return axiosInstance.get<T>(`/playlist/detail?id=${id}`);
}

export const getSingerInfoRequest = <T>(id: number) => {
    return axiosInstance.get<T>(`/artists?id=${id}`);

}
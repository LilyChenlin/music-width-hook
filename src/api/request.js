import {axiosInstance} from './config';

// 获取轮播图数据   
export const getBannerRequest = () => {
    return axiosInstance.get('/banner')
}

// 获取推荐列表数据
export const getRecommendRequest = () => {
    return axiosInstance.get('/personalized')
}

export const getHostSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
    return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

export const getRankListRequest = () => {
    return axiosInstance.get(`/toplist/detail`);
}
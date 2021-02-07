import {axiosInstance} from './config';

// 获取轮播图数据   
export const getBannerRequest = () => {
    return axiosInstance.get('/banner')
}

// 获取推荐列表数据
export const getRecommendRequest = () => {
    return axiosInstance.get('/personalized')
}
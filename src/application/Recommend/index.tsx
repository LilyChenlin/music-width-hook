import React, {useEffect} from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import {Content} from './style';
import Scroll from '../../baseUI/scroll';
import { connect, useSelector, useDispatch} from 'react-redux';
import * as actionTypes from './store/actionCreator';
import { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading/index';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { IRootState } from '../../store/reducer';

const Recommend = (props: RouteConfigComponentProps) => {
    const { bannerList, recommendList, songsCount, enterLoading } = useSelector((state: IRootState) => ({
        bannerList: state.recommend.bannerList,
        recommendList: state.recommend.recommendList,
        songsCount: 0,
        enterLoading: state.recommend.enterLoading
    }));

    const dispatch = useDispatch();

    // const {
    //     // getBannerDataDispatch,
    //     // getRecommendListDataDispatch
    // } = props;

    const getBannerDataDispatch = () => {
        dispatch(actionTypes.getBannerList());
    }

    const getRecommendListDataDispatch = () => {
        dispatch(actionTypes.getRecommendList());
    }

    useEffect(() => {
        // 如果页面有数据，则不发送请求
        if (!bannerList.length) {
            getBannerDataDispatch();
        }
        if (!recommendList.length) {
            getRecommendListDataDispatch();
        }
    }, [])

    // const bannerListJS = bannerList ? bannerList.toJS() : [];
    // const recommendListJS = recommendList ? recommendList.toJS() : [];
    // // mock
    // const bannerList = [1, 2, 3, 4].map((item) => {
    //     return {
    //         imgUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"
    //     }
    // })

    // const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
    //     return {
    //         id: index,
    //         picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
    //         playCount: 17171122,
    //         name: "朴树、许巍、李健、郑钧、老狼、赵雷"
    //     }
    // })
    return(
        <Content play={songsCount}>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerList}></Slider>
                    <RecommendList recommendList={recommendList}></RecommendList>
                </div>
            </Scroll>
            { enterLoading ? <Loading></Loading> : null }
            { renderRoutes (props.route?.routes) }
        </Content>

    )
}

// 映射Redux全局的state到组件到props上
// const mapStateToProps = (state) => ({
//     bannerList: state.getIn(['recommend', 'bannerList']),
//     recommendList: state.getIn(['recommend', 'recommendList']),
//     enterLoading: state.getIn(['recommend', 'enterLoading'])
// })

// // 映射 dispatch 到 props 上
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getBannerDataDispatch () {
//             dispatch(actionTypes.getBannerList())
//         },
//         getRecommendListDataDispatch () {
//             dispatch(actionTypes.getRecommendList())
//         }
//     }
// }
// cllTodo:理解React.memo
export default React.memo(Recommend)
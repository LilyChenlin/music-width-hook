import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from "../application/Recommend/store/index";
// import { reducer as singerReducer } from "../application/Singer/store/index";
// import { reducer as rankReducer } from "../application/Rank/store/index";
// import { reducer as albumReducer} from "../application/Album/store/index"; 
// import { reducer as singerDetailReducer } from "../application/SingerDetail/store/index";
// import { reducer as playerReducer } from "../application"
export default combineReducers({
    recommend: recommendReducer.recommendReducer,
    // singers: singerReducer,
    // rank: rankReducer,
    // album: albumReducer,
    // singerInfo: singerDetailReducer,
    // player: playerReducer,
})

export interface IRootState {
    recommend: recommendReducer.IRecommendState,
}
import * as actionTypes from "../actions/ActionTypes";

const initialState = {
    navbar : true,
    videoPlayer :{
        vidoe : "",
        visible : false
    }
}

/*
    리듀서 함수를 정의합니다. 리듀서는 state와 action와을 파라미터로 받습니다.
    state가 undefined일 때(스토어가 생성될 때) state의 기본값을 initialState로 사용합니다
    action.type에 따라 다른 작업을 하고, 새 상태를 만들어서 반환합니다.
    이 때 주의할 점은 state를 직접 수정하면 안 되고,
    기존 상태 값에 원하는 값을 엎어쓴 새로운 객체를 만들어서 반환해야한다.
*/


export default function youtubePlayer(state = initialState, action){
    switch(action.type){
        case actionTypes.START_VIDEO_PLAYER:
            return{
                ...state,
                videoPlayer:{
                    ...state.videoPlayer,
                    video:action.video,
                    visible:true
                }
            };
        case actionTypes.STOP_VIDEO_PLAYER:
            return{
                ...state,
                videoPlayer:{
                    ...state.videoPlayer,
                    video:"",
                    visible:false
                }
            };
        default :
            return {...state};
    }
}
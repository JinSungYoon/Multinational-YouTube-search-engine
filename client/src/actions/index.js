import * as actionTypes from './ActionTypes';

/*
    action 객체를 만드는 액션 생성자들을 선언합니다.(action creators)
    여기서 () => ({}) 은, function() {return {}} 와 동일한 의미입니다.
    scope 이슈와 관계없이 편의상 사용되었습니다.
*/

export function startVideoPlayer(video,title) {
    return dispatch => {
        return dispatch({ type: actionTypes.START_VIDEO_PLAYER, video, title });
    };
}

export function stopVideoPlayer() {
    return dispatch => {
        return dispatch({ type: actionTypes.STOP_VIDEO_PLAYER });
    };
}
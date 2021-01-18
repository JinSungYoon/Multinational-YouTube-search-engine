import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import * as actionTypes from "../../actions";
import Draggable from 'react-draggable';
import {Resizable,ResizableBox} from "react-resizable";


import './YoutubePlayer.css';
// import "react-resizable/css/style.css";
import arrowsIcon from '../../image/colorArrows.png';
import closeIcon from '../../image/White_x_in_red_rounded_square.png';

const YoutubePlayer = () =>{
    
    const videoPlayer = useSelector(state=>state.youtubePlayer.videoPlayer,[]);
    const dispatch = useDispatch();

    if(!videoPlayer.visible){
        return null;
    }
    // 
    return(
        <Draggable handle=".handle">
        <div 
        className="custom-youtube-player" 
        style={{width:"700px",height:"500px",marginTop:"415px"}}
        >
            <div 
                className="close d-flex justify-content-center"
                onClick = {()=>{dispatch(actionTypes.stopVideoPlayer())}}
                // style={{backgroundImage:closeIcon}}
                >
                <img id="closeIcon" alt="closeIcon" src={closeIcon}/>
                <i className="fas fa-times"></i>
            </div>
            <div className="handle d-flex justify-content-center">
                <i className="fas fa-arrows-alt"></i>
                <img id="arrowsIcon" alt="arrowsIcon" src={arrowsIcon}/>
            </div>
            <Resizable width={'100%'} height={'100%'}>
                <iframe
                id="player"
                type="text/html"
                style={{width:"100%",height:"100%"}}
                title={videoPlayer.title}
                src={`http://www.youtube.com/embed/${videoPlayer.video}`}
                frameborder="0"
                allowFullScreen
                ></iframe>
            </Resizable>
        </div>
        </Draggable>
    )
}

export default YoutubePlayer;
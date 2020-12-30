import React, { useState,useEffect } from 'react';

import {Input,Card,Row,Col} from 'antd';
import axios from 'axios';

import './MainPage.css';
import 'antd/dist/antd.css';

const {Search} = Input;

const MainPage = ({match}) =>{

    const [Users,setUsers] = useState([])
    const [YoutubeList,setYoutubeList] = useState([])


    // NavBar에서 전달된 값이 업데이트 될때만 searchYoutube 실행.
    useEffect(()=>{

        if(match.params.keyword !== undefined){
            let data = {
                keyword : match.params.keyword,
                regionCode : navigator.language.substr(-2,2),
            }
            searchYoutube(data);
        }

    },[match.params.keyword])

    const getUsers = (body) =>{
        
        console.log(`Get User List`);

        axios.get('/api/users')
        .then(response=>{
            if(response.data.success){
                if(response.data.userInfo){
                    setUsers([...response.data.userInfo]);
                    console.log(response.data.userInfo);
                }
                else{
                    alert('사용자를 가져오는데 실패했습니다.');
                }
                
            }
        })
    }

    const getYoutubeList = (body) =>{
        
        axios.get('/api/youtube?keyword=youtube')
        .then(response=>{
            if(response.data.success){
                if(response.data.result.items){
                    setYoutubeList([...response.data.result.items]);
                    console.log(response.data.result.items);
                }
                else{
                    console.log(`데이터를 찾아오지 못했습니다.`);
                }
            }
        })
    }

    const searchYoutube = (data) =>{

        data.keyword = data.keyword === undefined ? data : data.keyword;

        console.log(`Input Keyword : ${data.keyword}`);

        axios.get(`/api/youtube`,{
            params:{
                keyword : data.keyword,
                regionCode : data.regionCode
            }
        }
        )
        .then(response=>{
            if(response.data.success){
                if(response.data.result.items){
                    setYoutubeList([...response.data.result.items]);
                    console.log(response.data.result.items);
                }
                else{
                    console.log(`데이터를 찾아오지 못했습니다.`);
                }
            }
        })
    }

    const renderCards = YoutubeList.map((List,index)=>{
        
        return (
        <Col lg={6} md={8} xs={24} key={index}>
            <Card>
                <img class="videoImg" src={List.snippet.thumbnails.medium.url}></img>
                <p><strong>Channel Title : </strong>{List.snippet.channelTitle}</p>
                <p><strong>Description :</strong> {List.snippet.description}</p>
            </Card>
        </Col>
        )

    })

    

    return(
        <div>
            <div>
                <Row>
                        {renderCards}
                </Row>
            </div>
        </div>
    );
}

export default MainPage;
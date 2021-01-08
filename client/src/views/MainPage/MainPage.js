import React, { useState,useEffect } from 'react';

import {Input,Card,Row,Col} from 'antd';
import axios from 'axios';

import WordCloud from 'react-d3-cloud';

import './MainPage.css';
import 'antd/dist/antd.css';

const {Search} = Input;

const MainPage = ({match}) =>{

    const [Users,setUsers] = useState([])
    const [YoutubeList,setYoutubeList] = useState([])
    const [WordCloudList,setWordCloudList] = useState([]);

    // NavBar에서 전달된 값이 업데이트 될때만 searchYoutube 실행.
    useEffect(()=>{

        if(match.params.keyword !== undefined){
            let data = {
                keyword : match.params.keyword,
                regionCode : navigator.language.substr(-2,2),
            }
            searchYoutube(data);
            searchWord(data);
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
                console.log(response);
                // if(response.result.data.items){
                //     setYoutubeList([...response.result.data.items]);
                //     console.log(response.result.data.items);
                // }
                // else{
                //     console.log(`데이터를 찾아오지 못했습니다.`);
                // }
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
                if(response.data.sendData.data.items){
                    setYoutubeList([...response.data.sendData.data.items]);
                    console.log(response.data.sendData.data.items);
                }
                else{
                    console.log(`데이터를 찾아오지 못했습니다.`);
                }
            }
        })
    }

    const transmitWord = (params) =>{
        
        let data = {
            keyword : JSON.stringify(params.text).replaceAll('"',''),
            regionCode : navigator.language.substr(-2,2),
        }
        searchWord(data);
        searchYoutube(data);
    }

    const searchWord = (data) =>{
        
          axios.get(`/api/trends`,{
              params:{
                  keyword :  data.keyword,
                  regionCode :  data.regionCode,
              }
          })
          .then(response=>{
              if(response.data.success){
                  if(response.data.sendData){
                    console.log(response.data.sendData);
                    setWordCloudList([...response.data.sendData]);
                  }
                  else{
                      console.log(`데이터를 찾아오지 못했습니다.`);
                  }
              }
          });
    }

    const renderCards = YoutubeList.map((List,index)=>{
        
        return (
        <Col lg={6} md={8} xs={24} key={index}>
            <Card>
                <img class="videoImg" src={List.snippet.thumbnails.medium.url}></img>
                <p><strong>Title : </strong>{List.snippet.title}</p>
                <p><strong>Channel Title : </strong>{List.snippet.channelTitle}</p>
                <p><strong>조회수 : </strong>{List.statistics.viewCount}</p>
                <p><strong>좋아요 : </strong>{List.statistics.likeCount}</p>
                <p><strong>댓글 : </strong>{List.statistics.commentCount}</p>
            </Card>
        </Col>
        )

    })

    const fontSizeMapper = word => Math.log2(word.value)*15;
    const rotate = word => word.value % 360;
      
    return(
        
        <div class="container">
            <div class="content">
                <Row>
                    {renderCards}
                </Row>
            </div>
            <div div class="sidebar">
                <WordCloud
                        data = {WordCloudList}
                        width  = "400"
                        height = "400"
                        padding = "3"
                        fontSizeMapper = {fontSizeMapper}
                        rotate = {rotate}
                        onWordClick = {transmitWord}
                />
            </div>
        </div>
        
    );
}

export default MainPage;
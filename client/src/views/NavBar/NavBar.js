
import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Input} from 'antd';
import './NavBar.css';
import { set } from 'mongoose';

const {Search} = Input;

function NavBar(props){

    let [keyword,setKeyword] =useState('');
    
    // let onSearch = (value) =>{
    //     console.log(`keyword:${keyword}`);
    // //    props.getKeyword(keyword);
    //     setKeyword('');
    // }

    let keywordChange = (e) =>{
        setKeyword(e.target.value);
    }

    let handleKeyPress = e =>{
        if(e.key === "Enter"){
            setKeyword(e.target.value);
        }
    }

    // let passKeyword = (e) => {
    //     console.log(`passKeyword : ${e.target.value}`);
    //     if(e.target.value==='' || e.target.value==='undefined'){
    //         alert('채널명을 다시 입력해 주세요.');
    //     }else{
    //         setKeyword(e.target.value);
    //     } 
    // };

    return(
        <nav className="menu" style={{position:'fixed',zIndex:5,width:'100%'}}>
            <div className="menu_logo">
                <a href="/">Vling</a>
            </div>
            <div className="search_space">
                
                    <input type="text" className = "antd-input-space" placeholder = "채널명을 검색 가능합니다" value = {keyword} onChange={keywordChange} onKeyPress={handleKeyPress}/>
                    <Link to={`/${keyword}`}>
                        <button>Search</button>
                    </Link>
                    {/* <Search 
                            className = "antd-input-space"
                            placeholder = "채널 또는 채널 설명을 검색 가능합니다."
                            allowClear
                            enterButton
                            onChange={keywordChange}/> */}
                
            </div>
        </nav>
    );
}

export default NavBar;
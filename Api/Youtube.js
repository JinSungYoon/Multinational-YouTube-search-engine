const express = require('express');

const route = express.Router();
var {google} = require('googleapis');

var Youtube = require('youtube-node');
var youtube = new Youtube();

var service = google.youtube('v3');

route.get('/',(req,res)=>{
    
    console.log(`request.query : ${JSON.stringify(req.query)}`);
    
    var keyword = req.query.keyword;
    var countryCode = req.query.regionCode;
    var videoList = [];

    console.log(`Keyword : ${keyword}, regionCode ${countryCode}`);
    
    service.search.list({
        key  : 'apiKey',
        part : 'snippet',
        order : 'relevance',
        type  : 'video',
        regionCode : countryCode,
        maxResults : 10,
        q    : keyword,
    }).then((response)=>{
        var {data} = response;
        data.items.forEach((item)=>{
            console.log(`Title : ${item.snippet.title}`);
            console.log(`VideoId : ${item.id.videoId}`);
            videoList.push(item.id.videoId);
            // if(videoList.length<5){
            //     videoList = item.id.videoId;
            // }else{
            //     videoList = videoList + `, ${item.id.videoId}`;
            // }
            console.log(`Channel Title : ${item.snippet.channelTitle}`);
            console.log(`Description : ${item.snippet.description}`);
        })
        
        console.log(`VideoList : ${videoList}`);

        service.videos.list({
            key  : 'AIzaSyDDC9sz_BiADBty7C41WqisUNkmfYgo65U',
            part : 'snippet, statistics, contentDetails',
            id : videoList,
            fields : 'items(id, snippet(title, channelTitle, description, thumbnails), statistics(viewCount, commentCount, likeCount), contentDetails(caption))'
        }).then((response)=>{
            var result = response;
            //console.log(result.data.items);
            // result.data.items.foreach((item)=>{
            //     console.log(`Title : ${item.snippet.title}`);
            //     console.log(`Channel Title : ${item.snippet.channelTitle}`);
            //     console.log(`Description : ${item.snippet.description}`);
            //     console.log(`View Count : ${item.statistics.viewCount}`);
            //     console.log(`Comment Count : ${item.statistics.commentCount}`);
            //     console.log(`Like Count : ${item.statistics.likeCount}`);
            // })

            return res.json({
                success : true,
                sendData : result
            })
        }).catch((err)=>{
            console.log(err);
            return res.json({status:400,success:false,err});
        })

        // return res.json({
        //     success:true,
        //     result : data
        // })
        
    }).catch((err)=>{
        console.log(err);
        return res.json({status:400,success:false,err});
    })

    // service.videos.list({
    //     part : 'snippet, statistics, contentDetails',
    //     fileds : 'items(id, snippet(title, description), statistics(viewCount, commentCount, likeCount), contentDetails(caption))'
    // })
   
});

module.exports = route;

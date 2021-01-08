const express = require('express');

const route = express.Router();

var {google} = require('googleapis');
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
            console.log(`Channel Title : ${item.snippet.channelTitle}`);
            console.log(`Description : ${item.snippet.description}`);
        })
        
        console.log(`VideoList : ${videoList}`);

        service.videos.list({
            key  : 'apiKey',
            part : 'snippet, statistics, contentDetails',
            id : videoList,
            fields : 'items(id, snippet(title, channelTitle, description, thumbnails), statistics(viewCount, commentCount, likeCount), contentDetails(caption))'
        }).then((response)=>{
            var result = response;

            return res.json({
                success : true,
                sendData : result
            })
        }).catch((err)=>{
            console.log(err);
            return res.json({status:400,success:false,err});
        })

    }).catch((err)=>{
        console.log(err);
        return res.json({status:400,success:false,err});
    })
   
});

module.exports = route;

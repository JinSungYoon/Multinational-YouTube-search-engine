const express = require('express');
const googleTrends = require('google-trends-api');
const route = express.Router();

// googleTrends.relatedTopics({keyword:'stock',startTime:new Date('2020-01-05'),endTime : new Date('2021-01-05'), geo:'KR'})
// .then((results)=>{
//     console.log('These result are awsome',results);
// })
// .catch(function(err){
//     console.error('Oh no there was an error',err);
// });


// dailyTrends
// Daily Search Trends highlights searches that jumped significantly in traffic among all searches over the past 24 hours and updates hourly. These search trends show the specific queries that were searched, and the absolute number of searches made. 20 daily trending search results are returned

// googleTrends.dailyTrends({
//     trendDate : new Date('2021-01-06'),
//     geo: 'US',
// },(err,results)=>{
//     if(err){
//         console.log(`This is the result \nerr`);
//     }else{
//         console.log(`This is the result \n${results}`);
//     }
// })

route.get('/',(req,res)=>{
    
    console.log(req.query);

    const topic = req.query.keyword;
    const region = req.query.regionCode;
    let cloudBox = [];

    googleTrends.relatedTopics({keyword:topic,startTime:new Date('2020-01-01'), endTime:new Date('2021-01-06'),hl:region})
    .then((response)=>{
        let obj = JSON.parse(response);
        
        for(let loop=0;loop<obj.default.rankedList[0].rankedKeyword.length;loop++){
            cloudBox.push({text : obj.default.rankedList[0].rankedKeyword[loop].topic.title, type : obj.default.rankedList[0].rankedKeyword[loop].topic.type, value : obj.default.rankedList[0].rankedKeyword[loop].value });
            // console.log(`{text : ${obj.default.rankedList[0].rankedKeyword[loop].topic.title}\ttype : ${obj.default.rankedList[0].rankedKeyword[loop].topic.type}\tvalue : ${obj.default.rankedList[0].rankedKeyword[loop].value}}`);
        }

        return res.json({
            success : true,
            sendData : cloudBox
        })

    })
    .catch((err)=>{
        console.log(`This is the error\n${err}`);
    })
    
});


module.exports = route;
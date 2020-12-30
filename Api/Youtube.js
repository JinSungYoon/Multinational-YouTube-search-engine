const express = require('express');

const route = express.Router();
var {google} = require('googleapis');

var service = google.youtube('v3');

route.get('/',(req,res)=>{
    
    console.log(`request.query : ${JSON.stringify(req.query)}`);
    
    var keyword = req.query.keyword;
    var countryCode = req.query.regionCode;
    
    console.log(`Keyword : ${keyword}, regionCode ${countryCode}`);
    
    service.search.list({
        key  : 'AIzaSyDDC9sz_BiADBty7C41WqisUNkmfYgo65U',
        part : 'snippet',
        order : 'rating',
        regionCode : countryCode,
        maxResults : 10,
        q    : keyword,
    }).then((response)=>{
        var {data} = response;
        data.items.forEach((item)=>{
        })
        
        return res.json({
            success:true,
            result : data
        })
        
    }).catch((err)=>{
        return res.json({status:400,success:false,err});
    })
   
});

module.exports = route;
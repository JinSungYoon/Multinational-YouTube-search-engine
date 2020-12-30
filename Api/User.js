const express = require('express');
const mongoose = require('mongoose');
const {User} = require('../server/models/Users');
const route = express.Router();

route.post('/',async(req,res)=>{
    const{firstName,lastName,category} = req.body;
    let user = {};

    user.firstName = firstName;
    user.lastName = lastName;
    user.category = category;
    let userModel = new User(user);

    console.log(`First Name : ${firstName} Last Name : ${lastName} Category : ${category}`);

    await userModel.save();
    res.json(userModel);

})

route.get('/',async(req,res)=>{
    
    User.find()
    .populate("writer")
    .exec((err,userInfo)=>{
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).json({
            success:true,userInfo
        })
    })
})

module.exports = route;
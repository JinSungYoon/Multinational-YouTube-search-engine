const express = require('express');
const app = express();
// frontend(4000) 서버와 backend(8000) 서버의 port가 다를때 크로스 해주는 library
const cors = require('cors');
const config = require('./config/key')

// Mongoose Atlas 연결 Youtube 참고 :  https://www.youtube.com/watch?v=Qn0SOL8vK8w
const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(()=>console.log('db connected....'))
    .catch(err => console.log(err));
    
}

connectDB();


// 허락한 요청에만 cross 해주기 위해서.
const corsOptions = {
    origin : 'http://localhost:4000',   // 허락하고자 하는 요청 주소
    credentials:true,                   // true로 설정하면 설정한 내용을 response 헤더에 추가.
}

app.use(cors(corsOptions));
app.use(express.json({extended:false}));

app.use('/api/users',require('../Api/User'));
app.use('/api/youtube',require('../Api/Youtube'));

//routes.initialize(app);

const Port = process.env.Port || 8000;

app.listen(Port,()=>console.log(`Server Listening on ${Port}`));
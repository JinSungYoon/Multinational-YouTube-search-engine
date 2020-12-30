const mongoose = require('mongoose');

const URI = "mongodb+srv://yjs9495:qwer1234@clonevling.23uzb.mongodb.net/dataLake?retryWrites=true&w=majority"

const connectDB = async() =>{
    await mongoose.connect(URI, {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
      });
    console.log('db connected....');
}

module.exports = connectDB;
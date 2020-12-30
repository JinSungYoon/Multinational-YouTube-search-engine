const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        maxlength:20
    },
    lastName : {
        type:String,
        maxlength:20
    },
    category : {
        type:String,
        maxlength:20
    }
});

const User = mongoose.model('User',userSchema);

module.exports = {User}
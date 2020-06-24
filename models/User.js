const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true, //공백제거
        unique:1 //unique함(중복x)
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role: {
        type:Number,
        default: 0
    },
    image:String,
    token:{
        type:String //유효성관리
    },
    tokenExp:{
        type:Number //유효기간관리
    }
})

const User = mongoose.model('User',userSchema); //1st모델의이름,2nd데이터

module.exports = {User};//다른파일에서사용가능
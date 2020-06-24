const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const {User} = require("./models/User.js");

const config = require("./config/key.js");
app.use(bodyParser.urlencoded({extended:true})); //일반적인post방식을분석
app.use(bodyParser.json()); //json타입으로된것을분석

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('MongoDB connected...')) //연결확인
  .catch( err => console.log(err)); //에러표시

app.get('/',(req,res) => {
    res.send("hello world 반갑습니다.");
});
app.post('/register',(req,res) =>{
    //회원가입할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body);

    user.save((err,userInfo) => { //user모델에 저장
        if(err) return res.json({success:false,err})
        return res.status(200).json({ //status(200)은 성공했다는의미
            success:true
        });
    }); 
})
app.listen(port,() => {
    console.log('서버가 가동중입니다.',port);
});
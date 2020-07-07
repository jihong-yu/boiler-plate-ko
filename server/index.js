const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const auth = require("./middleware/auth.js");
const User = require("./models/User.js");
const cookieParser = require('cookie-parser');

const config = require("./config/key.js");
app.use(bodyParser.urlencoded({extended:true})); //일반적인post방식을분석
app.use(bodyParser.json()); //json타입으로된것을분석
app.use(cookieParser());

const mongoose = require("mongoose");
const { request } = require("express");
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('MongoDB connected...')) //연결확인
  .catch( err => console.log(err)); //에러표시

app.get('/',(req,res) => {
    res.send("hello world 반갑습니다.");
});
app.post('/api/users/register',(req,res) =>{
    //회원가입할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body);

    user.save((err,userInfo) => { //user모델에 저장
        if(err) return res.json({success:false,err})
        return res.status(200).json({ //status(200)은 성공했다는의미
            success:true
        });
    }); 
});
app.post('/api/users/login',(req,res) => {
    //요청된 이메일을 데이터베이스에서 찾는다.
    User.findOne({"email":req.body.email},(err,user) => { //몽고db에서 제공하는메소드
        if(!user){
            return res.json({
                loginSucess: false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            });
        }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password,(err,isMatch) => {
        if(!isMatch) 
        return res.json({loginSucess:false,message:"비밀번호가 틀렸습니다."});
        //비밀번호까지 동일하다면 토큰을 생성하기.
        user.generateToken((err,user) => {
            if(err) return res.status(400).send(err);//400이면에러가있으면 err를전달해라는의미
        //토큰을 저장한다. 어디에 ? 쿠키 or 로컬스토리지
        res.cookie('x_auth',user.token,{maxAge:60*60*24})
        .status(200)
        .json({loginSuccess:true,userId:user._id})
        })
    })
  })
});

app.get('/api/users/auth',auth,(req,res) => {
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True라는말
    res.status(200).json({
        _id:req.user._id,
        isAdmin:req.user.role === 0 ? false:true, //0이면 일반유저,0이아니면 관리자
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    });
});

app.get('/api/users/logout',auth,(req,res) => {
    User.findOneAndUpdate({'_id':req.user._id},{'token':""},(err,user) => {
        //1st:찾고자하는 데이터 2nd:변경할 데이터(토큰을지워줌) , 3th:데이터반환
        if(err) return res.json({success:false,err});
        return res.status(200).send({
            success:true
        })
    })
});

app.get('/api/hello',(req,res) => {
    res.send("안녕하세요~~");
});
app.listen(port,() => {
    console.log('서버가 가동중입니다.',port);
});
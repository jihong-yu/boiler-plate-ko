const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://jimdac123:abcd123@cluster0.hw6v8.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('MongoDB connected...')) //연결확인
  .catch( err => console.log(err)); //에러표시

app.get('/',(req,res) => {
    res.send("hello world");
});

app.listen(port,() => {
    console.log('서버가 가동중입니다. 안녕하세요',port);
});
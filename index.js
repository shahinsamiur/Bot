const express = require("express");
const app = express();
const router = require("./router.js");
const strategy = require("./strategy.js");
const mongoose = require("mongoose");
const DotEnv = require("dotenv").config();
const DB_Pass = process.env.DB_Pass;
const DB_UserName = process.env.DB_UserName;
const Port = process.env.Port || 404;
const fs = require("fs");
const cors = require("cors");
const dd=require("./Bot/PDB/signal.json")

// console.log(`mongodb+srv://${DB_UserName}:${DB_Pass}@cluster0.4d1qqmy.mongodb.net/?retryWrites=true&w=majority`)
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(
//     `mongodb+srv://${DB_UserName}:${DB_Pass}@cluster0.4d1qqmy.mongodb.net/?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     console.log("DB connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(router);
app.use(express.json());
const corsOptions = { 
  // origin:'https://abc.onrender.com',
  AccessControlAllowOrigin: '*',  
  origin: '*',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
}
app.use(cors())

setInterval(()=>{
    var date =new Date()
    var time =date.getMinutes()
    var getSec=date.getSeconds()
var minute=[0,15,30,45]

// console.log(getSec)
// if(getSec==5){
 console.log(time)
    strategy()
    // strategy(3)
// }

//&&minute.includes(time-1)

// if(getSec==30){
//   const clearSignal=JSON.stringify([])
//   fs.writeFileSync("./Bot/PDB/signal.json", clearSignal);


// }



},10000)

app.listen(Port, () => {
  console.log("our server is runing ",Port);
});








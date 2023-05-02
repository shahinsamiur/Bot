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
const remove_signal=require("./remve_signal.js")


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

// setInterval(()=>{
    var date =new Date()
    var time =date.getMinutes()
    var getSec=date.getSeconds()
var minute=[0,15,30,45]

if(minute.includes(time+5)&&getSec==5){
  fs.writeFileSync("./Bot/PDB/signal.json", []);
}

    strategy()


app.listen(Port, () => {
  console.log("our server is runing ",Port);
});








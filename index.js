const express =require("express")
const app =express()
const router =require("./router.js")
const strategy=require("./strategy.js")
const mongoose=require('mongoose')
const DotEnv=require("dotenv").config()
const DB_Pass=process.env.DB_Pass
const DB_UserName=process.env.DB_UserName
const Port=process.env.Port||404
// console.log(`mongodb+srv://${DB_UserName}:${DB_Pass}@cluster0.4d1qqmy.mongodb.net/?retryWrites=true&w=majority`)
mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${DB_UserName}:${DB_Pass}@cluster0.4d1qqmy.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})




app.use(router)
app.use(express.json())

strategy()
// setInterval(()=>{
//     var date =new Date()
//     var time =date.getMinutes()
// var minute=[0,15,30,45]
// console.log(time)

// if(minute.includes(time)){

//     // strategy(2)
//     // strategy(3)
// }

// },60000)




app.listen(Port,()=>{
    console.log("our server is runing ")
})

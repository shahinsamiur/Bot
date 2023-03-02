// const life=[1,2,3,4,5,36]
// // const model=require("./model/trade.model")
// const mongoose=require("mongoose")
// const model=require("./model/traders.model") 
// const nodemailer = require("nodemailer");
// var date =new Date()
// const DotEnv=require("dotenv").config()
// const DB_Pass=process.env.DB_Pass
// const DB_UserName=process.env.DB_UserName

// mongoose.set("strictQuery", false);
// mongoose.connect(`mongodb+srv://${DB_UserName}:${DB_Pass}@cluster0.4d1qqmy.mongodb.net/?retryWrites=true&w=majority`)
// .then(()=>{
//     console.log("DB connected")
// }).catch((err)=>{
//     console.log(err)
// })
// // console.log(life.includes(date.getMinutes()))
// // console.log()
// const APIKEY=require("dotenv").config()
// // console.log(process.env.APIKEY)


// const users = [
//     { Pair: "EURUSD", Trend: "sideways"},
//     { Pair: "GBPUSD", Trend: "sideways"},
//     { Pair: 'USDJPY', Trend: "sideways"},
//     { Pair: "AUDUSD", Trend: "sideways"},
//     { Pair: "USDCAD", Trend: "sideways"},
//   ];

// model.insertMany(users).then(()=>{
//     console.log("done")
// }).catch(()=>{
//     console.log("error")
// })


// const MakeEmail=async(pair,EMA21)=>{
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();
//   //    host: "smtp.ethereal.email",
//   //   secure: false, // true for 465, false for other ports
//     // create reusable transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       // service: 'gmail',
//       auth: {
//           user: 'shahinsamiur@gmail.com',
//           pass: 'audvntutqlhgxypo'
//       }
//   });
  
    
  
//     let info = await transporter.sendMail({
//       from: '"samiur shahin" <shahinsamiur@yahoo.com>', // sender address
//       to: "shahinsamiur@proton.me, shahinsamiur@gmail.com", // list of receivers
//       subject: `Hello Treders ${pair}`, // Subject line
//       text: `got Trade ${EMA21}`, // plain text body
//       // html: "<b>Hello world?</b>", // html body
//     });        
//     console.log("Message sent: %s", info.messageId);
  
//   }


//   MakeEmail()



const AtrStopLossAndTakeProfit=require("./Bot/AtrStopLossAndTakeProfit")
var close =[
    1.05438,  1.05443,
    1.05447,  1.05444,
    1.05458,   1.0549,
    1.05472,  1.05414,
    1.05414, 1.054305
  ]



var high= [
    1.05464,   1.0546,
    1.05482,   1.0546,
    1.05474,  1.05494,
    1.05508,  1.05482,
    1.05432, 1.054305]

var low= [
    1.05399, 1.05433,
    1.05434, 1.05438,
    1.05442, 1.05453,
    1.05467, 1.05402,
    1.05402, 1.05402
  ]





const result=AtrStopLossAndTakeProfit(high, low, 14, "RMA", 1.5)
console.log(result)





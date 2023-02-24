
// https://api.twelvedata.com/ema?symbol=EUR/USD&interval=15min&apikey=b6a6ccc6dcac4805ad1e336d86cef9d7`

// b6a6ccc6dcac4805ad1e336d86cef9d7
// hello GPT ?              
// const APIKEY="b6a6ccc6dcac4805ad1e336d86cef9d7"




const fetch = require('node-fetch');
var pairs=["EUR/USD","USD/JPY","GBP/USD"]
const DotEnv=require("dotenv").config()
const APIKEY1=process.env.APIKEY
const APIKEY2=process.env.APIKEY2
const APIKEY3=process.env.APIKEY3
const model=require("./Bot/model/MarketTrend.model")
const MakeEmail=require("./Middlewares/MaleEmail")
// const AtrStopLossAndTakeProfit=require("./Bot/AtrStopLossAndTakeProfit")
 const ema=require("./ema")
// const OpenTrade=require("./Middlewares/Bot/OpenTrade")




const Strategy=async(serial)=>{


if(serial==1) var APIKEY=APIKEY1
if(serial==2)   var APIKey=APIKEY2
if(serial==3)   var APIKey=APIKEY3
// var APIKEY


// if(serial==1) var i=0
// if(serial==2)   var i=2
// if(serial==3)   var i=0



    var trend=''
for ( i = 0; i <pairs.length; i++) {
console.log(i)




    // const EMA21Raw=await fetch(`https://api.twelvedata.com/ema?symbol=${pairs[i]}&time_period=21&outputsize=30&interval=15min&apikey=${APIKEY}`)
    // const EMA50Raw=await fetch(`https://api.twelvedata.com/ema?symbol=${pairs[i]}&time_period=50&outputsize=30&interval=15min&apikey=${APIKEY}`)
    // var EMA21=await EMA21Raw.json()
    // var EMA50=await EMA50Raw.json()
    var result=await fetch("https://api.twelvedata.com/ema?symbol=EUR/USD&interval=15min&outputsize=30&apikey=b6a6ccc6dcac4805ad1e336d86cef9d7")
    var reslts=await result.json()
console.log(reslts)
 //   const EMA21Raw=await fetch(`https://api.twelvedata.com/time_series?symbol=EUR/USD&interval=15min&outputsize=50&apikey=b6a6ccc6dcac4805ad1e336d86cef9d7`)
 
    // console.log(EMA50)
    // console.log(EMA21Raw)
    // console.log(EMA21.values[0].ema,"sss",EMA21.values[1].ema,"sss",EMA50.values[0].ema)

    // console.error(error);


      
//     if(EMA21.values[0].ema > EMA21.values[1].ema&& EMA21.values[0].ema > EMA50.values[0].ema){
//          trend="up"
//          console.log("up")
// }else if(EMA21.values[0].ema < EMA21.values[1].ema&& EMA21.values[0].ema < EMA50.values[0].ema)
//     {
//      trend="down"
//      console.log("down")
//     } 
//     else{ trend="sideways"
//     console.log("sideways")
// }

//0.68695 21-0
//0.68703 21-1
//0.68774 50-0
   

// const PrevTrand=await model.findOne({Pair:pairs[i]})


// if(trend!="sideways" &&PrevTrand!={}&&PrevTrand.Trend!=trend){

// //    var SLandTP=await AtrStopLossAndTakeProfit()

// await MakeEmail(pairs[i],EMA21.values[0].ema)
// //    OpenTrade(pairs[i],SLandTP)
   
 

//     // MakeEmail(pairs[i],EMA21.values[0].ema)
//    const finaldata =await model.updateOne({Pair:pairs[i]},{Trend:trend})

// }




// console.log(pairs[i])
// console.log(trend)


    // var trend_up =  and 
    // var trend_down = ma < ma[1] and ma < ma_filter




}
}


module.exports=Strategy;


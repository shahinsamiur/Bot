
const {PythonShell}=require("python-shell")



var pairs=["EURUSD","USDJPY","GBPUSD"]
const DotEnv=require("dotenv").config()
const model=require("./model/traders.model") 
const MakeEmail=require("./Middlewares/MaleEmail")
const AtrStopLossAndTakeProfit=require("./Bot/AtrStopLossAndTakeProfit")
 const ema=require("./ema")
// const OpenTrade=require("./Middlewares/Bot/OpenTrade")
const CalculateLotSize=require("./Bot/LotCalculate")




const Strategy=async()=>{

    




    var trend=''
for ( i = 2; i <pairs.length; i++) {


//   let options = {
//     mode: 'text',
//     pythonPath: "C:\Program Files\Python311\python.exe",
//     pythonOptions: ['-u'], // get print results in real-time
//     scriptPath: '/absolute/path/to/script/',
//     args: ["EURUSD"]
// };








  var output= await PythonShell.run(`./Bot/python/data.py `,null )
  var output2=await JSON.parse(output[0])
 
  const EMA21=await ema(output2.close,21)
  const EMA50=await ema(output2.close,50)



 


      
    if(EMA21[0] > EMA21[1]&& EMA21[0] > EMA50[0]){
         trend="up"
         console.log("up")
}else if(EMA21[0] < EMA21[1]&& EMA21[0] < EMA50[0])
    {
     trend="down"
     console.log("down")
    } 
    else{ trend="sideways"
    console.log("sideways")
}



const PrevTrand=await model.findOne({Pair:pairs[i]})


if(trend!="sideways" &&PrevTrand!={}&&PrevTrand.Trend!=trend){


  const EMA211H=await ema(output2.close1H,21)
  const EMA501H=await ema(output2.close1H,50)
var trend1H=""
    if(EMA21[0] > EMA21[1]&& EMA21[0] > EMA50[0]){
      trend1H="up"
      console.log("up_1h")
  }else if(EMA21[0] < EMA21[1]&& EMA21[0] < EMA50[0])
  {
  trend1H="down"
  console.log("down_1H")
  } 
  else{ trend1H="sideways"
  console.log("sideways_1h")
  }


  if(trend1H=="sideways"||trend1H==trend){


  var SLandTP=await AtrStopLossAndTakeProfit(output2.close,output2.high, output2.low, 14, "RMA", 1.5)
  // console.log(SLandTP.long[70],SLandTP.short[70])
var Lotsize=await CalculateLotSize()


await MakeEmail(pairs[i],EMA21.values[0].ema)
   OpenTrade(pairs[i],SLandTP)
   
 

    // MakeEmail(pairs[i],EMA21.values[0].ema)
   const finaldata =await model.updateOne({Pair:pairs[i]},{Trend:trend})
  }
}
    // var trend_up =  and 
    // var trend_down = ma < ma[1] and ma < ma_filter
}
}


module.exports=Strategy;


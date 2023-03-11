
const {PythonShell}=require("python-shell")


const DotEnv=require("dotenv").config()
const MakeEmail=require("./Middlewares/MaleEmail")
const AtrStopLossAndTakeProfit=require("./Bot/AtrStopLossAndTakeProfit")
 const ema=require("./ema")
const OpenTrade=require("./Bot/OpenTrade")
const CalculateLotSize=require("./Bot/LotCalculate")
const fs = require('fs');
const pythoncallfunc=require("./Middlewares/pythoncallfunc")
const dd=require("./Bot/PDB/treand.json")
const checkCloseTrade=require("./Middlewares/checkCloseTrade")

const Strategy=async()=>{
  var pairs=["EURUSD","USDJPY","GBPUSD","AUDUSD","USDCAD","EURGBP"]
  var pairsForPython=["EUR/USD","USD/JPY","GBP/USD","AUD/USD","USD/CAD","EUR/GBP"]

    var trend=''
for ( i = 4; i <pairs.length; i++) {
console.log(i)
const candleDataRaw=await pythoncallfunc(pairs[i])


var output=await JSON.parse(candleDataRaw)
console.log("data Got ",output)




  const EMA21=await ema(output.close,21)
  const EMA50=await ema(output.close,50)
console.log("ema's got " )

      
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


const jsonData = fs.readFileSync('./Bot/PDB/treand.json', 'utf8');
const PrevTrand = JSON.parse(jsonData)
console.log(PrevTrand)


if(trend!="sideways" &&PrevTrand!={}&&PrevTrand.treand!=trend){


  const EMA211H=await ema(output.close1H,21)
  const EMA501H=await ema(output.close1H,50)
var trend1H=""
    if(EMA211H[0] > EMA211H[1]&& EMA211H[0] > EMA501H[0]){
      trend1H="up"
      console.log("up_1h")
  }else if(EMA211H[0] < EMA211H[1]&& EMA211H[0] < EMA501H[0])
  {
  trend1H="down"
  console.log("down_1H")
  } 
  else{ trend1H="sideways"
  console.log("sideways_1h")
  }


  if(trend1H=="sideways"||trend1H==trend){


  var SLandTP=await AtrStopLossAndTakeProfit(output.close,output.high, output.low, 14, "RMA", 1.5)
  console.log(SLandTP.long[70],SLandTP.short[70])



// await MakeEmail(pairs[i],EMA21.values[0].ema)

// check any trade is open in this pair ?
// console.log("let's open a trede ")

// await OpenTrade(pairs[i],SLandTP,output.close[output.close.length-2],trend)
// console.log("trade Opend ")

const jsonData = fs.readFileSync('./Bot/PDB/openTrade.json', 'utf8');
const OpenTradePair = JSON.parse(jsonData)

  console.log("checking")

  if(OpenTradePair[i].pair==pairs[i]&&OpenTradePair[i].isTradeOpen==false){
   var OrderId= await OpenTrade(pairsForPython[i],SLandTP,output.close[output.close.length-2],trend)
console.log(OrderId)

     //
    //  OpenTradePair[i]={
    //   pair:"EURUSD",
    //   isTradeOpen:true,
    //   SL:SL,
    //   TP:"",
    //   type:""
// }
const modifiedJsonDataOfPairsTrade = JSON.stringify(OpenTradePair);
fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonDataOfPairsTrade);


  }else{
// check is trade close or not 
 checkCloseTrade()



  }



  //  OpenTrade(pairsForPython[i],SLandTP,output.close[output.close.length-2],trend)


  OpenTradePair[i].treand =trend;
const modifiedJsonData = JSON.stringify(PrevTrand);
fs.writeFileSync("./Bot/PDB/treand.json", modifiedJsonData);



  }
}
}

}
module.exports=Strategy;
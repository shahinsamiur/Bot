const LotCalculate=require("./LotCalculate")
const TradersModel=require("../model/traders.model")
const accountInfPyfn=require("../Middlewares/accountInfPyfn")
const fs = require('fs');
const dd=require("./PDB/treand.json")
const openTradePyFunc =require("../Middlewares/openTradePyFunc")
//pair,SLandTP,currentPrice,trend



const OpenTrade=async (pair,SLandTP,currentPrice,trend)=>{
    var signal=trend=="up"?true:false // true or false means is_buy:true or false . i did it because of python open trade function 
    var SL=0
    signal==true? SL=[SLandTP.short[SLandTP.short.length-2]]:SL=[SLandTP.long[SLandTP.long.length-2]]
    // signal==true? TP=currentPrice+((currentPrice-SL)*2):currentPrice-((SL-currentPrice)*2)

        var SLandTP2={long:[SLandTP.long[SLandTP.long.length-2]],
        short:[SLandTP.short[SLandTP.short.length-2]]
        }
// console.log(SLandTP2)
// getting Data from ours server  which user are available 

const jsonData = fs.readFileSync('./Bot/PDB/ourusers.json', 'utf8');
const traders = JSON.parse(jsonData)
console.log(traders)


const jsonData_OpenTrade = fs.readFileSync('./Bot/PDB/OpenTrade.json', 'utf8');
const open_trade_list = JSON.parse(jsonData_OpenTrade)

for (let i = 0; i < open_trade_list.length; i++) {
    if(open_trade_list[i].pair===pair){
         open_trade_list[i].isTradeOpen=true
         open_trade_list[i].SL=SL
         open_trade_list[i].TP=TP
         open_trade_list[i].type=signal
         console.log("call")
    }
 }




 const modifiedJsonData = JSON.stringify(open_trade_list);
 fs.writeFileSync("./OpenTrade.json", modifiedJsonData);




for (let i = 0; i < traders.length; i++) {
console.log("user loop call ")
   // user's broker Account  Informataion 

// const jsonData_OpenTrade = fs.readFileSync('./Bot/PDB/OpenTrade.json', 'utf8');
// const open_trade_list = JSON.parse(jsonData_OpenTrade)





    var userInfo=await accountInfPyfn(traders[i])
    var userInfoJSON=await JSON.parse(userInfo)
    var userBlance=userInfoJSON[0].balance
    var token=traders[i]


// claculate Lot Size 

const LotSize=await LotCalculate(userBlance,currentPrice,SLandTP2,signal)
console.log(LotSize)
var orderID=0

if(parseInt(LotSize.lotSize)>=0.01&&LotSize.pips<=20){
    console.warn("yes we call py",SL)
     orderID=await openTradePyFunc(pair,SL,parseFloat(LotSize.lotSize),LotSize.TP,signal,token)
}
}
console.log("finisherd")
}
// OpenTrade()
module.exports=OpenTrade;
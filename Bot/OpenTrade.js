const LotCalculate=require("./LotCalculate")
const TradersModel=require("../model/traders.model")
const accountInfPyfn=require("../Middlewares/accountInfPyfn")
const fs = require('fs');
const dd=require("./PDB/treand.json")
const openTradePyFunc =require("../Middlewares/openTradePyFunc")
//pair,SLandTP,currentPrice,trend
const OpenTrade=async (pair,SLandTP,currentPrice,trend)=>{
    var signal=trend=="up"?true:false // true or false means is_buy:true or false . i did it because of python open trade function 
    var SL="";
    signal==true? SL=SLandTP.short:SLandTP.long
    
// getting Data from ours server  which user are available 

const jsonData = fs.readFileSync('./Bot/PDB/ourusers.json', 'utf8');
const traders = JSON.parse(jsonData)
console.log(traders)

for (let i = 0; i < traders.length; i++) {

   // user's broker Account  Informataion 

    var userInfo=await accountInfPyfn(traders[i])
    var userInfoJSON=await JSON.parse(userInfo)
    console.log(userInfoJSON)
    var userBlance=userInfo[0].balance
    var token=traders[i]


// claculate Lot Size 

const LotSize=await LotCalculate(userBlance,currentPrice,SLandTP,signal)
var orderID=0
if(LotSize>=0.01){
     orderID=await openTradePyFunc(pair,SL,LotSize.lotSize,LotSize.TP,signal,token)
}
return orderID
}
}
// OpenTrade()
module.exports=OpenTrade;
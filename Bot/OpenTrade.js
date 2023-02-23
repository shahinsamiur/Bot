const LotCalculate=require("../LotCalculate")
const TradersModel=require("../../model/traders.model")



const OpenTrade=async (pair,SLandTP)=>{

    var SL=SLandTP.SL
    var TP=SLandTP.TP
// getting Data from ours server  which user are available 
    const traders=await TradersModel.find()

for (let i = 0; i < traders.length; i++) {
   // user's broker Account  Informataion 
    


// claculate Lot Size 
const LotSize=await LotCalculate(userBlance,SL)


// close trade if any trade open on specific pair

// open a new trade 


}


}



module.exports=OpenTrade;


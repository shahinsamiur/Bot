
const LotCalculate=async(SL,close)=>{
//calculate risk amount (2%)
//userBlanceData,
var userBlance=100
var riskBlance=userBlance/50  //2
// calculate  SL pips //20



var lotSize=riskBlance/(pips*10)
// ***probably Problem 
if(lotSize<0.01){
    var lotSize=0.01
    return lotSize
}

return lotSize
}

module.exports=LotCalculate;
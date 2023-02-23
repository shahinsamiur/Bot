
const LotCalculate=async(userBlance=100,SL)=>{
//calculate risk amount (2%)
var riskBlance=userBlance/50  //2
// calculate  SL pips //20
pips=2


var lotSize=riskBlance/(pips*10)
// ***probably Problem 
if(lotSize<0.01){
    var lotSize=0.01
    return lotSize
}

return lotSize
}

module.exports=LotCalculate;
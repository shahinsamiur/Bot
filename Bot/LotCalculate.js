const LotCalculate=async(userBlance,currentPrice,SLandTP,signal)=>{

    var riskAmount=userBlance/50
    
    //pips calculation 
    var pips=0
    var riskPrice=0
    var TP=0
    if (signal=="buy") {
        riskPrice= (currentPrice-SLandTP.short)
        TP=currentPrice+(riskPrice*2)
        pips=(Math.abs(( SLandTP.short-currentPrice)/0.0001)).toFixed(2)
    
    //  pips=Math.round((currentPrice-riskPrice)/ 0.0001)
    } else {
        riskPrice= SLandTP.long-currentPrice
        TP=currentPrice-(riskPrice*2)
        pips=(Math.abs(( SLandTP.long-currentPrice)/0.0001)).toFixed(2)
    }
    
    
    // lot size calculation 
    var lotSize=(riskAmount/(pips*10)).toFixed(2)
    
    
    
    console.log(lotSize)
    
    if(lotSize<=0.01){
        
        return {
            lotSize,TP
        }
    }
    console.log(lotSize)
    return false
    }

module.exports=LotCalculate;
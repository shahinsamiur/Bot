
const LotCalculate=async(userBlance,currentPrice,SLandTP,signal)=>{

    var riskAmount=userBlance/50
    // console.log("userblance",typeof(userBlance),userBlance)
    // console.log("currentPrice",typeof(currentPrice),currentPrice)
    // console.log("SLandTP",typeof(SLandTP),SLandTP)
    // console.log("signal",typeof(signal),signal)
    //pips calculation 
    var pips=0
    var riskPrice=0
    var TP=0
    if (signal=="up") {
        riskPrice= (currentPrice-SLandTP.short)
        // console.log("aa",riskPrice)
        TP=currentPrice+(riskPrice*2)
        pips=(Math.abs(( SLandTP.short-currentPrice)/0.0001)).toFixed(2)
    
    //  pips=Math.round((currentPrice-riskPrice)/ 0.0001)
    } else {
        riskPrice= SLandTP.long-currentPrice
        // console.log(riskPrice)
        TP=currentPrice-(riskPrice*2)
        pips=(Math.abs(( SLandTP.long-currentPrice)/0.0001)).toFixed(2)
    }
    
    if(pips>=5){
        return false
    }
    // lot size calculation 
    var lotSize=(riskAmount/(pips*10)).toFixed(2)
    
    
    
    // console.log(lotSize)
    
    if(lotSize>=0.01){
        
        return {
            lotSize,TP,pips,riskPrice
        }
    }
    // console.log(lotSize)
    return false
    }


var lot={long: [1.35769],
    short: [1.35701]
}


    console.log(LotCalculate(100,1.35725,lot,"down"))
// module.exports=LotCalculate;
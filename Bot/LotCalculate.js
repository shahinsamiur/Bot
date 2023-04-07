
const LotCalculate=async(userBlance,currentPrice,SLandTP,signal)=>{


console.log("form lotsize ")


    var riskAmount=userBlance/50
    // console.log("userblance",typeof(userBlance),userBlance)
    // console.log("currentPrice",typeof(currentPrice),currentPrice)
    // console.log("SLandTP",typeof(SLandTP),SLandTP)
    // console.log("signal",typeof(signal),signal)
    //pips calculation 
    var pips=0
    var riskPrice=0
    var TP=0
    var SL=0
    if (signal=="up") {
        riskPrice= (currentPrice-SLandTP.short[SLandTP.short.length-2])
        SL=SLandTP.short[SLandTP.short.length-2]
        // console.log("aa",riskPrice)
        TP=currentPrice+(riskPrice*2)
        pips=(Math.abs(( SLandTP.short[SLandTP.short.length-2]-currentPrice)/0.0001)).toFixed(2)
    
    //  pips=Math.round((currentPrice-riskPrice)/ 0.0001)
    } else {
        riskPrice= SLandTP.long[SLandTP.long.length-2]-currentPrice
        // console.log(riskPrice)
        SL=SLandTP.long[SLandTP.long.length-2].toFixed(6)
        TP=currentPrice-(riskPrice*2)
        pips=(Math.abs(( SLandTP.long[SLandTP.long.length-2]-currentPrice)/0.0001)).toFixed(2)
    }
    
    if(pips>=5){
        console.log(pips)
        return false
    }
    // lot size calculation 
    var lotSize=(riskAmount/(pips*10)).toFixed(2)
    
    
    
    // console.log(lotSize)
    
    if(lotSize>=0.01){
        console.log(pips,"lotSize---",lotSize)
        
        return {
            lotSize,TP,pips,SL
        }
    }
    // console.log(lotSize)
    return false
    }


var lot={long: [1.35769],
    short: [1.35290]
}


    // console.log(LotCalculate(100,1.35321,lot,"up"))
module.exports=LotCalculate;
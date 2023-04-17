
const LotCalculate=async(userBlance,currentPrice,SLandTP,signal)=>{

    var riskAmount=userBlance/50
 
    //pips calculation 
    var pips=0
    var riskPrice=0
    var TP=0
    var SL=0
    if (signal=="up") {
        riskPrice= (currentPrice-SLandTP.short[SLandTP.short.length-1])
        SL=SLandTP.short[SLandTP.short.length-1]

        TP=currentPrice+(riskPrice*2)
        pips=(Math.abs(( SLandTP.short[SLandTP.short.length-1]-currentPrice)/0.0001)).toFixed(2)
    
    //  pips=Math.round((currentPrice-riskPrice)/ 0.0001)
    } else {
        riskPrice= SLandTP.long[SLandTP.long.length-1]-currentPrice
        // console.log(riskPrice)
        SL=SLandTP.long[SLandTP.long.length-1].toFixed(6)
        TP=currentPrice-(riskPrice*2)
        pips=(Math.abs(( SLandTP.long[SLandTP.long.length-1]-currentPrice)/0.0001)).toFixed(2)
    }
    
    if(pips>=20){
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
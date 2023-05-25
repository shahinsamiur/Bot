
const LotCalculate=async(currentPrice,SLandTP,signal)=>{
 
 
    //pips calculation 
    var pips=16
    // var riskPrice=0
    var TP=0
    var SL=0
    if (signal=="up") {
        riskPrice= (currentPrice-SLandTP.short[SLandTP.short.length-2])
        SL=SLandTP.short[SLandTP.short.length-1].toFixed(6)
        pips=(Math.abs(( SLandTP.short[SLandTP.long.length-2]-currentPrice)/0.0001)).toFixed(2)
        TP=(currentPrice+(riskPrice*2)).toFixed(6)
   
    } else {
        riskPrice= (currentPrice-SLandTP.long[SLandTP.short.length-2])
        SL=SLandTP.long[SLandTP.long.length-2].toFixed(6)
        TP=(currentPrice-(riskPrice*2)).toFixed(6)
        pips=(Math.abs(( SLandTP.long[SLandTP.long.length-2]-currentPrice)/0.0001)).toFixed(2)
    }
    
    if(pips>=20&&pips<5){
        console.log(pips)
        return false
    }
 
        
        return {
        TP,pips,SL
        }

    return false
    }


var lot={long: [1.35769],
    short: [1.35290]
}


    // console.log(LotCalculate(100,1.35321,lot,"up"))
module.exports=LotCalculate;
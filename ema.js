
// import {
//      ema
//   } from 'moving-averages'
//   const {ema}=require("moving-averages")
async function calculateEMA(price,periodof) {
   
    var prices=[]

    for (let i = 0; i < price.length; i++) {
       prices.push(price[i].close)
        
    }

//    var ema50= await ema(prices,21)
    
    // console.log(prices)
    const k = 2 / (periodof + 1);
  let ema = prices[0].close;
  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i].close * k) + (ema * (1 - k));
  }

// const period = 50;
//   const multiplier = 2 / (period + 1);
//   let ema = [];
//   ema[0] = prices[0];
//   for (let i = 1; i < prices.length; i++) {
//     ema[i] = (prices[i] - ema[i - 1]) * multiplier + ema[i - 1];
//   }
//   var emas=ema[ema.length - 1];
  return ema

 
  }
  


module.exports=calculateEMA



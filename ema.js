const technicalIndicators = require('technicalindicators');
async function calculateEMA(price,periodof) {

// console.log(price)
  const inputEMA = {
    period: periodof, // The EMA period
    values: price, // The input values
  };
  
  // Calculate the EMA using technicalindicators library
  const resultEMA = technicalIndicators.EMA.calculate(inputEMA);
  
  // Print the result
var length=resultEMA.length

  var ReturnValue=[resultEMA[length-2],resultEMA[length-3]]
   return ReturnValue
  }
  


module.exports=calculateEMA



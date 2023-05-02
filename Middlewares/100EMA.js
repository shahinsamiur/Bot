const technicalIndicators = require("technicalindicators");
async function calculateEMA(price, periodof) {
  // console.log(price)
  const inputEMA = {
    period: periodof, // The EMA period
    values: price, // The input values
  };

  // Calculate the EMA using technicalindicators library
  const resultEMA = technicalIndicators.EMA.calculate(inputEMA);
  //   var newArr=resultEMA.slice(-20)
  // return newArr;

  // Print the result
  var length = resultEMA.length;

  var ReturnValue = [Number(resultEMA[length - 1].toFixed(6)), Number(resultEMA[length - 2].toFixed(6))];
  return ReturnValue;
}

module.exports = calculateEMA;

const technicalIndicators = require("technicalindicators");
async function calculateEMA(price, periodof) {
  // console.log(price)
  const inputEMA = {
    period: periodof, // The EMA period
    values: price, // The input values
  };

  // Calculate the EMA using technicalindicators library
  const resultEMA = technicalIndicators.EMA.calculate(inputEMA);

  // Print the result
  var length = resultEMA.length;

  var ReturnValue = [resultEMA[length - 1], resultEMA[length - 2]];
  return ReturnValue;
}

module.exports = calculateEMA;
